import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { ApiParameterScript } from 'src/app/script/api-parameter';

@Component({
  selector: 'app-graph-data-view',
  templateUrl: './graph-data-view.component.html',
  styleUrls: ['./graph-data-view.component.scss'],
})
export class GraphDataViewComponent implements OnInit {
  basicData: any;
  basicDataForCustomer: any;
  basicOptions: any;
  basicOptions1: any;
  data: any;
  customerCoute: number = 0;
  userCount: number = 0;
  totalcaseCount: number = 0;
  paiChartCasedata: any;
  options: any;
  freeMemberCount: number = 0;
  paidMemberCount: number = 0;
  acceptedCaseCounte: number = 0;
  maledata: number = 0;
  femaledata: number = 0;
  femaleper: any = 0;
  maleper: any = 0;
  paiChartCasedata1: any;
  constructor(private apiparameter: ApiParameterScript) {}

  ngOnInit(): void {
    this.findFemalecount();
    this.findMalecount();
    let query =
      "SELECT DATE_FORMAT(STR_TO_DATE(user_creation_date_time, '%Y-%m-%d %H:%i:%s'), '%b') AS month, YEAR(STR_TO_DATE(user_creation_date_time, '%Y-%m-%d %H:%i:%s')) AS year, COUNT(*) AS user_count FROM user_info  GROUP BY YEAR(STR_TO_DATE(user_creation_date_time, '%Y-%m-%d %H:%i:%s')), MONTH(STR_TO_DATE(user_creation_date_time, '%Y-%m-%d %H:%i:%s')) ORDER BY YEAR(STR_TO_DATE(user_creation_date_time, '%Y-%m-%d %H:%i:%s')), MONTH(STR_TO_DATE(user_creation_date_time, '%Y-%m-%d %H:%i:%s'));";

    console.log(query);

    this.apiparameter.fetchDataFormQuery(query).subscribe((res: any) => {
      console.log('resss', res);

      if (res.success) {
        this.userCount = _.sumBy(res['data'], 'user_count');
        // this.customerCoute = res['data'][0].count
        this.createCoustomerChart(res['data'], moment().year());
      } else {
        console.log('res', res);
      }
    });
    let query_customer =
      "SELECT DATE_FORMAT(STR_TO_DATE(admin_created, '%M %e, %Y %l:%i %p'), '%b') AS month, YEAR(STR_TO_DATE(admin_created, '%M %e, %Y %l:%i %p')) AS year, COUNT(*) AS admin_count FROM admin WHERE 	admin_id!='' GROUP BY YEAR(STR_TO_DATE(admin_created, '%M %e, %Y %l:%i %p')), MONTH(STR_TO_DATE(admin_created, '%M %e, %Y %l:%i %p')) ORDER BY YEAR(STR_TO_DATE(admin_created, '%M %e, %Y %l:%i %p')), MONTH(STR_TO_DATE(admin_created, '%M %e, %Y %l:%i %p'));";
    this.apiparameter
      .fetchDataFormQuery(query_customer)
      .subscribe((res: any) => {
        // console.log('res', res);

        if (res.success) {
          this.customerCoute = _.sumBy(res['data'], 'admin_count');
          // this.customerCoute = res['data'][0].count
          this.createAdminCoustomerChart(res['data'], moment().year());
        } else {
          console.log('res', res);
        }
      });

    // let agricultureCaseQuery = "SELECT case_status, COUNT(*) AS count FROM agriculture_case WHERE case_status IN ('accepted','pending', 'completed') GROUP BY case_status;"
    let agricultureCaseQuery =
      'SELECT user_membership_plan_type,COUNT(*) AS count FROM user_info   GROUP BY user_membership_plan_type;';
    this.apiparameter
      .fetchDataFormQuery(agricultureCaseQuery)
      .subscribe((res: any) => {
        console.log('res', res);

        if (res.success) {
          this.totalcaseCount = _.sumBy(res['data'], 'count');

          this.freeMemberCount = _.filter(res['data'], {
            user_membership_plan_type: 'Free',
          })[0].count;
          this.paidMemberCount = _.filter(res['data'], (i) => {
            return i.user_membership_plan_type != 'Free';
          })[0].count;
          // this.acceptedCaseCounte = _.filter(res['data'], { 'case_status': "accepted" })[0].count
          this.createPaiChartForAgricultureCase(res['data']);
        } else {
          console.log('res', res);
        }
      });
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.basicDataForCustomer = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          data: [65, 59, 80, 81, 56, 55, 40],
        },
        {
          label: 'My Second dataset',
          backgroundColor: documentStyle.getPropertyValue('--pink-500'),
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          data: [28, 48, 40, 19, 86, 27, 90],
        },
      ],
    };

    this.createPaiChartForAgricultureCase1();

  }

  createCoustomerChart(data: any, seletedYear: any) {
    // console.log('allData', data);
    var filtterDataInYear = _.filter(data, { year: seletedYear });

    // console.log("filtterDataInYear", filtterDataInYear);

    const userCountArray = _.map(filtterDataInYear, 'user_count');
    const userMonthArray = _.map(filtterDataInYear, 'month');

    this.basicData = {
      labels: userMonthArray,
      datasets: [
        {
          label: `All Users in ${seletedYear}`,
          data: userCountArray,
          fill: true,
          borderColor: '#3f51b5',
          tension: 0.4,
          backgroundColor: 'rgba(255,167,38,0.2)',
        },
      ],
    };
  }

  createAdminCoustomerChart(data: any, seletedYear: any) {
    console.log(seletedYear);

    console.log('allData', data);
    var filtterDataInYear = _.filter(data, { year: seletedYear });

    console.log('filtterDataInYear', filtterDataInYear);

    const userCountArray = _.map(filtterDataInYear, 'admin_count');
    const userMonthArray = _.map(filtterDataInYear, 'month');

    console.log('userCountArray', userCountArray);

    console.log('userMonthArray', userMonthArray);

    this.basicDataForCustomer = {
      labels: userMonthArray,
      datasets: [
        {
          label: `All Customer in ${seletedYear}`,
          data: userCountArray,
          fill: true,
          borderColor: '#42A5F5',
          tension: 0.4,
        },
      ],
    };
  }

  createPaiChartForAgricultureCase(data: any) {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    this.paiChartCasedata = {
      datasets: [
        {
          data: [
            this.paidMemberCount,
            this.acceptedCaseCounte,
            this.freeMemberCount,
          ],
          backgroundColor: [
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--green-500'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--green-400'),
          ],
        },
      ],
    };

    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor,
          },
        },
      },
    };
  }

  findMalecount() {
    let agricultureCaseQuery = `SELECT count(1) as allc ,(Select count(1) as gender from user_info where user_gender = 'Male') as Male FROM user_info;`;
    this.apiparameter
      .fetchDataFormQuery(agricultureCaseQuery)
      .subscribe((res: any) => {
        console.log(res);

        if (res.success) {
          this.maledata = res['data'][0].Male;
          let total = res['data'][0].allc;
          this.maleper = ((this.maledata / total) * 100).toFixed(0);
        }
      });

  }
  findFemalecount() {
    let agricultureCaseQuery = `SELECT count(1) as allc ,(Select count(1) as gender from user_info where user_gender = 'Female') as Female FROM user_info;`;
    this.apiparameter
      .fetchDataFormQuery(agricultureCaseQuery)
      .subscribe((res: any) => {
        console.log(res);

        if (res.success) {
          this.femaledata = res['data'][0].Female;
          let total = res['data'][0].allc;
          this.femaleper = ((this.femaledata / total) * 100).toFixed(0);
        }
      });
  }

  createPaiChartForAgricultureCase1() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    this.paiChartCasedata1 = {
      datasets: [
        {
          data: [this.maledata, this.femaledata],
          backgroundColor: [
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--green-500'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--green-400'),
          ],
        },
      ],
    };
  }
}
