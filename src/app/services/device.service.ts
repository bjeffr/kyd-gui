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

  async register(device: FormGroup) {
    const accounts = await this.web3.eth.getAccounts();
    const abi = contract.abi;
    const bytecode = '0x' + contract.evm.bytecode.object;

    // @ts-ignore
    const result = await new this.web3.eth.Contract(abi)
      .deploy({ data: bytecode })
      .send({ from: accounts[0], gas: 3000000 });

    device.addControl('account', new FormControl(accounts[0]));
    device.addControl('address', new FormControl(result.options.address));
    return await this.http.post('https://puf.dev.eng.c-alm.ch/devices/register', device.value).toPromise();
  }

  async getAll() {
    const accounts = await this.web3.eth.getAccounts();
    const requestBody = {
      account: accounts[0]
    };

    const devices = await this.http.post<Array<Device>>('https://puf.dev.eng.c-alm.ch/devices', requestBody).toPromise();

    for (const device of devices) {
      // @ts-ignore
      const deviceContract = new this.web3.eth.Contract(contract.abi, device.address);
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

  async verify(device: Device) {
    const data = this.web3.utils.asciiToHex(JSON.stringify(device));
    const hashedData = this.web3.utils.soliditySha3(device.address, 8, data);

    const signature = this.web3.eth.accounts.sign(hashedData, environment.contractAddress);

    // @ts-ignore
    const deviceContract = new this.web3.eth.Contract(contract.abi, device.address);
    const addClaimABI = deviceContract.methods.addClaim(8, 1, environment.contractAddress, signature.signature, data, 'https://www.uzh.ch/')
      .encodeABI();

    const accounts = await this.web3.eth.getAccounts();
    return deviceContract.methods.execute(
      device.address,
      0,
      addClaimABI,
    ).send({
      gas: 4612388,
      from: accounts[0],
    });
  }
}
