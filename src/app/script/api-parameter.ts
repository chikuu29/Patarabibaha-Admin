import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import Swal from "sweetalert2";
import { ApiService } from "../services/api.service";
import { AppService } from "../services/app.service";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { CryptographyService } from "../services/cryptography.service";


@Injectable({
    providedIn: 'root'
})
export class ApiParameterScript {
    @BlockUI() blockUI: NgBlockUI;
    // **************************

    constructor(
        private http: HttpClient,
        private apiservices: ApiService,
        private appservices: AppService,
        private cryptography: CryptographyService

    ) {
        console.log("Calling API Parametere");
    }


    /**
     * {
            "table":"country_table",
            "projection":["*"],
            "whereConditions":[
                ["country_name", "INDIA"]
        
          ]
        }

     * @param db 
     * @param apiData 
     * @param offset :Numbser
     * @param limit :Numbser
     * @returns 
     * @author Suryanarayan Biswal
     * @since 20-10-2022
     */
    public fetchdata(db: string, apiData: any,offset:Number=0,limit:Number=100) {
        const simpleObservable = new Observable((observer) => {
            try {
                apiData['table'] = db;
                apiData['offset']=offset
                apiData['limit']=limit
                this.blockUI.start("Please Wait")
                this.apiservices.getdata(apiData).subscribe(
                    (res: any) => {
                        this.blockUI.stop()
                        observer.next(res);
                        observer.complete();
                    }, (err: any) => {
                        this.blockUI.stop()
                        observer.next(err);
                        observer.complete();
                    }
                )
            } catch (error) {
                this.blockUI.stop()
                console.log({ "methodName": "ApiParameterScript.fetchdata", "error": error });
                observer.next(error);
                observer.complete();
            }
        });
        return simpleObservable;
    }


    /**
     * {
             "table":"country_table",
             "data":[],
             "whereConditions":{
                 "country_name":"INDIA"
             ]
         } Upadte data parametr formate 
 
 
     * @param db 
     * @param apiData 
     * @returns 
     * @author Suryanarayan Biswal
     * @since 20-10-2022
     */
    public updatedata(db: string, apiData: any) {
        const simpleObservable = new Observable((observer) => {
            try {
                apiData['table'] = db;
                // const appConfig = this.appservices.getappconfig;
                // const loginInfo = this.appservices.authStatus;
                // let getrole = loginInfo['role'] ? loginInfo['role'] : '';
                // let outh = appConfig['roleConfig'][getrole] ? appConfig['roleConfig'][getrole]['authorizationDBAcess'].includes(db) : false;
                // let outhForUpdate = appConfig['roleConfig'][getrole] ? appConfig['roleConfig'][getrole]['authorizationDBAcessForUpdate'] ? appConfig['roleConfig'][getrole]['authorizationDBAcessForUpdate'].includes(db) : false : false;
                // if (appConfig['roleConfig'][getrole] && (outh && outhForUpdate)) {
                //     apiData['loginInfo'] = loginInfo;
                this.apiservices.update(apiData).subscribe((res: any) => {
                    observer.next(res);
                    observer.complete();
                })
                // } else {
                //     observer.next({ "success": false, "message": "Permission Denied To Update Database" });
                //     observer.complete();
                // }
            } catch (error) {
                console.log({ "methodName": "ApiParameterScript.fetchdata", "error": error });
                observer.next(error);
                observer.complete();
            }
        });
        return simpleObservable;
    }


