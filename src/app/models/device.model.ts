import {Claim} from './claim.model';
import {Key} from './key.model';

export class Device {
  id: string;
  account: string;
  contract: string;
  name: string;
  model: string;
  keys: Array<Key>;
  claims: Array<Claim>;
}
