import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from 'primeng/api';
import { AuthService } from 'src/app/auth/auth.service';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';
import { LoadPermissionComponent } from 'src/app/shared/load-permission/load-permission.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss'],
})
export class RoleManagementComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  // **************************
  public userData: any[] = [];
  // Validators.pattern("^W-([A-Z]{5,5})([@_])([0-9]{3,5})$")]
  userFormData = new FormGroup({
    UserId: new FormControl('', [Validators.required]),
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('^([a-z A-Z]{4,30})$'),
    ]),
    email_id: new FormControl('', [Validators.required, Validators.email]),
    Password: new FormControl('', [Validators.required]),
    permission: new FormControl('', [Validators.required]),
    phone_number: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{10}'),
    ]),
    created_At: new FormControl(moment().format('LLL').toString(), [
      Validators.required,
    ]),
    role: new FormControl('', [Validators.required]),

    // Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$")
  });
  public adminIDdisabled = false;
  public hide: boolean = true;
  public allowToSave: boolean = true;
  public allowToUpdate: boolean = true;
  public allowToCancle: boolean = true;
  public selectRole: string[] = ['SUPER_ADMIN', 'ADMIN', 'SUBADMIN'];
  filterText:string=''
  constructor(
    private apiParameter: ApiParameterScript,
    private appservices: AppService,
    private auth: AuthService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private modalServices: NgbModal
  ) {}

  ngOnInit(): void {
    // this.userFormData.get('created_At')?.disable()
    this.getUserDetails();
    // if (this.appservices.getappconfig) {
    //   this.selectRole = Object.keys(this.appservices.getappconfig['roleConfig'])
    //   
    // }
  }
  getSearchText(event: any) {
    this.filterText = event;
   
  }
  loadPermission(user_id: any) {
    const options: NgbModalOptions = {
      size: 'xl',
      centered: true,
      scrollable: true,
      backdrop: false,
      windowClass: 'custom-backdrop',
      backdropClass: 'custom-backdrop-border',
    };
    const modelRef = this.modalServices.open(LoadPermissionComponent, options);

    (modelRef.componentInstance.user_id = user_id),
      modelRef.result.then(
        (permissions: any) => {
          this.userFormData.controls.permission.setValue(
            JSON.stringify(permissions)
          );
        },
        (dissmiss: any) => {
          
        }
      );
  }

  public getUserDetails() {
    this.blockUI.start('Fetch User Information');
    const apiData = {
      projection: ['*'],
      whereConditions: {},
    };
    this.apiParameter.fetchdata('admin', apiData).subscribe((res: any) => {
      
      this.blockUI.stop();
      if (res.success && res['data'].length > 0) {
        this.userData = res['data'];
        this.expand(this.userData[0]);
      } else {
        this.userData = [];
      }
    });
  }

  public expand(user: any) {
    this.blockUI.start('Loading...');
    this.adminIDdisabled = true;
    setTimeout(() => {
      this.userFormData.patchValue(user);
      // this.userFormData.enable()
      // this.userFormData.get('UserId')?.disable()
      this.allowToSave = true;
      this.allowToUpdate = false;
      this.allowToCancle = false;
      this.blockUI.stop();
    }, 200);
  }
  public delete(userID: any) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this user?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.blockUI.start('Delete...');
        var apiData = {
          whereConditions: { UserId: userID },
        };
        this.apiParameter.deletedata('admin', apiData).subscribe((res: any) => {
          this.blockUI.stop();
          
          if (res.success) {
            Swal.fire('Success', res.message, 'success').then((res) => {
              this.ngOnInit();
            });
          } else {
            Swal.fire('error', res.message, 'error');
          }
        });
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled',
            });
            break;
        }
      },
    });
  }

  public cancle() {
    this.userFormData.reset();
    // this.userFormData.disable()
    this.allowToSave = true;
    this.allowToUpdate = true;
  }

  public add() {
    // this.userFormData.reset()
    this.adminIDdisabled = false;
    this.userFormData.setValue({
      created_At: moment().format('LLL').toString(),
      UserId: null,
      name: null,
      email_id: null,
      Password: null,
      phone_number: null,
      permission: null,
      role: null,
    });
    // this.userFormData.enable()
    this.userFormData.get('created_At')?.disabled;
    this.allowToSave = false;
    this.allowToUpdate = true;
    this.allowToCancle = false;
  }

  public save() {
    this.blockUI.start('Creating User');
    
    // this.auth.createUserRole(this.userFormData.value).subscribe((res: any) => {
    //   this.blockUI.stop()
    //   if (res.success) {
    //     Swal.fire('Success', res.message, 'success').then(res => {
    //       this.ngOnInit()
    //     })
    //   } else {
    //     Swal.fire('Sorry!', res.message, 'error')
    //   }
    // })

    var apiData: any = { data: this.userFormData.value };

    apiData['creater_name'] = this.appservices.authStatus.name;
    // apiData['isJsonData']=

    this.apiParameter.savedata('admin', apiData).subscribe((res: any) => {
      this.blockUI.stop();
      

      if (res.success) {
        // Swal.fire(
        //   'Admin User Created Successfull',
        //   'Congratulation',
        //   'success'
        // )

        Swal.fire({
          title: `<strong style='color:#5c54a0; font-size:30px;'>Admin User Created Successfull</strong>`,
          html: '<h2>Congratulation</h2> <div class="pyro"><div class="before"></div><div class="after"></div></div>',
          icon: 'success',
        }).then((res: any) => {
          this.ngOnInit();
        });
      } else {
        Swal.fire('Somethings Went Wroung', 'Please Contact Devloper', 'error');
      }
    });
  }
  public update() {
    // var updatedta:any=delete this.userFormData.value.Password
    

    var apiData: any = {
      data: this.userFormData.value,
      whereConditions: { UserId: this.userFormData.value.UserId },
    };

    apiData['creater_name'] = this.appservices.authStatus.name;
    
    this.blockUI.start('Updating...');
    this.apiParameter.updatedata('admin', apiData).subscribe((res: any) => {
      this.blockUI.stop();
      if (res.success) {
        Swal.fire({
          title: `<strong style='color:#5c54a0; font-size:30px;'>Admin User Updated Successfull</strong>`,
          html: '<h2>Congratulation</h2> <div class="pyro"><div class="before"></div><div class="after"></div></div>',
          icon: 'success',
        }).then((res: any) => {
          this.ngOnInit();
        });
      } else {
        Swal.fire('Sorry!', res.message, 'error');
      }
    });
  }
  getErrorMessage(name: any, msg: any) {
    switch (name) {
      case 'created_At':
        if (this.userFormData.controls.created_At.hasError('required')) {
          return msg;
        } else {
          return 'Great!';
        }
        break;
      case 'UserId':
        if (this.userFormData.controls.UserId.hasError('required')) {
          return msg;
        } else if (this.userFormData.controls.UserId.hasError('pattern')) {
          return 'User ID Should Be Like W-ABCDE@123 or W-ABCDE_123';
        } else {
          return 'Great!';
        }
        break;
      case 'name':
        if (this.userFormData.controls.name.hasError('required')) {
          return msg;
        } else if (this.userFormData.controls.name.hasError('pattern')) {
          return 'Please Enter A-Z Char';
        } else {
          return 'Great!';
        }
        break;
      case 'email_id':
        if (this.userFormData.controls.email_id.hasError('required')) {
          return msg;
        } else if (this.userFormData.controls.email_id.hasError('email')) {
          return 'Please Fill Currect Email ID';
        } else {
          return 'Great!';
        }
        break;
      case 'Password':
        if (this.userFormData.controls.Password.hasError('required')) {
          return msg;
        } else if (this.userFormData.controls.Password.hasError('pattern')) {
          return 'Minimum 8 characters, at least 1 letter, 1 number and 1 special character:';
        } else {
          return 'Great!';
        }
        break;
      case 'phone_number':
        if (this.userFormData.controls.phone_number.hasError('required')) {
          return msg;
        } else if (
          this.userFormData.controls.phone_number.hasError('pattern')
        ) {
          return 'Please Enter Valid Phone No';
        } else {
          return 'Great!';
        }
        break;
      case 'role':
        if (this.userFormData.controls.role.hasError('required')) {
          return msg;
        } else {
          return 'Great!';
        }
      default:
        return 'Great!';
    }
  }
  publish(data: any, status: any) {
    if (status == 1) {
      Swal.fire({
        icon: 'question',
        text: 'Do you want to  Unpublish',
        showCancelButton: true,
      }).then((r: any) => {
        
        if (r.isConfirmed) {
          let updateData = {
            data: {
              published: 0,
            },
            whereConditions: { Id: data },
          };
          this.apiParameter
            .updatedata('admin', updateData)
            .subscribe((res: any) => {
              if (res.success) {
                Swal.fire({
                  icon: 'success',
                  text: 'publish',
                }).then(() => {
                  this.ngOnInit();
                });
              } else {
                Swal.fire({
                  icon: 'warning',
                  text: res.message,
                });
              }
            });
        }
      });
    }else if(status == 0){
      Swal.fire({
        icon: 'question',
        text: 'Do you want to Publish',
        showCancelButton: true,
      }).then((r: any) => {
        
        if (r.isConfirmed) {
          let updateData = {
            data: {
              published: 1,
            },
            whereConditions: { Id: data },
          };
          this.apiParameter
            .updatedata('admin', updateData)
            .subscribe((res: any) => {
              if (res.success) {
                Swal.fire({
                  icon: 'success',
                  text: 'publish',
                }).then(() => {
                  this.ngOnInit();
                });
              } else {
                Swal.fire({
                  icon: 'warning',
                  text: res.message,
                });
              }
            });
        }
      });
    }
  }
}
