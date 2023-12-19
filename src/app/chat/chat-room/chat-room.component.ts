import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  @ViewChild('chatContainer', { read: ElementRef }) chatContainer: ElementRef;


  message: any[] = []
  establishConnection: any = {
    'sender_img': '',
    'reciver_name':'',
    'sender_name':'',
    'reciver_img': ''
  }
  imgURL: string = "http://localhost/matrimonial/storage/"
  messageCreationForm = new FormGroup({
    message_content: new FormControl('', [Validators.required]),
    receiver_id: new FormControl('', [Validators.required]),
    sender_id: new FormControl('', [Validators.required]),
    chat_room_id: new FormControl('', [Validators.required]),
    created_At: new FormControl(moment().toISOString(), [Validators.required])
  })

  staticMessageData:any[]=[]
  containerHeight: number;
  sender_id:any
  constructor(
    private _rout: ActivatedRoute,
    private appServices: AppService,
    private apiParameterScript: ApiParameterScript,
    private el: ElementRef, private renderer: Renderer2,
 
  ) { }

  ngAfterViewInit() {
    // Get the viewport height
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
   console.log("viewportHeight",viewportHeight);
   
    // Set the height of the container dynamically
    this.containerHeight = viewportHeight * 0.5; // Adjust the multiplier as needed

    // Use Renderer2 to set the height (recommended for Angular applications)
    this.renderer.setStyle(this.el.nativeElement, 'height', this.containerHeight + 'px');
  }
  ngAfterContentChecked(): void {
    // console.log("ngAfterContentChecked");
    if (this.chatContainer && this.chatContainer.nativeElement) {
      this.scrollToBottom()
    }

  }


  ngOnInit(): void {
    this._rout.params.subscribe((connection_params: any) => {
      console.log(connection_params);
      this.sender_id=connection_params.profile_id
      this.intiatingConnection(connection_params.chat_rome_id);
    })
    this.apiParameterScript.fetchdata('message',{"projection":["*"], "whereConditions":{ "status":1 }}).subscribe((res:any)=>{
      if(res.success && res['data'].length>0){
         console.log(res['data']);
         
          this.staticMessageData=_.map(res['data'])
          console.log(this.staticMessageData);
          
      }
    })
  }
  scrollToBottom() {
    const container = this.chatContainer.nativeElement;
    container.scrollTop = container.scrollHeight
    // Scroll to the end of the chat container
  }
  send() {
    console.log(this.messageCreationForm);
    if (this.messageCreationForm.valid) {
      var saveData = {
        'data': this.messageCreationForm.value
      }
      this.apiParameterScript.savedata('chat_messages', saveData).subscribe((res: any) => {
        if (res.success) {
          this.message.push(this.messageCreationForm.value)
          this.scrollToBottom();
          this.messageCreationForm.controls.message_content.reset()

        }
      })
    } else {
      Swal.fire('Please Write Somethings', '', 'warning')

    }
  }

  intiatingConnection(connection_id: string) {
    let apiFetchDat = {
      "projection": ["*"], "whereConditions": { "connection_id": connection_id }

    }
    this.blockUI.start("Loading Messages...")
    this.apiParameterScript.fetchdata('chat_connection_details', apiFetchDat).subscribe((chat_connection_res: any) => {

      if (chat_connection_res.success && chat_connection_res['data'].length > 0) {
        this.messageCreationForm.setValue({
          message_content: null,
          receiver_id: this.sender_id == chat_connection_res['data'][0].requested_by ? chat_connection_res['data'][0].requested_to : chat_connection_res['data'][0].requested_by,
          sender_id: this.sender_id,
          chat_room_id: connection_id,
          created_At: moment().toISOString()
        })
        this.loadingChat(connection_id);
        let query = `SELECT user_profile_image,user_id,user_fname,user_lname FROM user_info WHERE user_id IN ('${chat_connection_res['data'][0].requested_by}','${chat_connection_res['data'][0].requested_to}')`
        this.apiParameterScript.fetchDataFormQuery(query).subscribe((res: any) => {


          if (res.success && res['data'].length > 0) {
            res['data'].forEach((profile: any) => {


              if (profile.user_id == this.sender_id) {
                this.establishConnection.sender_img = this.appServices.getFilePath() + "storage/" + profile.user_profile_image;
                this.establishConnection.sender_name=profile.user_fname +' '+profile.user_lname

              } else {
                this.establishConnection.reciver_img = this.appServices.getFilePath() + "storage/" + profile.user_profile_image;
                this.establishConnection.reciver_name=profile.user_fname +' '+profile.user_lname
              }
            })


          }


        })

      } else {
        this.blockUI.stop()
        Swal.fire("Connection To Server Is failed", 'Unauthorize', 'error')
      }

    })
  }

  loadingChat(connection_id: any) {

    this.apiParameterScript.fetchdata('chat_messages', { "projection": ["*"], "whereConditions": { "chat_room_id": connection_id } }).subscribe((messageRes: any) => {
      console.log("Message Histroy", messageRes);
      this.blockUI.stop()
      if (messageRes.success && messageRes['data'].length > 0) {
        this.message = messageRes['data']
      }

    })

  }

}
