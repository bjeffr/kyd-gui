import {Claim} from './claim.model';
import {Key} from './key.model';

export class User {
  account: string;
  contract: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  mobileNumber: string;
  keys: Array<Key>;
  claims: Array<Claim>;

  constructor(account: string, contract: string, firstName: string, lastName: string, birthDate: string, email: string,
              mobileNumber: string, keys: Array<Key>, claims: Array<Claim>) {
    this.account = account;
    this.contract = contract;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = birthDate;
    this.email = email;
    this.mobileNumber = mobileNumber;
    this.keys = keys;
    this.claims = claims;
  }
}
