import * as moment from "moment";

export class admin{

    constructor(
        public id:String ,
        public name:String ,
        public email:String,
        public isLogin:boolean,
        public role:any,
        private _refreshkey:any,
        public expiration_date:any

    ){
    
    }

    get token(){
        const currentDate = Math.floor(new Date().getTime() / 1000);           
        if(this.expiration_date> currentDate){
            return this._refreshkey;
        }
        return null
    }


}