    /**
    * {
        "data":"case_status='accepted'",
        "db":"agriculture_case",
        "loginInfo":{
                        "email":"cchiku1999@gmail.com",
                            "id": "SURYA1234",
                            "isLogin": true,
                            "name": "SURYANARAYAN BISWAL",
                            "role": "agri"
                    }
        
        }

    * @param db 
    * @param apiData 
    * @returns 
    * @author Suryanarayan Biswal
    * @since 20-10-2022
    */
    public savedata(db: string, apiData: any) {
        const simpleObservable = new Observable((observer) => {
            try {
                apiData['table'] = db;
                // const appConfig = this.appservices.getappconfig;
                // const loginInfo = this.appservices.authStatus;
                // let getrole = loginInfo['role'] ? loginInfo['role'] : '';
                // let outh = appConfig['roleConfig'][getrole] ? appConfig['roleConfig'][getrole]['authorizationDBAcess'].includes(db) : false;
                // let outhForUpdate = appConfig['roleConfig'][getrole] ? appConfig['roleConfig'][getrole]['authorizationDBAcessForUpdate'] ? appConfig['roleConfig'][getrole]['authorizationDBAcessForUpdate'].includes(db) : false : false;
                // if (appConfig['roleConfig'][getrole] && (outh && outhForUpdate)) {
                //     apiData['loginInfo'] = loginInfo;
                this.apiservices.save(apiData).subscribe((res: any) => {
                    observer.next(res);
                    observer.complete();
                })
                // } else {
                //     observer.next({ "success": false, "message": "Permission Denied To Save Date" });
                //     observer.complete();
                // }
            } catch (error) {
                console.log({ "methodName": "ApiParameterScript.fetchdata", "error": error });
                observer.next(error);
                observer.complete();
            }
        });
        return simpleObservable;
    }

    /**
    * {
            "table":"country_table",
            "whereConditions":{
                "country_name":"INDIA"
            ]
    }

    * @param db 
    * @param apiData 
    * @returns 
    * @author Suryanarayan Biswal
    * @since 20-10-2022
    */
    public deletedata(db: string, apiData: any) {
        const simpleObservable = new Observable((observer) => {
            try {
                apiData['table'] = db;
                // if (apiData['multidelete'] == undefined) {
                //     apiData['multidelete'] = false
                //     apiData['data'] = ''
                // }
                // const appConfig = this.appservices.getappconfig;
                // const loginInfo = this.appservices.authStatus;
                // let getrole = loginInfo['role'] ? loginInfo['role'] : '';
                // let outh = appConfig['roleConfig'][getrole] ? appConfig['roleConfig'][getrole]['authorizationDBAcess'].includes(db) : false;
                // let outhForDelete = appConfig['roleConfig'][getrole] ? appConfig['roleConfig'][getrole]['authorizationDBAcessForDelete'] ? appConfig['roleConfig'][getrole]['authorizationDBAcessForDelete'].includes(db) : false : false;
                // if (appConfig['roleConfig'][getrole] && (outh && outhForDelete)) {
                //     apiData['loginInfo'] = loginInfo;
                    this.apiservices.delete(apiData).subscribe((res: any) => {
                        observer.next(res);
                        observer.complete();
                    })
                // } else {
                //     observer.next({ "success": false, "message": "Permission Denied for Delete Operation" });
                //     observer.complete();
                // }
            } catch (error) {
                console.log({ "methodName": "ApiParameterScript.fetchdata", "error": error });
                observer.next(error);
                observer.complete();
            }
        });
        return simpleObservable;
    }





    /**
   * {
       "data":"case_status='accepted'",
       "db":"agriculture_case",
       "projection":"case_id='WAC4641665460808ggggddd'",
       "loginInfo":{
                       "email":"cchiku1999@gmail.com",
                           "id": "SURYA1234",
                           "isLogin": true,
                           "name": "SURYANARAYAN BISWAL",
                           "role": "agri"
                   }
       
       }
  * @param requestId ,100(For Adding New product) ,101(For Updating Product)
   * @param db 
   * @param apiData 
   * @returns 
   * @author Suryanarayan Biswal
   * @since 01-11-2022
   */
    public create_Product_For_Sell(db: string, apiData: any, request_id: any) {
        const simpleObservable = new Observable((observer) => {
            try {
                // apiData['db'] = db;
                const appConfig = this.appservices.getappconfig;
                const loginInfo = this.appservices.authStatus;
                let getrole = loginInfo['role'] ? loginInfo['role'] : '';
                let outh = appConfig['roleConfig'][getrole] ? appConfig['roleConfig'][getrole]['authorizationDBAcess'].includes(db) : false;
                let outhForUpdate = appConfig['roleConfig'][getrole] ? appConfig['roleConfig'][getrole]['authorizationDBAcessForUpdate'] ? appConfig['roleConfig'][getrole]['authorizationDBAcessForUpdate'].includes(db) : false : false;
                if (appConfig['roleConfig'][getrole] && (outh && outhForUpdate)) {
                    apiData['loginInfo'] = loginInfo;
                    this.apiservices.requsting_E_Commerce_Product_Api(request_id, apiData).subscribe((res: any) => {
                        observer.next(res);
                        observer.complete();
                    })
                } else {
                    observer.next({ "success": false, "message": "Permission Denied To Update Database" });
                    observer.complete();
                }
            } catch (error) {
                console.log({ "methodName": "ApiParameterScript.fetchdata", "error": error });
                observer.next(error);
                observer.complete();
            }
        });
        return simpleObservable;
    }
    public fetchDataFormQuery(query: any) {
        const simpleObservable = new Observable((observer) => {
            try {
                var apData = {
                    "query": query
                }
                query = this.cryptography.encryptData(apData)
                this.apiservices.fetchDataQueryApi(query).subscribe(
                    (res: any) => {
                        try {
                            res = JSON.parse(this.cryptography.decryptData(JSON.stringify(res)));
                            observer.next(res);
                            observer.complete();
                        } catch (error) {
                            observer.next({ success: false, message: error });
                            observer.complete();

                        }

                    }, (err: any) => {
                        observer.next({ success: false, message: err });
                        observer.complete();
                    }
                )

            } catch (error) {
                console.log({ "methodName": "ApiParameterScript.fetchDataFormQuery", "error": error });
                observer.next(error);
                observer.complete();
            }
        });
        return simpleObservable;
    }

