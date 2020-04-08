import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SearchResultsService } from 'src/app/shared/searchResults.service';

@Component({
  selector: 'search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit {

  constructor(private searchResultService: SearchResultsService) { }

  ngOnInit() {
  }

  clickSearch(searchInput: HTMLInputElement) {
    this.searchResultService.getSearchResults(searchInput.value);
  }

}