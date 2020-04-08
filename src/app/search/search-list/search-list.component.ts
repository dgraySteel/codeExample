import { Component, OnInit } from '@angular/core';
import { SearchResultsService } from 'src/app/shared/searchResults.service';

@Component({
  selector: 'search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {
  results = [];

  constructor(private searchResultService: SearchResultsService){}

  ngOnInit() {
    this.results = this.searchResultService.results;
  }

  ngDoCheck(): void {
    if(this.results.length === this.searchResultService.results.length && this.results[0] === this.searchResultService.results[0]){
      this.results;
    } else {
      this.results = this.searchResultService.results
    }
  }

  focusOn(e){
    this.searchResultService.newFocus(e);
  }
}