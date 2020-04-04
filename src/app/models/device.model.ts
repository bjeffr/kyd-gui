import {Claim} from './claim.model';
import {Key} from './key.model';

export class Device {
  id: string;
  account: string;
  contract: string;
  name: string;
  model: string;
  verified: boolean;
  keys: Array<Key>;
  claims: Array<Claim>;
}
