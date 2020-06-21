import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Automobile } from '../automobile';

@Component({
  selector: 'app-automobile-search-results',
  templateUrl: './automobile-search-results.component.html',
  styleUrls: ['./automobile-search-results.component.css']
})
export class AutomobileSearchResultsComponent implements OnInit {

  @Input() searchResultInput: Automobile[];
  @Input() searchResultInputCount: number;
  @Input() currentPageInput: number;
  @Input() itemsPerPageInput: number;

  @Output() nextPage = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  pageChanged(nextPageFromInput: number) {
    this.nextPage.emit(nextPageFromInput);
  }

}