    /**
       * @param FilePath 
       * @param FileName 
       * @returns 
       * @author Suryanarayan Biswal
       * @since 01-11-2022
       */
    public deleteImageFile(FilePath: any, FileName: any) {
        const simpleObservable = new Observable((observer) => {
            try {
                // apiData['db'] = db;
                var apiData: any = {}
                apiData['FilePath'] = FilePath;
                apiData['FileName'] = FileName;
                // const appConfig = this.appservices.getappconfig;
                const loginInfo = this.appservices.authStatus;
                let getrole = loginInfo['role'] ? loginInfo['role'] : false;
                // let outh = appConfig['roleConfig'][getrole] ? appConfig['roleConfig'][getrole]['authorizationDBAcess'].includes(db) : false;
                // let outhForUpdate = appConfig['roleConfig'][getrole] ? appConfig['roleConfig'][getrole]['authorizationDBAcessForUpdate'] ? appConfig['roleConfig'][getrole]['authorizationDBAcessForUpdate'].includes(db) : false : false;
                if (getrole) {
                    apiData['loginInfo'] = loginInfo;
                    this.apiservices.deleteImage(apiData).subscribe((res: any) => {
                        observer.next(res);
                        observer.complete();
                    })
                } else {
                    observer.next({ "success": false, "message": "Permission Denied To Update Database" });
                    observer.complete();
                }
            } catch (error) {
                console.log({ "methodName": "ApiParameterScript.fetchdata", "error": error });
                observer.next(error);
                observer.complete();
            }
        });
        return simpleObservable;
    }





    /**
        * {
           
            "user_id":''
            
            }
    
        * @param apiData 
        * @returns 
        * @author Suryanarayan Biswal
        * @since 11-06-2023
        */
    public getprofile(apidata: any) {
        const simpleObservable = new Observable((observer) => {
            try {

                this.apiservices.getprofile(apidata).subscribe((res: any) => {
                    observer.next(res);
                    observer.complete();
                })

            } catch (error) {
                console.log({ "methodName": "ApiParameterScript.fetchdata", "error": error });
                observer.next(error);
                observer.complete();
            }
        });
        return simpleObservable;
    }

    /* @param apiData 
    * @returns 
    * @author Suryanarayan Biswal
    * @since 11-06-2023
    */
public makeActinForMultipulData(db:any ,apidata: any) {
     
    const simpleObservable = new Observable((observer) => {
        try {
            apidata['table'] = db;
            this.apiservices.makeActinForMultipulData(apidata).subscribe((res: any) => {
                observer.next(res);
                observer.complete();
            })

        } catch (error) {
            console.log({ "methodName": "ApiParameterScript.fetchdata", "error": error });
            observer.next(error);
            observer.complete();
        }
    });
    return simpleObservable;
}

}