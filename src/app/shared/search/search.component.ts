import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() filterText:any
  @Input() search_btn:boolean=false
  @Output() getSerachText = new EventEmitter<string>();
  @Output() clickSearch = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }
  clickSearchMethod(search_text:string){
    this.clickSearch.emit(search_text);
  }
  changeSearchText(search_text: string) {
    this.getSerachText.emit(search_text);
  }
}
