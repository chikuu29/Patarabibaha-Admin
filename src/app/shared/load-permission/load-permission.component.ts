import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-load-permission',
  templateUrl: './load-permission.component.html',
  styleUrls: ['./load-permission.component.scss']
})
export class LoadPermissionComponent implements OnInit {


  navConfig: any[] = []
  constructor(
    public activeModal: NgbActiveModal,
    private app: AppService
  ) { }

  ngOnInit(): void {
    console.log(this.app.getappconfig);

    if (this.app.getappconfig && this.app.getappconfig['navConfig'] && this.app.getappconfig['navConfig'].length > 0) {
      this.navConfig = this.app.getappconfig['navConfig']
    } else {
      this.navConfig = []
    }


  }

  save() {
    console.log(this.navConfig);
    let navConfig=_.cloneDeep(_.filter(this.navConfig,{'permissionGranted':true}))
    navConfig.map((t:any)=>{
      if(t['submenu'] && t['submenu'].length>0){
         t['submenu']=_.filter(t['submenu'],{'permissionGranted':true})
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
