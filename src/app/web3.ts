import { InjectionToken } from '@angular/core';
import Web3 from 'web3';

export const WEB3 = new InjectionToken<Web3>('web3', {
  providedIn: 'root',
  factory: () => {
    try {
      // @ts-ignore
      const provider = ('web3' in window) ? window.web3 : Web3.givenProvider;
      return new Web3(provider);
    } catch (err) {
      throw new Error('No MetaMask detected. MetaMask is required for the deployment of smart-contracts.');
    }
  }
});
