import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Patarabibaha-Admin';
  constructor(
    public _router: Router,

  ) {
    
  }

  ngOnInit(): void {
    console.log("App Start",this._router.url);
    // this._authServices.autoSignIn();
    
  }
}
