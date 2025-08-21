
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })

  export class GlobalService {
    constructor() { }
    ConvertLocalISOTime(date:any) {
        if(date==null)
        {
          return null;
        }
        var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        var localISOTime = (new Date(date - tzoffset)).toISOString().slice(0, -1);
        return localISOTime;
      };
    DateToddMMyyyy(date:any){
      let dd:any = date.getDate();
      let mm:any = date.getMonth() + 1;
      let yyyy = date.getFullYear();
      if (dd < 10) {
        dd = '0' + dd;
      }
      if (mm < 10) {
        mm = '0' + mm;
      }
      return dd + '/' + mm + '/' + yyyy;
    }
    DateToyyyyMMdd(date:Date){
      let dd:any = date.getDate();
      let mm:any = date.getMonth() + 1;
      let yyyy = date.getFullYear();
      if (dd < 10) {
        dd = '0' + dd;
      }
      if (mm < 10) {
        mm = '0' + mm;
      }
      return yyyy + '/' + mm + '/' + dd;
    }
    DateToyyyyMMddHHmmss(date:Date){
      var data=this.ConvertLocalISOTime(date);
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Month is 0-based
      const day = String(date.getUTCDate()).padStart(2, '0');

      const hour = String(date.getHours()).padStart(2, '0');
      const minute = String(date.getMinutes()).padStart(2, '0');
      const second = String(date.getSeconds()).padStart(2, '0');

      const strDate = year + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + second;
      return strDate
    }
    ddMMyyyyToyyyyMMdd(date:string,seprator:string="-"){
        var parts=date.split(seprator);
        return parts[2]+seprator+parts[1]+seprator+parts[0];
    }

    convertDateObjIntoString(date:Date){
      const getDate = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
     return `${year}-${month < 10 ? '0' + month : month}-${getDate < 10 ? '0' + getDate : getDate}`;
    }

  }
