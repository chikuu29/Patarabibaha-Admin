import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() filterText:any
  @Input() search_btn:boolean=false
  @Input() fillter_btn:boolean=false
  @Output() getSerachText = new EventEmitter<string>();
  @Output() clickSearch = new EventEmitter<string>();
  @Output() clickFillter = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }
  clickFillterMethod(search_text:string){
    this.clickFillter.emit(search_text);
  }
  clickSearchMethod(search_text:string){
    this.clickSearch.emit(search_text);
  }
  changeSearchText(search_text: string) {
    this.getSerachText.emit(search_text);
  }
}
