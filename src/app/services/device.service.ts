import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Device} from '../models/device.model';
import {FormControl, FormGroup} from '@angular/forms';
import Web3 from 'web3';
import * as contract from '../contracts/build/identity.json';
import {WEB3} from '../web3';
import {environment} from '../../environments/environment';
import {Claim} from '../models/claim.model';
import {Key} from '../models/key.model';


@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(@Inject(WEB3) private web3: Web3,
              private http: HttpClient) { }

  create(device: FormGroup) {
    return this.http.post(environment.kydService.concat('devices/create'), device.value);
  }

  async register(device: FormGroup) {
    const accounts = await this.web3.eth.getAccounts();
    const abi = contract.abi;
    const bytecode = '0x' + contract.evm.bytecode.object;

    // @ts-ignore
    const result = await new this.web3.eth.Contract(abi)
      .deploy({ data: bytecode })
      .send({ from: accounts[0], gas: 3000000 });

    device.addControl('account', new FormControl(accounts[0]));
    device.addControl('contract', new FormControl(result.options.address));
    return await this.http.patch(environment.kydService.concat('devices/register'), device.value).toPromise();
  }

  async getAll() {
    const accounts = await this.web3.eth.getAccounts();
    const requestBody = {
      account: accounts[0]
    };

    const devices = await this.http.post<Array<Device>>(environment.kydService.concat('devices'), requestBody).toPromise();
    if (!devices) { return; }

    for (const device of devices) {
      device.account = accounts[0];
      // @ts-ignore
      const deviceContract = new this.web3.eth.Contract(contract.abi, device.contract);
      const kydClaims = await deviceContract.methods.getClaimIdsByType(8).call();
      for (const claimId of kydClaims) {
        const value = await deviceContract.methods.getClaim(claimId).call();
        const claim = new Claim(value.claimType, value.scheme, value.issuer, value.signature, value.data, value.uri);
        if (!device.claims) {
          device.claims = [];
        }
        device.claims.push(claim);
      }

      const keys = await deviceContract.methods.getKeysByPurpose(1).call();
      for (const keyId of keys) {
        const value = await deviceContract.methods.getKey(keyId).call();
        const key = new Key(value.purpose, value.keyType, value.key);
        if (!device.keys) {
          device.keys = [];
        }
        device.keys.push(key);
      }
    }

    return devices;
  }

  async verify(device: FormGroup) {
    const deviceContract = await this.http.post<string>(environment.kydService.concat('devices/verify'), device.value).toPromise();
    // const data = this.web3.utils.asciiToHex(JSON.stringify(device));
    // const hashedData = this.web3.utils.soliditySha3(device.contract, 8, data);
    //
    // const signature = this.web3.eth.accounts.sign(hashedData, environment.contractAddress);
    //
    // // @ts-ignore
    // const deviceContract = new this.web3.eth.Contract(contract.abi, device.contract);
    // const addClaimABI = deviceContract.methods.addClaim(8, 1, environment.contractAddress, signature.signature, data,
    //   'https://www.arduino.cc/');
    //   .encodeABI();
    //
    // const accounts = await this.web3.eth.getAccounts();
    // return deviceContract.methods.execute(
    //   device.contract,
    //   0,
    //   addClaimABI,
    // ).send({
    //   gas: 4612388,
    //   from: accounts[0],
    // });
  }
}
