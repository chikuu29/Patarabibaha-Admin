import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0 })),
      ]),
    ]),
  ]
})
export class NotificationComponent implements OnInit {
  constructor(
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {}
  show: boolean = false;
  message: string = '';

  showNotification(message: string) {
    //alert(';;;');
    this.message = message;
    this.show = true;

    // Hide the notification after 5 seconds
    setTimeout(() => {
      this.hideNotification();
    }, 5000);
  }
  hideNotification() {
    this.show = false;
    this.activeModal.close();

  }
}
