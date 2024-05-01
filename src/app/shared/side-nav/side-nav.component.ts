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
      text: 'User Details',
      hidden: false,
      submenuActive: false,
      submenu: [
        {
          routerLink: '/alluserdata',
          icon: 'fa-solid fa-users',
          text: 'All Members',
          id: 'admin-01',
        },
        {
          routerLink: '/u',
          icon: 'fa-solid fa-calendar-times',
          text: 'Premium user',
          id: 'admin-02',
        },
        {
          routerLink: '/u',
          icon: 'fa-solid fa-calendar-times',
          text: 'Free user',
          id: 'admin-03',
        },
        {
          routerLink: '/y',
          icon: 'fa-solid fa-calendar-times',
          text: 'Expire user',
          id: 'admin-04',
        },
        {
          routerLink: '/spotlight',
          icon: 'fa-solid fa-lightbulb',
          text: 'Spotlight members',
          id: 'admin-05',
        },
        {
          routerLink: '/t',
          icon: 'fa-solid fa-lightbulb',
          text: 'Online user',
          id: 'admin-06',
        },
        {
          routerLink: '/r',
          icon: 'fa-solid fa-lightbulb',
          text: 'Suspend user',
          id: 'admin-07',
        },
        {
          routerLink: '/q',
          icon: 'fa-solid fa-lightbulb',
          text: 'Delete user',
          id: 'admin-08',
        },
        {
          routerLink: '/create_user',
          icon: 'fa-solid fa-file-signature',
          text: 'Create User',
          id: 'admin-09',
        },
        {
          routerLink: '/w',
          icon: 'fa-solid fa-file-signature',
          text: 'Uplode user',
          id: 'admin-10',
        },
        {
          routerLink: '/phone-validation',
          icon: 'fa-solid fa-phone',
          text: 'Phone Validation',
          id: 'admin-11',
        },
        {
          routerLink: '/email-validation',
          icon: 'fa-solid fa-envelope',
          text: 'Email Validation',
          id: 'admin-12',
        },




        // {
        //   routerLink: '/like-activity',
        //   icon: 'fa-solid fa-thumbs-up',
        //   text: 'Like Profile',
        //   id: 'admin-07',
        // },
        // {
        //   routerLink: '/ignore-activity',
        //   icon: 'fa-solid fa-ban',
        //   text: 'Ignore Profile',
        //   id: 'admin-08',
        // },


      ],
    },




    {
      routerLink: '',
      icon: 'mdi mdi-laptop',
      text: 'User membership',
      hidden: false,
      submenuActive: false,
      submenu: [
        {
          routerLink: '/addtopaid',
          icon: 'fa-solid fa-dollar-sign',
          text: 'Active to paid',
          id: 'admin-13',
        },
        {
          routerLink: '/upgrade',
          icon: 'fa-solid fa-arrow-circle-up',
          text: 'Upgrade user plan',
          id: 'admin-14',
        },
      ],
    },


    {
      routerLink: '',
      icon: 'mdi mdi-laptop',
      text: 'Login Activity',
      hidden: false,
      submenuActive: false,
      submenu: [
        {
          routerLink: '/a',
          icon: 'fa-solid fa-dollar-sign',
          text: 'User Website visit activity report',
          id: 'admin-13',
        },
       {
          routerLink: '/login-activity',
          icon: 'fa-solid fa-sign-in-alt',
          text: 'User login history',
          id: 'admin-06',
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
          routerLink: '/chat',
          icon: 'fa-solid fa-file-signature',
          text: 'Chatting view',
          id: 'admin-01',
        },
        {
          routerLink: '/chat',
          icon: 'fa-solid fa-file-signature',
          text: 'Message view',
          id: 'admin-01',
        },
        {
          routerLink: '/ch',
          icon: 'fa-solid fa-file-signature',
          text: 'Express Interest',
          id: 'admin-01',
        },
        {
          routerLink: '/ch',
          icon: 'fa-solid fa-file-signature',
          text: 'Member Follow-up Report',
          id: 'admin-01',
        },
        {
          routerLink: '/ch',
          icon: 'fa-solid fa-file-signature',
          text: 'Member Sales Report',
          id: 'admin-01',
        },

      ],
    },

    {
      routerLink: '',
      icon: 'mdi mdi-laptop',
      text: 'Management',
      hidden: false,
      submenuActive: false,
      submenu: [
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
        { routerLink: '/designation', text: 'Designation' },
        { routerLink: '/like-page', text: 'Like' },
        { routerLink: '/chating', text: 'Message content' },
        { routerLink: '/ch', text: 'Chart content' },
        { routerLink: '/ch', text: 'Currency management' },
        { routerLink: '/ch', text: 'Mobile battery banner' },
      ],
    },

    {
      routerLink: '',
      icon: 'mdi mdi-security',
      text: 'UI-Interface',
      hidden: false,
      submenuActive: false,
      submenu: [
        { routerLink: '/pr', text: 'Basic Site Seting' },
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
        { routerLink: '/so', text: 'Google Analytics Code' },
        { routerLink: '/s', text: 'Email Seting' },
        { routerLink: '/soci', text: 'Firebase Setting' },
      ],
    },



    // {
    //   requiredRouterLink: true,
    //   routerLink: '',
    //   icon: 'mdi mdi-file-document-box',
    //   text: 'Chatting Massage',
    //   hidden: false,
    //   submenuActive: false,
    // },

    {
      routerLink: '',
      icon: 'fa-solid fa-crown',
      text: 'Membership',
      hidden: false,
      submenuActive: false,
      submenu: [
        { routerLink: '/viweplan-page', text: 'View Plan' },
        { routerLink: '/addplan-page', text: 'Add Plan' },
        { routerLink: '/type-page', text: 'Type' },
        { routerLink: '/t', text: 'Payment option setting' },
      ],
    },

    // {
        //   routerLink: '/match-makng-page',
        //   icon: 'fa-solid fa-heart',
        //   text: 'Match Making',
        //   id: 'admin-10',
        // },

    {
      routerLink: '',
      icon: 'fa-solid fa-crown',
      text: 'Match Making',
      hidden: false,
      submenuActive: false,
      submenu: [
        { routerLink: '/match-makng-page', text: 'Manual Profile Matching' },
        { routerLink: '/ma', text: 'Auto Profile matching schedule' },
        { routerLink: '/ma', text: 'Notification schedule' },
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
          routerLink: '/approve/idapprovel-page',
          text: 'Id Proof',
          badge: this.deliteeeqest,
        },
        {
          routerLink: '/approve/Horoscopeapprovel-page',
          text: 'Horoscope',
          badge: this.deliteeeqest,
        },
        {
          routerLink: '/approve/del',
          text: 'Video',
          badge: this.deliteeeqest,
        },
        {
          routerLink: '/approve/successstotyapprovel-page',
          text: 'Success story',
          badge: this.deliteeeqest,
        },
        {
          routerLink: '/approve/deleterequest-page',
          text: 'Delete Request',
          badge: this.deliteeeqest,
        },
        {
          routerLink: '/approve/salapprovel-page',
          text: 'Salary slip',
          badge: this.deliteeeqest,
        },
        {
          routerLink: '/approve/Other',
          text: 'Other Request',
          badge: this.deliteeeqest,
        },
      ],
    },
    {
      requiredRouterLink: true,
      routerLink: '/deatils-page',
      icon: 'mdi mdi-speedometer',
      text: 'Coupone Code',
      hidden: false,
      submenuActive: false,
    },

    {
      routerLink: '',
      icon: 'fa-solid fa-crown',
      text: 'Lead Generation',
      hidden: false,
      submenuActive: false,
      submenu: [
        { routerLink: '/ma', text: 'Lead Generation' },
        { routerLink: '/ma', text: 'Leade Follo-up data Report' },
        { routerLink: '/ma', text: 'Lead generation report' },
      ],
    },

    {
      routerLink: '',
      icon: 'fa-solid fa-crown',
      text: 'Staff',
      hidden: false,
      submenuActive: false,
      submenu: [
        { routerLink: '/ma', text: 'Staf role' },
        { routerLink: '/ma', text: 'Staf list' },
        { routerLink: '/ma', text: 'Staf assigned members' },
        { routerLink: '/ma', text: 'Staf unassigned members' },
        { routerLink: '/ma', text: 'Staf assigned lead' },
        { routerLink: '/ma', text: 'Staf unassigned lead' },
      ],
    },

    {
      routerLink: '',
      icon: 'fa-solid fa-crown',
      text: 'Franchise',
      hidden: false,
      submenuActive: false,
      submenu: [
        { routerLink: '/ma', text: 'Franchise List' },
        { routerLink: '/ma', text: 'Franchise Members' },
        { routerLink: '/ma', text: 'Franchise assigned members' },
        { routerLink: '/ma', text: 'Franchise Unassigned members' },
        { routerLink: '/ma', text: 'Franchise assigned lead' },
        { routerLink: '/ma', text: 'Franchise unassigned lead' },
        { routerLink: '/ma', text: 'Franchise Sales Report' },
      ],
    },
    {
      routerLink: '',
      icon: 'fa-solid fa-crown',
      text: 'Payment Gateway',
      hidden: false,
      submenuActive: false,
      submenu: [
        { routerLink: '/ma', text: 'All Payment Getway' },
        { routerLink: '/ma', text: 'Offline Payment' },
        { routerLink: '/ma', text: 'Scan & pay' },
      ],
    },

    {
      routerLink: '',
      icon: 'fa-solid fa-crown',
      text: 'Email Configuration',
      hidden: false,
      submenuActive: false,
      submenu: [
        { routerLink: '/ma', text: 'Email Templates' },
        { routerLink: '/ma', text: 'Add Email Templates' },
      ],
    },
    {
      routerLink: '',
      icon: 'fa-solid fa-crown',
      text: 'SMS Configuration',
      hidden: false,
      submenuActive: false,
      submenu: [
        { routerLink: '/ma', text: 'SMS Configuration' },
        { routerLink: '/ma', text: 'SMS Templates' },
      ],
    },

    {
      routerLink: '',
      icon: 'fa-solid fa-crown',
      text: 'Send Bulk Email and SMS',
      hidden: false,
      submenuActive: false,
      submenu: [
        { routerLink: '/ma', text: 'Send Bulk Email' },
        { routerLink: '/ma', text: 'Send Bulk SMS' },
      ],
    },


    {
      routerLink: '',
      icon: 'fa-solid fa-crown',
      text: 'Advertisement',
      hidden: false,
      submenuActive: false,
      submenu: [
        // { routerLink: '/ma', text: 'Send Bulk Email' },
        // { routerLink: '/ma', text: 'Send Bulk SMS' },
      ],
    },

    {
      routerLink: '',
      icon: 'fa-solid fa-crown',
      text: 'Wedding Planer',
      hidden: false,
      submenuActive: false,
      submenu: [
        // { routerLink: '/ma', text: 'Send Bulk Email' },
        // { routerLink: '/ma', text: 'Send Bulk SMS' },
      ],
    },
    {
      routerLink: '',
      icon: 'fa-solid fa-crown',
      text: 'Admin Support',
      hidden: false,
      submenuActive: false,
      submenu: [
         { routerLink: '/ma', text: 'Support Ticket' },
        // { routerLink: '/ma', text: 'Send Bulk SMS' },
      ],
    },
    // {
    //   routerLink: '',
    //   icon: 'fa-solid fa-crown',
    //   text: 'Database Backup',
    //   hidden: false,
    //   submenuActive: false,
    //   submenu: [
    //     // { routerLink: '/ma', text: 'Support Ticket' },
    //     // { routerLink: '/ma', text: 'Send Bulk SMS' },
    //   ],
    // },
    {
      requiredRouterLink: true,
      routerLink: 'database-backup',
      icon: 'mdi mdi-airplane-landing',
      text: 'Database Backup',
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
