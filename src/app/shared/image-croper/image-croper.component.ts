import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-image-croper',
  templateUrl: './image-croper.component.html',
  styleUrls: ['./image-croper.component.scss']
})
export class ImageCroperComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  // **************************
  user_id:string=''
  imageChangedEvent: any = '';
  croppedImage: any = '';
  fileSelected=false
  uploadURL:any
  crop_imgae:any
  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    public activeModal: NgbActiveModal,
    private appservices:AppService
  ) {
    this.uploadURL = `${this.appservices.getApipath()}upload?q=${this.user_id}`

  }

  fileChangeEvent(event: any): void {
    console.log(event);
    
    this.imageChangedEvent = event;
    this.fileSelected=true
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl?event.objectUrl:'');
    console.log(event.blob);
    this.crop_imgae=event.blob
    // event.blob can be used to upload the cropped image
  }
  imageLoaded(image: LoadedImage) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  ngOnInit(): void {
    this.uploadURL = `${this.appservices.getApipath()}upload?q=${this.user_id}`

  }

  uploadFile(){
    this.uploadURL = `${this.appservices.getApipath()}upload?q=${this.user_id}`

    const uploadData = new FormData();
    uploadData.append('uploadfile[]', this.crop_imgae);
    
    this.blockUI.start('Uploading ....')
    this.http.post<any>(this.uploadURL, uploadData).subscribe(
      (response: any) => {
       this.blockUI.stop()
        if(response.success){
          Swal.fire('Profile Updated successful',response.message,'success').then(()=>{
            location.reload()
          })
        }else{
          Swal.fire(response.message,'','success')
        }
        // console.log('Upload successful!', response);
        // Handle success response
      },
      (error: any) => {
        // this.blockUI.stop()
        Swal.fire('Error occurred during file upload','','error')
        // console.error('Error occurred during file upload:', error);
        // Handle error response
      }
    );
  }

}
