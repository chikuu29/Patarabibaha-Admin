import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() filterText:any
  @Output() getSerachText = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  search(search_text: string) {
   
    this.getSerachText.emit(search_text);
  }
}
