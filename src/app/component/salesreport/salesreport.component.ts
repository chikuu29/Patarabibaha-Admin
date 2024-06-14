import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { parseInt } from 'lodash';

@Component({
  selector: 'app-salesreport',
  templateUrl: './salesreport.component.html',
  styleUrls: ['./salesreport.component.scss'],
})
export class SalesreportComponent implements OnInit {
  finaldata: any;
  filterText: any;
  total: any;
  filteredData: any[];
  flg: boolean = true;
  rowIndex: number = 0;
  constructor(
    private ApiParameter: ApiParameterScript,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getExpireData();
  }
  incrementRowIndex() {
    return this.rowIndex++;
  }
  getExpireData() {
    let Quary = `select *,COUNT(*) OVER () AS total_count
    from user_plan_deatils as a join membership_plan as b on a.user_plan_id = b.membership_plan_id
    order by plan_stating_date`;
    this.ApiParameter.fetchDataFormQuery(Quary).subscribe((res: any) => {
      
      if (res.success && res['data'].length > 0) {
        this.filteredData = res['data'];
        this.finaldata = res['data'];
        //this.rowIndex = 1;
        let sum = 0;
        this.total = 0;
        // this.total = this.finaldata.map((ele:any)=>{
        //   sum = sum+ele.membership_plan_amount
        //   return sum
        // })
        this.filteredData.forEach((data) => {
          if (data && typeof data.membership_plan_amount === 'number') {
            this.total += data.membership_plan_amount;
          }
        });
        let i = 0;
        
      }
    });
  }

  downloadExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.filteredData
    );
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
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


  filter(event: any, field: string) {
    //this.filteredData = this.finaldata
    this.flg = false;
    const filterValue = event.target.value.toLowerCase();
    

    this.filteredData = this.filteredData.filter((data: any) => {
      return data[field].toLowerCase().includes(filterValue);
    });
    
  }
}
