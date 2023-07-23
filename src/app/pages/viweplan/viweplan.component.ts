import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MessageService } from 'primeng/api';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-viweplan',
  templateUrl: './viweplan.component.html',
  styleUrls: ['./viweplan.component.scss']
})
export class ViweplanComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  // **************************
  allplandata: any;
  planOptionType:any[]=[
    {name:"FREE_PLAN"},
    {name:"DIMOND_PLAN"},
    {name:"GOLD_PLAN"},
  ]
  constructor(
    private api: ApiService,
    private messageService: MessageService,
    private ApiParameterScript:ApiParameterScript
  ) { }



  statuses!: any[];

  clonedProducts: { [s: string]: any } = {};



  ngOnInit(): void {
    this.getallplain();
  }

  getallplain() {
    let parma = {
      'id': ''
    }
    this.blockUI.start("Loading...")
    this.api.getAllData(parma).subscribe((res: any) => {
      this.blockUI.stop()
      if (res.status) {
        this.allplandata = res.message;
        console.log(this.allplandata);

      }
    })
  }
 

  onRowEditInit(product: any) {
    // this.clonedProducts[product.id as string] = { ...product };
  }

  onRowEditSave(data: any) {

    console.log("data",data);
    var updataData={
      "data":data,
      "whereConditions":{"membership_plan_id":data.membership_plan_id}
    }
    this.blockUI.start("Updating")
    this.ApiParameterScript.updatedata("membership_plan",updataData).subscribe((res:any)=>{
      console.log(res);
      this.blockUI.stop()
      if(res.success){
        Swal.fire({
          icon: 'success',
          text: res.message
        }).then((ress: any) => {
          this.ngOnInit()
        });
      }else{
        Swal.fire({
          icon: 'error',
          text: res.message
        })
      }
      
    })
    
    // if (product.price > 0) {
    //   delete this.clonedProducts[product.id as string];
    //   this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
    // } else {
    //   this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
    // }
  }

  onRowEditCancel(product: any, index: number) {
    // this.products[index] = this.clonedProducts[product.id as string];
    delete this.clonedProducts[product.id as string];
  }

}
