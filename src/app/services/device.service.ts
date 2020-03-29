import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {concatMap} from 'rxjs/operators';
import {Device} from '../models/device.model';
import {FormControl, FormGroup} from '@angular/forms';
import Web3 from 'web3';
import * as contract from '../contracts/build/identity.json';
import {WEB3} from '../web3';


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
    return this.http.post('https://puf.dev.eng.c-alm.ch/devices', device.value);
  }

  getAll() {
    // if (this.jwtHelperService.isTokenExpired(localStorage.getItem('access_token'))) {
    //   return this.userService.refresh().pipe(
    //     concatMap(() => this.http.get<Array<Device>>('https://puf.dev.eng.c-alm.ch/devices'))
    //   );
    // }
    // return this.http.get<Array<Device>>('https://puf.dev.eng.c-alm.ch/devices');
  }

  // async doSHit() {
  //   const identity = new this.web3.eth.Contract(
  //     // @ts-ignore
  //     contract.abi,
  //     '0xfd15aB40Ef174AD6f93a60e802f4bCa008da4020'
  //   );
  //   const keys = await identity.methods.getKeysByPurpose(1).call();
  //   const key = await identity.methods.getKey(keys[0]).call();
  //
  //   // identity.methods.addKey(this.web3.utils.keccak256(identity.options.address), 3, 1)
  //   //   .send({ from: accounts[0], gas: 3000000 });
  //
  //   // identity.methods.removeKey('0xfd15ab40ef174ad6f93a60e802f4bca008da4020000000000000000000000000')
  //   //   .send({ from: accounts[0], gas: 3000000 });
  //
  //   const hexedData = this.web3.utils.asciiToHex('Valid');
  //   const hashedData = this.web3.utils.soliditySha3('0x8449A30E914AF7e8b9291019823c0C4C2359E4dF', 8, hexedData);
  //
  //   // const provider = new HDWalletProvider(
  //   //   'sadness artwork pave divert nephew victory spray famous lock weapon bird unusual',
  //   //   'https://rinkeby.infura.io/v3/056404dae4ee477e94351c46903b0ade'
  //   // );
  //   // @ts-ignore
  //   const web3 = new Web3(provider);
  //   const signature = await web3.eth.sign(hashedData, '0xFc869DE19bEfb3DC9d71b4b65ad602990AC2831d');
  //   console.log(signature);
  //
  //   // @ts-ignore
  //   const device = new this.web3.eth.Contract(contract.abi, '0x8449A30E914AF7e8b9291019823c0C4C2359E4dF');
  //
  //   const addClaimABI = device.methods.addClaim(8, 1, identity.options.address, signature, hexedData, 'https://www.uzh.ch/').encodeABI();
  //
  //   await device.methods.execute(
  //     device.options.address,
  //     0,
  //     addClaimABI,
  //   ).send({
  //     gas: 4612388,
  //     from: '0xB5780018d7F8aeb7Ab5D32940a6A3d4ACA16D658',
  //   });
  // }
}
