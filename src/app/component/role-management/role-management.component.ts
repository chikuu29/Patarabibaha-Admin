import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/auth.service';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss']
})
export class RoleManagementComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  // **************************
  public userData: any[] = [];
  // Validators.pattern("^W-([A-Z]{5,5})([@_])([0-9]{3,5})$")]
  userFormData = new FormGroup({

    admin_id: new FormControl('', [Validators.required]),
    admin_name: new FormControl('', [Validators.required, Validators.pattern("^([a-z A-Z]{4,30})$")]),
    admin_email: new FormControl('', [Validators.required, Validators.email]),
    admin_password: new FormControl('', [Validators.required]),
    admin_phone_no: new FormControl('', [Validators.required, Validators.pattern("[0-9]{10}")]),
    admin_created: new FormControl(moment().format('LLL').toString(), [Validators.required]),
    role: new FormControl('', [Validators.required])

    // Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$")
  })
  public adminIDdisabled = false
  public hide: boolean = true;
  public allowToSave: boolean = true;
  public allowToUpdate: boolean = true;
  public allowToCancle: boolean = true;
  public selectRole: string[] = ['GUEST'];

  constructor(
    private apiParameter: ApiParameterScript,
    private appservices: AppService,
    private auth: AuthService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    // this.userFormData.get('admin_created')?.disable()
    this.getUserDetails()
    if (this.appservices.getappconfig) {
      this.selectRole = Object.keys(this.appservices.getappconfig['roleConfig'])
      // console.log(this.selectRole);
    }

  }

  public getUserDetails() {

    this.blockUI.start('Fetch User Information')
    const apiData = {
      "projection": ["*"], "whereConditions": {}

      
    }
    this.apiParameter.fetchdata("admin", apiData).subscribe((res: any) => {
      console.log("user",res);
      this.blockUI.stop()
      if (res.success && res['data'].length > 0) {
        this.userData = res['data']
        this.expand(this.userData[0])
      } else {
        this.userData = []
      }


    })

  }

  public expand(user: any) {
    this.blockUI.start("Loading...")
    this.adminIDdisabled = true
    setTimeout(() => {
      this.userFormData.patchValue(user)
      // this.userFormData.enable()
      // this.userFormData.get('admin_id')?.disable()
      this.allowToSave = true
      this.allowToUpdate = false
      this.allowToCancle = false
      this.blockUI.stop()
    }, 200);


  }
  public delete(userID: any) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this user?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.blockUI.start("Delete...")
        this.apiParameter.deletedata("admin", { "projection": `admin_id='${userID}'` }).subscribe((res: any) => {
          this.blockUI.stop()
          console.log(res);
          if (res.success) {
            Swal.fire('Success', res.message, 'success').then(res => {
              this.ngOnInit()
            })
          } else {
            Swal.fire('error', res.message, 'error')
          }

        })
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      }
    })


  }

  public cancle() {
    this.userFormData.reset()
    // this.userFormData.disable()
    this.allowToSave = true
    this.allowToUpdate = true
  }

  public add() {
    // this.userFormData.reset()
    this.adminIDdisabled = false
    this.userFormData.setValue({
      admin_created: moment().format('LLL').toString(),
      admin_id: null,
      admin_name: null,
      admin_email: null,
      admin_password: null,
      admin_phone_no: null,
      role: null
    })
    // this.userFormData.enable()
    this.userFormData.get('admin_created')?.disabled
    this.allowToSave = false
    this.allowToUpdate = true
    this.allowToCancle = false
  }

  public save() {
    this.blockUI.start("Creating User")
    console.log(this.userFormData.value);
    this.auth.createUserRole(this.userFormData.value).subscribe((res: any) => {
      this.blockUI.stop()
      if (res.success) {
        Swal.fire('Success', res.message, 'success').then(res => {
          this.ngOnInit()
        })
      } else {
        Swal.fire('Sorry!', res.message, 'error')
      }
    })


  }
  public update() {

    console.log(this.userFormData.value);
    this.blockUI.start('Updating...')
    this.auth.updateUserRole(this.userFormData.value).subscribe((res: any) => {
      this.blockUI.stop()
      if (res.success) {
        Swal.fire('Success', res.message, 'success')
      } else {
        Swal.fire('Sorry!', res.message, 'error')
      }

    })

  }
  getErrorMessage(name: any, msg: any) {

    switch (name) {
      case "admin_created":
        if (this.userFormData.controls.admin_created.hasError('required')) {
          return msg;
        } else {
          return 'Great!'
        }
        break;
      case "admin_id":
        if (this.userFormData.controls.admin_id.hasError('required')) {
          return msg;
        } else if (this.userFormData.controls.admin_id.hasError('pattern')) {
          return "User ID Should Be Like W-ABCDE@123 or W-ABCDE_123";
        } else {
          return "Great!"
        }
        break;
      case "admin_name":
        if (this.userFormData.controls.admin_name.hasError('required')) {
          return msg;
        } else if (this.userFormData.controls.admin_name.hasError('pattern')) {
          return "Please Enter A-Z Char"
        } else {
          return "Great!"
        }
        break;
      case "admin_email":
        if (this.userFormData.controls.admin_email.hasError('required')) {
          return msg;
        } else if (this.userFormData.controls.admin_email.hasError('email')) {
          return "Please Fill Currect Email ID";
        } else {
          return 'Great!'
        }
        break;
      case "admin_password":
        if (this.userFormData.controls.admin_password.hasError('required')) {
          return msg;
        } else if (this.userFormData.controls.admin_password.hasError('pattern')) {
          return "Minimum 8 characters, at least 1 letter, 1 number and 1 special character:"
        }
        else {
          return 'Great!'
        }
        break;
      case "admin_phone_no":
        if (this.userFormData.controls.admin_phone_no.hasError('required')) {
          return msg;
        } else if (this.userFormData.controls.admin_phone_no.hasError('pattern')) {
          return "Please Enter Valid Phone No";
        } else {
          return 'Great!'
        }
        break;
      case "role":
        if (this.userFormData.controls.role.hasError('required')) {
          return msg;
        } else {
          return 'Great!'
        }
      default:
        return 'Great!';

    }


  }
}
