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
import {UserService} from './user.service';


@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(@Inject(WEB3) private web3: Web3,
              private http: HttpClient,
              private userService: UserService) { }

  create(device: FormGroup) {
    return this.http.post(environment.kydService.concat('devices/create'), device.value);
  }

  async register(device: FormGroup) {
    const accounts = await this.web3.eth.getAccounts();
    const abi = contract.abi;
    const bytecode = '0x' + contract.evm.bytecode.object;

    // Deploys  an  identity  smart  contract  from  accounts [0].
    // @ts-ignore
    const result = await new this.web3.eth.Contract(abi)
      .deploy({ data: bytecode })
      .send({ from: accounts[0], gas: 3000000 });

    // Creates a signature for the device id.
    const data = this.web3.utils.asciiToHex(
      [device.value.id, 'verified'].join(' ')
    );
    const hashedData = this.web3.utils.soliditySha3(
      result.options.address, 9, data
    );
    const signature = await this.web3.eth.sign(
      hashedData, accounts[0]
    );

    // Creates an ownership claim from the signature.
    const user = await this.userService.get();
    const addClaimABI = result.methods.addClaim(
      9, 1, user.contract, signature, data, ''
    ).encodeABI();

    // Adds the ownership claim to the identity smart contract.
    await result.methods.execute(
      result.options.address, 0, addClaimABI,
    ).send(
      { gas: 4612388, from: accounts[0] }
    );

    device.addControl('account', new FormControl(accounts[0]));
    device.addControl('contract', new FormControl(result.options.address));

    return await this.http.patch(environment.kydService.concat('devices/register'), device.value).toPromise();
  }

  async getAll() {
    const accounts = await this.web3.eth.getAccounts();
    const devices = await this.http.get<Array<Device>>(environment.kydService.concat('devices/user/').concat(accounts[0])).toPromise();
    if (!devices) { return; }

    for (const device of devices) {
      device.account = accounts[0];
      // @ts-ignore
      const deviceContract = new this.web3.eth.Contract(contract.abi, device.contract);
      let verified = false;
      for (const claimId of await deviceContract.methods.getClaimIdsByType(8).call()) {
        const value = await deviceContract.methods.getClaim(claimId).call();
        const claim = new Claim(value.claimType, value.scheme, value.issuer, value.signature, value.data, value.uri);
        if (!device.claims) {
          device.claims = [];
        }
        device.claims.push(claim);
        verified = true;
      }

      device.verified = verified;

      for (const claimId of await deviceContract.methods.getClaimIdsByType(9).call()) {
        const value = await deviceContract.methods.getClaim(claimId).call();
        const claim = new Claim(value.claimType, value.scheme, value.issuer, value.signature, value.data, value.uri);
        if (!device.claims) {
          device.claims = [];
        }
        device.claims.push(claim);
      }

      for (const keyId of await deviceContract.methods.getKeysByPurpose(1).call()) {
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

  async verify(form: FormGroup) {
    const isValid = JSON.parse(await this.http.post<string>(environment.kydService.concat('devices/verify'), form.value).toPromise());
    if (isValid === false) { return false; }

    const device = await this.http.get<Device>(environment.kydService.concat('device/').concat(form.value.id)).toPromise();

    const HDWalletProvider = require('@truffle/hdwallet-provider');
    const kydProvider = new HDWalletProvider(
      environment.mnemonic,
      environment.provider
    );
    // @ts-ignore
    const kydWeb3 = new Web3(kydProvider);

    // Creates a signature for the device id.
    const data = kydWeb3.utils.asciiToHex(
      [form.value.id, 'verified'].join(' ')
    );
    const hashedData = kydWeb3.utils.soliditySha3(
      device.contract, 8, data
    );
    const signature = await kydWeb3.eth.sign(
      hashedData, environment.walletAddress
    );

    // Creates a local instance of the device contract.
    const deviceContract = new this.web3.eth.Contract(
      // @ts-ignore
      contract.abi, device.contract
    );
    // Creates a KYD claim from the signature.
    const addClaimABI = deviceContract.methods.addClaim(
      8, 1, environment.contractAddress,
      signature, data, 'https://www.arduino.cc/'
    ).encodeABI();

    // Adds the KYD claim to the identity smart contract.
    const accounts = await this.web3.eth.getAccounts();
    await deviceContract.methods.execute(
      device.contract, 0, addClaimABI
    ).send(
      { gas: 4612388, from: accounts[0] }
    );

    return true;
  }
}
