import {Claim} from './claim.model';
import {Key} from './key.model';

export class Device {
  id: number;
  account: string;
  address: string;
  name: string;
  make: string;
  model: string;
  publicKey: string;
  keys: Array<Key>;
  claims: Array<Claim>;
}
