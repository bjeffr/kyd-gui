export class Claim {
  claimType: number;
  scheme: number;
  issuer: string;
  signature: string;
  data: string;
  uri: string;

  constructor(claimType: number, scheme: number, issuer: string, signature: string, data: string, uri: string) {
    this.claimType = claimType;
    this.scheme = scheme;
    this.issuer = issuer;
    this.signature = signature;
    this.data = data;
    this.uri = uri;
  }
}
