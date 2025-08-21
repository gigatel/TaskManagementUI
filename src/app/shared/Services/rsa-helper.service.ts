import { Injectable } from '@angular/core';
import * as Forge from 'node-forge';

@Injectable({
  providedIn: 'root'
})
export class RsaHelperService {
  publicKey!: string;

  constructor() { 
    
  }

  parseBigInteger(b64: any) {
    return new Forge.jsbn.BigInteger(Forge.util.createBuffer(Forge.util.decode64(b64)).toHex(), 16);
  }


  encryptWithPublicKey(valueToEncrypt: string): string {
    let BigInteger = Forge.jsbn.BigInteger;
    var modulus = this.publicKey.split('<Modulus>')[1].split('</Modulus>')[0];
    var exponent = this.publicKey.split('<Exponent>')[1].split('</Exponent>')[0];
    var publicKey: any = Forge.pki.setRsaPublicKey(
      this.parseBigInteger(modulus), // n
      this.parseBigInteger(exponent),// e
      ); 
     var pem:any = Forge.pki.publicKeyToPem(publicKey);
     const rsa = Forge.pki.publicKeyFromPem(pem);
     var enc1=rsa.encrypt(valueToEncrypt);
    var encVal = window.btoa(enc1);
    return encVal;
  }

}
