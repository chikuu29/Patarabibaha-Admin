import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-load-permission',
  templateUrl: './load-permission.component.html',
  styleUrls: ['./load-permission.component.scss']
})
export class LoadPermissionComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  @Input() user_id: string = ""
  navConfig: any[] = []
  retrivePermission: any[] = []
  constructor(
    public activeModal: NgbActiveModal,
    private app: AppService,
    private api: ApiParameterScript
  ) { }

  ngOnInit(): void {
    console.log(this.app.getappconfig);




    this.blockUI.start('Fetch User Information')
    const apiData = {
      "projection": ["permission"],
      "whereConditions":
        { 'UserId': this.user_id }
    }



    this.api.fetchdata("admin", apiData).subscribe((res: any) => {
      console.log("user", res);
      this.blockUI.stop()
      if (res.success && res['data'].length > 0) {
        console.log(res['data'][0]['permission']);
        this.retrivePermission = JSON.parse(res['data'][0]['permission'])


        console.log("this.navConfig", this.navConfig);
        console.log("this.retrivePermission", this.retrivePermission);


        console.log([...this.retrivePermission,...this.navConfig]);
        
        const mergedArray = this.mergeArrays(this.retrivePermission, this.navConfig);

        this.navConfig = mergedArray
        console.log("mergedArray", mergedArray);

        //  this.retrivePermission.map((i:any)=>{

        //   console.log(i);

        //   if(i.submenu && i.submenu.length>0){

        //   }


        //  })


      } else {

      }


    })
    // this.api.fetchdata('admin',)



    if (this.app.getappconfig && this.app.getappconfig['navConfig'] && this.app.getappconfig['navConfig'].length > 0) {
      this.navConfig = this.app.getappconfig['navConfig']
    } else {
      this.navConfig = []
    }


  }





  private mergeSubmenus(submenu1: any[], submenu2: any[]): any[] {
    if (!submenu1 || submenu1.length === 0) {
      return submenu2;
    }
    if (!submenu2 || submenu2.length === 0) {
      return submenu1;
    }

    const mergedSubmenu = [...submenu1];

    for (const item of submenu2) {
      const existingItem = mergedSubmenu.find(i => i.id === item.id);
      if (!existingItem) {
        mergedSubmenu.push(item);
      } else {
        Object.assign(existingItem, item);
      }
    }

    return mergedSubmenu;
  }

  private mergeObjects(obj1: any, obj2: any): any {
    const mergedSubmenu = this.mergeSubmenus(obj1.submenu, obj2.submenu);

    return {
      ...obj1,
      ...obj2,
      submenu: mergedSubmenu
    };
  }

  public mergeArrays(array1: any[], array2: any[]): any[] {
    if (array1.length === 1 && array2.length === 1) {
      return [this.mergeObjects(array1[0], array2[0])];
    }

    return [...array1, ...array2].reduce((acc, current) => {
      const existingItem = acc.find((item:any) => item.text === current.text);
      if (!existingItem) {
        return acc.concat([current]);
      } else {
        return acc.map((item:any) => item.text === current.text ? this.mergeObjects(item, current) : item);
      }
    }, []);
  }


  save() {
    console.log(this.navConfig);
    let navConfig = _.cloneDeep(_.filter(this.navConfig, { 'permissionGranted': true }))
    navConfig.map((t: any) => {
      if (t['submenu'] && t['submenu'].length > 0) {
        t['submenu'] = _.filter(t['submenu'], { 'permissionGranted': true })
      }
    })
    console.log(navConfig);


    this.activeModal.close(navConfig);
  }

  someComplete() {
    return false
  }


  setAll(completed: boolean, index: number) {






    this.navConfig[index]['permissionGranted'] = completed

    if (this.navConfig[index]['submenu'] && this.navConfig[index]['submenu'].length > 0) {
      this.navConfig[index]['submenu'].map((t: any) => {
        t['permissionGranted'] = completed
      })
    }
    // this.allComplete = completed;
    // if (this.task.subtasks == null) {
    //   return;
    // }
    // this.task.subtasks.forEach(t => (t.completed = completed));
  }

  updateAllComplete(i: number) {



    if (!this.navConfig[i].permissionGranted) {
      this.navConfig[i]['permissionGranted'] = true
    } else {
      if (_.filter(this.navConfig[i]['submenu'], { permissionGranted: true }).length == 0) {
        this.navConfig[i]['permissionGranted'] = false
      }
    }


    // if(this.navConfig[i].submenu)




  }
}
