import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Patarabibaha-Admin';
  constructor(
    public _router: Router,
    private _authServices: AuthService
  ) {
    
  }

  ngOnInit(): void {
    console.log("App Start");
    this._authServices.autoSignIn();
    
  }
}
