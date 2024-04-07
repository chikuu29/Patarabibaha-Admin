import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageViewOperationComponent } from '../image-view-operation/image-view-operation.component';
import { FillterModalComponent } from '../fillter-modal/fillter-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() btnWithText:false
  @Input() filterText:any
  @Input() search_btn:boolean=false
  @Input() fillter_btn:boolean=false
  @Output() getSerachText = new EventEmitter<string>();
  @Output() clickSearch = new EventEmitter<string>();
  @Output() clickFillter = new EventEmitter<string>();
  public selectedFillterValue:any={}
  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
  }
  clickFillterMethod(search_text:string){
    const modalRef = this.modalService.open(FillterModalComponent, { size:'xl',centered:true, scrollable: true,backdrop:false });
    modalRef.componentInstance.selectedFillterValue=this.selectedFillterValue
    modalRef.result.then((res:any)=>{
      this.selectedFillterValue=res.selectedFillterValue
      this.clickFillter.emit(res);
    })

  }
  clickSearchMethod(search_text:string){
    console.log("Search Click",search_text);
    
    if(search_text && search_text !=''){
      this.clickSearch.emit(search_text);
    }else{
      Swal.fire('Warning',"Search Field Can't Be Empty",'info')
    }
   
  }
  changeSearchText(search_text: string) {
    this.getSerachText.emit(search_text);
  }
}
