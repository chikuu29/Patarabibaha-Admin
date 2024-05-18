import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-load-permission',
  templateUrl: './load-permission.component.html',
  styleUrls: ['./load-permission.component.scss']
})
export class LoadPermissionComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }

}
