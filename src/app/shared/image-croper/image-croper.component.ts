import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { AppService } from 'src/app/services/app.service';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-image-croper',
  templateUrl: './image-croper.component.html',
  styleUrls: ['./image-croper.component.scss'],
})
export class ImageCroperComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  // **************************
  user_id: string = '';
  imageChangedEvent: any = '';
  croppedImage: any = '';
  fileSelected = false;
  uploadURL: any;
  crop_imgae: any;
  imageinbase64: string | ArrayBuffer | null;
  isUploading:boolean=false
  uploadProgress:number=0
  loadingImage:boolean=false
  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    public activeModal: NgbActiveModal,
    private appservices: AppService,
    private CommonService: CommonService
  ) {
    this.uploadURL = `${this.appservices.getApipath()}upload?q=${this.user_id}`;
  }

  fileChangeEvent(event: any): void {
    

    this.imageChangedEvent = event;
    this.fileSelected = true;
    this.loadingImage=true
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(
      event.objectUrl ? event.objectUrl : ''
    );
    
    this.crop_imgae = event.blob;
    this.convertBlobToBase64(this.crop_imgae);
   
    // event.blob can be used to upload the cropped image
  }
  imageLoaded(image: LoadedImage) {
    // show cropper
    
  }
  cropperReady() {
    
    this.loadingImage=false
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  ngOnInit(): void {
    this.uploadURL = `${this.appservices.getApipath()}upload?q=${this.user_id}`;
  }

  uploadFile() {
    
    
    let param = {
      data: this.imageinbase64,
      user_Id: this.user_id,
    };
    this.isUploading=true
    this.uploadProgress=0
    this.CommonService.uplodeimageadmin(param).subscribe((event: any) => {

      
      if(event.status=="progress"){
        // this.isUploading=true
        this.uploadProgress=event.progress
        

      }else if(event.status=="completed"){
        this.isUploading=false
       
        Swal.fire({
          title: `<strong style='color:#5c54a0; font-size:30px;'>${event.body.message}</strong>`,
          html: '<h2>Congratulation</h2> <div class="pyro"><div class="before"></div><div class="after"></div></div>',
          icon: 'success',
        }).then((res: any) => {
          this.activeModal.close();
        });
      
      }
      
      // if (response.success) {
      //   Swal.fire(response.message, '', 'success');
      //   this.activeModal.close();
      // }
    },(error:any)=>{
      this.isUploading=false
      Swal.fire(error.message, error.statusText, 'error');
    });

    // this.uploadURL = `${this.appservices.getApipath()}upload?q=${this.user_id}`;

    // const uploadData = new FormData();
    // uploadData.append('uploadfile[]', this.crop_imgae);

    

    // this.blockUI.start('Uploading ....');
    // const haderforpdf = new HttpHeaders()
    //   .set('Accept', 'image/png');
    // this.http
    //   .post<any>(this.uploadURL, uploadData, {
    //     headers: haderforpdf,
    //   })
    //   .subscribe(
    //     (response: any) => {
    //       this.blockUI.stop();
    //       if (response.success) {
    //         Swal.fire(
    //           'Profile Updated successful',
    //           response.message,
    //           'success'
    //         ).then(() => {
    //           location.reload();
    //         });
    //       } else {
    //         Swal.fire(response.message, '', 'success');
    //       }
    //       
    //       // Handle success response
    //     },
    //     (error: any) => {
    //       // this.blockUI.stop()
    //       Swal.fire('Error occurred during file upload', '', 'error');
    //       // console.error('Error occurred during file upload:', error);
    //       // Handle error response
    //     }
    //   );
  }
  convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        this.imageinbase64 = reader.result;
        resolve(reader.result as string);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  }
  // convertBlobToBase64(blob: Blob): Promise<string> {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       resolve(reader.result as string);
  //     };
  //     reader.onerror = reject;
  //     reader.readAsDataURL(blob);
  //   });
  // }
}
