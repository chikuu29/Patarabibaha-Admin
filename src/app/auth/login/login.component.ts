import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  redirectUrl: any = ''
  constructor(
    private activeroute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.redirectUrl = this.activeroute.snapshot.queryParamMap.get('redirectUrl') || '/'
  }

}
