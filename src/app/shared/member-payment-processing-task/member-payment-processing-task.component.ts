import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-member-payment-processing-task',
  templateUrl: './member-payment-processing-task.component.html',
  styleUrls: ['./member-payment-processing-task.component.scss']
})
export class MemberPaymentProcessingTaskComponent implements OnInit {
  user_id: string;
  user_Data:any
  constructor(
    public modal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    console.log(this.user_Data);
    
  }

}
