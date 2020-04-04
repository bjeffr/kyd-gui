import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup} from '@angular/forms';
import {environment} from '../../environments/environment';
import * as contract from '../contracts/build/identity.json';
import {WEB3} from '../web3';
import Web3 from 'web3';
import {User} from '../models/user.model';
import {Claim} from '../models/claim.model';
import {Key} from '../models/key.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(@Inject(WEB3) private web3: Web3,
              private http: HttpClient) { }

  async register(user: FormGroup) {
    const accounts = await this.web3.eth.getAccounts();
    const abi = contract.abi;
    const bytecode = '0x' + contract.evm.bytecode.object;

    // @ts-ignore
    const result = await new this.web3.eth.Contract(abi)
      .deploy({ data: bytecode })
      .send({ from: accounts[0], gas: 3000000 });

    await result.methods.addKey(this.web3.utils.keccak256(result.options.address), 3, 1)
      .send({ from: accounts[0], gas: 3000000 });

    user.addControl('contract', new FormControl(result.options.address));

    const HDWalletProvider = require('@truffle/hdwallet-provider');
    const kydProvider = new HDWalletProvider(
      environment.mnemonic,
      environment.provider
    );
    // @ts-ignore
    const kydWeb3 = new Web3(kydProvider);
    const data = kydWeb3.utils.asciiToHex(JSON.stringify(user.value));
    const hashedData = kydWeb3.utils.soliditySha3(result.options.address, 7, data);
    const signature = await kydWeb3.eth.sign(hashedData, environment.walletAddress);

    // @ts-ignore
    const addClaimABI = result.methods.addClaim(7, 1, environment.contractAddress, signature, data,
      'https://www.arduino.cc/')
      .encodeABI();

    await result.methods.execute(
      result.options.address,
      0,
      addClaimABI,
    ).send({
      gas: 4612388,
      from: accounts[0],
    });

    user.addControl('account', new FormControl(accounts[0]));

    return await this.http.post(environment.kydService.concat('users/register'), user.value).toPromise();
  }

  async get() {
    const accounts = await this.web3.eth.getAccounts();
    const requestBody = {
      account: accounts[0]
    };

    const user = await this.http.post(environment.kydService.concat('user'), requestBody).toPromise();
    const keys = [];
    const claims = [];

    // @ts-ignore
    const userContract = new this.web3.eth.Contract(contract.abi, user.contract);
    for (const claimId of await userContract.methods.getClaimIdsByType(7).call()) {
      const value = await userContract.methods.getClaim(claimId).call();
      const claim = new Claim(value.claimType, value.scheme, value.issuer, value.signature, value.data, value.uri);
      claims.push(claim);
    }

    for (const keyId of await userContract.methods.getKeysByPurpose(1).call()) {
      const value = await userContract.methods.getKey(keyId).call();
      const key = new Key(value.purpose, value.keyType, value.key);
      keys.push(key);
    }

    for (const keyId of await userContract.methods.getKeysByPurpose(3).call()) {
      const value = await userContract.methods.getKey(keyId).call();
      const key = new Key(value.purpose, value.keyType, value.key);
      keys.push(key);
    }

    // @ts-ignore
    return new User(user.username, user.contract, user.first_name, user.last_name,
      // @ts-ignore
      user.birth_date, user.email, user.mobile_number, keys, claims);
  }

  async isLoggedIn() {
    const accounts = await this.web3.eth.getAccounts();
    return !!accounts[0];
  }

  async isRegistered() {
    const accounts = await this.web3.eth.getAccounts();
    const requestBody = {
      account: accounts[0]
    };

    const user = await this.http.post(environment.kydService.concat('user'), requestBody).toPromise();
    return !!user;
  }
}
