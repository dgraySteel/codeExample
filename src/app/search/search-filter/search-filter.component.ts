import { Component, OnInit } from '@angular/core';
import { SearchResultsService } from 'src/app/shared/searchResults.service';

@Component({
  selector: 'search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css']
})
export class SearchFilterComponent implements OnInit {
  results = [];
  filters:string[] = [];

  constructor(private searchResultService: SearchResultsService){}

  ngOnInit() {
    this.results = this.searchResultService.results;
  }

  ngDoCheck(): void {
    if(this.results.length === this.searchResultService.results.length && this.results[0] === this.searchResultService.results[0]){
      this.results;
    } else{
      // update filter
      this.filters = [];
      const map = new Map();
      for(const item of this.searchResultService.results){
        if(!map.has(item.state)){
          map.set(item.state, true);
          this.filters.push(item.state);
        }
      }
      this.results = this.searchResultService.results;
    }
  }

  filterResults(filter: string){
    this.searchResultService.addFilter(filter);
  }

  resetFilters(){
    this.searchResultService.addFilter("");
  }
}