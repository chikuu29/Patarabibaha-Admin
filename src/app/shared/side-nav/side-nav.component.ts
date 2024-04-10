import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { CryptographyService } from 'src/app/services/cryptography.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  @Input() isSidenavCoolapedForSmallScreen = false;
  usercount: number = 0;
  profilephotocount: number = 0;
  deliteeeqest: number = 0;
  phoneapprovedata: number = 0;

  navConfig = [
    {
      requiredRouterLink: true,
      routerLink: 'landing-page',
      icon: 'mdi mdi-airplane-landing',
      text: 'Landing Page',
      hidden: false,
      submenuActive: false,
    },
    {
      requiredRouterLink: true,
      routerLink: 'dashboard',
      icon: 'mdi mdi-speedometer',
      text: 'Dashboard',
      hidden: false,
      submenuActive: false,
    },
    {
      routerLink: '',
      icon: 'mdi mdi-laptop',
      text: 'All User Data',
      hidden: false,
      submenuActive: false,
      submenu: [
        {
          routerLink: '/create_user',
          icon: 'fa-solid fa-file-signature',
          text: 'Create User',
          id: 'admin-01',
        },
        {
          routerLink: '/contact-view',
          icon: 'fa-solid fa-file-signature',
          text: 'Contactus View',
          id: 'admin-01',
        },
        {
          routerLink: '/horoscope-viwe',
          icon: 'fa-solid fa-file-signature',
          text: 'Horoscope View',
          id: 'admin-01',
        },
        {
          routerLink: '/alluserdata',
          icon: 'fa-solid fa-users',
          text: 'All Members',
          id: 'admin-02',
        },
        {
          routerLink: '/addtopaid',
          icon: 'fa-solid fa-dollar-sign',
          text: 'Active To Paid',
          id: 'admin-03',
        },
        {
          routerLink: '/upgrade',
          icon: 'fa-solid fa-arrow-circle-up',
          text: 'Upgrade User Plan',
          id: 'admin-04',
        },
        {
          routerLink: '/spotlight',
          icon: 'fa-solid fa-lightbulb',
          text: 'Spotlight Area',
          id: 'admin-05',
        },
        {
          routerLink: '/login-activity',
          icon: 'fa-solid fa-sign-in-alt',
          text: 'Login Activity',
          id: 'admin-06',
        },
        {
          routerLink: '/like-activity',
          icon: 'fa-solid fa-thumbs-up',
          text: 'Like Profile',
          id: 'admin-07',
        },
        {
          routerLink: '/ignore-activity',
          icon: 'fa-solid fa-ban',
          text: 'Ignore Profile',
          id: 'admin-08',
        },
        {
          routerLink: '/expire-member',
          icon: 'fa-solid fa-calendar-times',
          text: 'Expire Members',
          id: 'admin-09',
        },
        {
          routerLink: '/match-makng-page',
          icon: 'fa-solid fa-heart',
          text: 'Match Making',
          id: 'admin-10',
        },
        {
          routerLink: '/phone-validation',
          icon: 'fa-solid fa-phone',
          text: 'Phone Validation',
          id: 'admin-12',
        },
        {
          routerLink: '/email-validation',
          icon: 'fa-solid fa-envelope',
          text: 'Email Validation',
          id: 'admin-13',
        },
      ],
    },
    {
      routerLink: '',
      icon: 'fa-solid fa-crown',
      text: 'Membership Plan',
      hidden: false,
      submenuActive: false,
      submenu: [
        { routerLink: '/viweplan-page', text: 'View Plan' },
        { routerLink: '/addplan-page', text: 'Add Plan' },
        { routerLink: '/type-page', text: 'Type' },
      ],
    },
    {
      routerLink: '',
      icon: 'mdi mdi-laptop',
      text: 'Management',
      hidden: false,
      submenuActive: false,
      submenu: [
        { routerLink: '/socialmedia-page', text: 'Social Media' },
        { routerLink: '/country-page', text: 'Country' },
        { routerLink: '/state-page', text: 'State' },
        { routerLink: '/city-page', text: 'City' },
        { routerLink: '/zodiacs-page', text: 'Zodiacs' },
        { routerLink: '/nakshatra-page', text: 'Nakshatra' },
        { routerLink: '/annualincome-page', text: 'Annualincome' },
        { routerLink: '/mother-tongue-page', text: 'Mother Tongue' },
        { routerLink: '/employedin-page', text: 'Employed In' },
        { routerLink: '/occupation-page', text: 'Occupation' },
        {
          routerLink: '/aditional-education-page',
          text: 'Aditional Eeducation',
        },
        { routerLink: '/education-page', text: 'Highest Education' },
        { routerLink: '/religion-page', text: 'Religion' },
        { routerLink: '/cast-page', text: 'Cast' },
        { routerLink: '/subcast-page', text: 'Sub Cast' },
        { routerLink: '/gotra-page', text: 'Gotra' },
        { routerLink: '/designation', text: 'designation' },
      ],
    },
    {
      routerLink: '',
      icon: 'mdi mdi-security',
      text: 'UI-Interface',
      hidden: false,
      submenuActive: false,
      submenu: [
        { routerLink: '/privacypolicy-page', text: 'Privacy Policy' },
        { routerLink: '/termandcondition-page', text: 'Term and Condition' },
        { routerLink: '/aboutus-page', text: 'About Us' },
        { routerLink: '/contactus-page', text: 'Contact Us' },
        { routerLink: '/prifixid-page', text: 'Prifix Id' },
        { routerLink: '/logo-page', text: 'Logo Image' },
        { routerLink: '/banner-page', text: 'Banner Image' },
        { routerLink: '/water-page', text: 'Water Mark' },
        { routerLink: '/barcode-page', text: 'Bar Code' },
        { routerLink: '/home-content', text: 'Home Page Content' },
        { routerLink: '/home-icon', text: 'Home Icon' },
      ],
    },
    {
      routerLink: '',
      icon: 'mdi mdi-security',
      text: 'Approval Notice',
      hidden: false,
      submenuActive: false,
      submenu: [
        {
          routerLink: '/approve/userapprove-page',
          text: 'User Approve',
          badge: this.usercount,
        },
        {
          routerLink: '/approve/profileimagepprove-page',
          text: 'Profile Image Approve',
          badge: this.profilephotocount,
        },
        {
          routerLink: '/approve/deleterequest-page',
          text: 'Delete Request',
          badge: this.deliteeeqest,
        },
      ],
    },
    {
      requiredRouterLink: true,
      routerLink: '/chating',
      icon: 'mdi mdi-file-document-box',
      text: 'Chatting Massage',
      hidden: false,
      submenuActive: false,
    },
    {
      requiredRouterLink: true,
      routerLink: '/sales-report',
      icon: 'mdi mdi-speedometer',
      text: 'Report ',
      hidden: false,
      submenuActive: false,
    },
  ];

  constructor(
    private ApiParameter: ApiParameterScript,
    private cryptographyservice: CryptographyService,
    private _auth: AuthService
  ) {}

  ngOnInit(): void {
    this.getuserAprrove();
    this.getProfileImageAprrove();
    this.getDeleteRequestdata();
    this.phoneapprove();
  }

  getuserAprrove() {
    this.ApiParameter.fetchdata('user_info', {
      projection: ['*'],
      whereConditions: { user_status: 'Pending' },
    }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.usercount = res['data'].length;
        //console.log();
      }
    });
  }
  getProfileImageAprrove() {
    this.ApiParameter.fetchdata('user_profile_images', {
      projection: ['*'],
      whereConditions: { user_profile_images_for_approval: 0 },
    }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.profilephotocount = res['data'].length;
      }
    });
  }
  getDeleteRequestdata() {
    this.ApiParameter.fetchdata('user_delete_request', {
      projection: ['*'],
      whereConditions: { states: 0 },
    }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        this.deliteeeqest = res['data'].length;
      }
    });
  }
  phoneapprove() {
    this.ApiParameter.fetchdata('user_info', {
      projection: ['*'],
      whereConditions: { phone_no_request: 1 },
    }).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        console.log(res['data']);

        this.phoneapprovedata = res['data'].length;
        console.log(this.phoneapprovedata);
      }
    });
  }

  public activeSubmenu(index: number) {
    this.navConfig[index];
    console.log(this.navConfig[index]);
    if (this.navConfig[index].submenuActive) {
      this.navConfig[index]['submenuActive'] = false;
    } else {
      this.navConfig[index]['submenuActive'] = true;
    }
  }
}
