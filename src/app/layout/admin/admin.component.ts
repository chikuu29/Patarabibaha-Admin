import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  isSidenavCoolapedForSmallScreen:boolean=true
  isSidenavCoolapsed: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  Show(data: boolean) {
    this.isSidenavCoolapsed = data;
  }

  showSideNavForSmallScreen(data:boolean){
    
    
    this.isSidenavCoolapedForSmallScreen=data
  }
}
