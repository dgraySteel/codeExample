import { Injectable } from "@angular/core";
import { SearchService } from "./search.service";
import { ElasticResult } from "./result.model";



@Injectable({providedIn: 'root'})
export class SearchResultsService {
  results: ElasticResult[] = [];
  headers: string[] = [];
  searchTerm: string= "";
  searchFilter: string="";
  item: ElasticResult = {account_number: 0,
    balance: 0,
    firstname: "",
    lastname: "",
    age: 0,
    gender: "",
    address: "",
    employer: "",
    email: "",
    city: "",
    state: "",
    latitude: 0,
    longitude: 0
  };

  constructor(private searchService: SearchService){}

  newFocus(item: ElasticResult){
    this.item = item;
  }

  getSearchResults(term:string){
    this.searchTerm = term;
    this.searchService.getResults(term, "")
    .subscribe((resp: 
      {
        hits:{
          hits:[{
            _source: {
              account_number: number,
              balance: number,
              firstname: string,
              lastname: string,
              age: number,
              gender: string,
              address: string,
              employer: string,
              email: string,
              city: string,
              state: string,
              latitude: number,
              longitude: number
            }
          }]
        }
      }
    )=> {
      this.results = [];
      resp.hits.hits.map(response => {
        let result: ElasticResult = response._source;
        this.results.push(result);
      })
    })
  };

  addFilter(filter: string){
    this.searchService.getResults(this.searchTerm, filter)
    .subscribe((resp: 
      {
        hits:{
          hits:[{
            _source: {
              account_number: number,
              balance: number,
              firstname: string,
              lastname: string,
              age: number,
              gender: string,
              address: string,
              employer: string,
              email: string,
              city: string,
              state: string,
              latitude: number,
              longitude: number
            }
          }]
        }
      }
    )=> {
      this.searchFilter = filter;
      this.results = [];
      resp.hits.hits.map(response => {
        let result: ElasticResult = response._source;
        this.results.push(result);
      })  
    })
  }
}