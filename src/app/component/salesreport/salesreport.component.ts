import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-salesreport',
  templateUrl: './salesreport.component.html',
  styleUrls: ['./salesreport.component.scss']
})
export class SalesreportComponent implements OnInit {
  finaldata: any;
  filterText:any;
  total: any;
  constructor(
    private ApiParameter: ApiParameterScript,
    private router: Router
  ) { }

  ngOnInit(): void {
    this. getExpireData();
  }
  getExpireData(){
    let Quary =  `select *,COUNT(*) OVER () AS total_count
    from user_plan_deatils as a join membership_plan as b on a.user_plan_id = b.membership_plan_id
    order by plan_stating_date`;
    this.ApiParameter.fetchDataFormQuery(Quary).subscribe((res: any) => {
      console.log(res);
      if (res.success && res['data'].length > 0) {
        this.finaldata = res['data'];
        let sum = 0;
        this.total = 0;
        // this.total = this.finaldata.map((ele:any)=>{
        //   sum = sum+ele.membership_plan_amount
        //   return sum
        // })
        let i=0;
        while(this.finaldata.length > 0){
          this.total = this.total+this.finaldata[i].membership_plan_amount;
          i++;
        }
        console.log(this.finaldata);
      }
    });
  }

  downloadExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.finaldata);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'your_filename');
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    const a: HTMLAnchorElement = document.createElement('a');
    document.body.appendChild(a);
    a.href = window.URL.createObjectURL(data);
    a.download = `${fileName}_${new Date().getTime()}.xlsx`;
    a.click();
    document.body.removeChild(a);
  }

}
