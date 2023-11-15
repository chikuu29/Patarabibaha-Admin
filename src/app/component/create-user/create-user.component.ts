import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { RegisterService } from 'src/app/services/register.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  
  @BlockUI() blockUI: NgBlockUI;
  // **************************
  date: Date;
  model: NgbDate;
  hide: boolean = true;

  form1: FormGroup;
  form2: FormGroup;
  form3: FormGroup;

  profileID: any;
  dayOption: any[]
 months:any = [
    { value: '01', display: 'Jan' },
    { value: '02', display: 'Feb' },
    { value: '03', display: 'Mar' },
    { value: '04', display: 'Apr' },
    { value: '05', display: 'May' },
    { value: '06', display: 'Jun' },
    { value: '07', display: 'Jul' },
    { value: '08', display: 'Aug' },
    { value: '09', display: 'Sep' },
    { value: '10', display: 'Oct' },
    { value: '11', display: 'Nov' },
    { value: '12', display: 'Dec' }
  ];
  
  year:any[]=[
    "1985", "1986", "1987", "1988", "1989", "1990", "1991", "1992", "1993", "1994",
    "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004",
    "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014",
    "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024",
    "2025", "2026", "2027", "2028", "2029", "2030", "2031", "2032", "2033", "2034",
    "2035", "2036", "2037", "2038", "2039", "2040", "2041", "2042", "2043", "2044",
    "2045", "2046", "2047", "2048", "2049", "2050"
  ]
  

  constructor(
    private formBuilder: FormBuilder,
    private registerServices: RegisterService,
    private alert: ToastrService,
    private router: Router,
    private auth: AuthService
  ) {

    this.form1 = this.formBuilder.group({
      profileType: ['', Validators.required],
      gender: ['', [Validators.required]],
    });
    this.form2 = this.formBuilder.group({
      fname: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      lname: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      day: ['', [Validators.required, Validators.min(1), Validators.max(31)]],
      month: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      year: ['', [Validators.required, Validators.min(1900), Validators.max(2100)]]
      // dob: ['', [Validators.required]],
    });
    this.form3 = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required,Validators.pattern(/^(?:\+?91)?[789]\d{9}$/)]],
      password: ['', [Validators.required]],
    });

  }

  ngOnInit(): void {

    this.dayOption= Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'))
    console.log(this.dayOption);
    
    setTimeout(() => {
      this.activeFormTab('form1');
      this.blockUI.stop()
    }, 500);


  }

  back() {
    var getactiveForm = document.querySelector('.active-step');
    var activeFormArrayList = [
      {
        "index": 1,
        "name": 'form1',
        'active': getactiveForm?.classList.contains('form1'),
      },
      {
        "index": 2,
        "name": 'form2',
        'active': getactiveForm?.classList.contains('form2'),
      },
      {
        "index": 3,
        "name": 'form3',
        'active': getactiveForm?.classList.contains('form3'),
      }

    ]

    // console.log("get", getactiveForm);

    activeFormArrayList.forEach((e1: any) => {
      if (e1.active && e1.name !== 'form1') {
        var deactiveForm = document.querySelector('.' + e1.name);
        var activeForm = document.querySelector('.form' + (e1.index - 1));
        deactiveForm?.classList.remove('active-step');
        activeForm?.classList.add('active-step');
      }
    })

  }

  activeFormTab(name: any) {

    var form = document.querySelector('.' + name);
    form?.classList.add('active-step');

  }

  continue() {

    // console.log("Form 1", this.form1.value);
    var form1 = document.querySelector('.form1');
    form1?.classList.remove('active-step')
    this.activeFormTab('form2')



  }

  signup() {

    this.blockUI.start('Setup Account...')
    var apiData = {
      "profileType": this.form1.value.profileType,
      "gender": this.form1.value.gender,
      "fname": this.form2.value.fname,
      "lname": this.form2.value.lname,
      "dob": `${this.form2.value.year}-${this.form2.value.month}-${this.form2.value.day}`,
      "email": this.form3.value.email,
      "phone": `${this.form3.value.phone}`,
      "password": this.form3.value.password
      // "profileID":this.profileID


    }
    // console.log("Formdata", apiData);

    this.registerServices.setupuserAuthAccount(apiData).subscribe(
      (res: any) => {
        this.blockUI.stop();
        console.log(res);
        
        if (res.success) {
          Swal.fire('Success!', res.message, 'success').then(() => {
           this.router.navigateByUrl('/user/'+res.profileID)
            // var credential = {
            //   userID: this.form3.value.email,
            //   password: this.form3.value.password
            // }

            // this.blockUI.start('Please Wait')
            // this.auth.signIn(credential).subscribe((authRes: any) => {
            //   this.blockUI.stop()
            //   authRes = JSON.parse(atob(authRes.id));
            //   if (authRes.status) {
            //     // var expiration_date = new Date(new Date().getTime() + 86400 * 1000).toString();
            //     // this.auth.authentication(authRes.profile_id, authRes.profile_name, authRes.profile_email, true, "LOGIN_USER", expiration_date);
            //     // this.router.navigateByUrl('/')
            //   } else {
            //     this.alert.error(res.message);
            //   }
            // })


          })


        } else {
          this.alert.error(res.message, 'Information')

        }
        // console.log(res);

      }, (err: any) => {
        this.blockUI.stop()
        this.alert.error(err.message, 'OPS!')
        console.log(err);

      })

  }

  setProfile() {

    // console.log("Form 1", this.form2.value);
    var dob = `${this.form2.value.year}-${this.form2.value.month}-${this.form2.value.day}`
    // console.log(dob);


    const inputDate = new Date(dob);
    const currentDate = new Date();
    const minDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());

    if (inputDate >= minDate) {
      Swal.fire("Warning",'Please Enter DOB Greater Than 18','warning')

    } else {

      var form1 = document.querySelector('.form2');
      form1?.classList.remove('active-step')
      this.activeFormTab('form3')
    }



    // var apiData = {
    //   "fname": this.form3.value.fname,
    //   "lname": this.form3.value.lname,
    //   "dob": moment(this.form3.value.dob).format('YYYY-MM-DD'),
    //   "profileID":this.profileID
    // }
    // console.log(apiData);
    // this.blockUI.start("Please Wait...")
    // this.registerServices.setProfile(apiData).subscribe((res:any)=>{

    //   this.blockUI.stop();
    //   if(res.success){

    //     Swal.fire('Success!',res.message,'success').then(()=>{

    //       var credential={
    //         userID: this.form2.value.email,
    //         password: this.form2.value.password
    //       }

    //       this.blockUI.start('Please Wait')
    //       this.auth.signIn(credential).subscribe((authRes:any)=>{
    //         this.blockUI.stop()
    //         if (authRes.status) {
    //           // this.alert.success(res.message, "Done");
    //           // localStorage.setItem('loginiinfo', JSON.stringify(res))
    //           var expiration_date = new Date(new Date().getTime() + 86400 * 1000).toString();
    //           this.auth.authentication(authRes.profile_id, authRes.profile_name, authRes.profile_email, true, "LOGIN_USER", expiration_date);
    //           location.reload()
    //         } else {
    //           this.alert.error(res.message);
    //         }
    //       })
    //       this.activeModal.close();
    //     })
    //   }else{
    //     Swal.fire('OPS!',res.message,'error')
    //   }



    // })

  }

}
