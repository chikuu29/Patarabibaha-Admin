import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

var SECRET_KEY = '1E99412323A4ED2WAYWALASECRET_KEY';

@Injectable({
  providedIn: 'root'
})
export class CryptographyService {

  CryptoJSAesJson = {
    stringify: function (cipherParams: any) {
      var j: any = { ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64) };
      if (cipherParams.iv) j.iv = cipherParams.iv.toString();
      if (cipherParams.salt) j.s = cipherParams.salt.toString();
      return JSON.stringify(j).replace(/\s/g, '');
    },
    parse: function (jsonStr: any) {
      var j = JSON.parse(jsonStr);
      var cipherParams = CryptoJS.lib.CipherParams.create({ ciphertext: CryptoJS.enc.Base64.parse(j.ct) });
      if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv);
      if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s);
      return cipherParams;
    }
  }
  constructor() { }

  encryptData(data:any){
     return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY, { format: this.CryptoJSAesJson }).toString()
  }
  decryptData(encryptDta:any){
     return CryptoJS.AES.decrypt(encryptDta, SECRET_KEY,{ format: this.CryptoJSAesJson }).toString(CryptoJS.enc.Utf8)
  }
}
