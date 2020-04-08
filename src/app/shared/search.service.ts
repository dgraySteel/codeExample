import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class SearchService {
    constructor(private http: HttpClient){
    }

    searchUrl = 'http://localhost:1337/localhost:9200/documents/_search';

    getResults(term:string, filter: string): Observable<any> {
        let sortingOptions = new HttpParams();
        if(term){
            sortingOptions = new HttpParams().append("q", term);
        }
        else if(filter){
            sortingOptions = new HttpParams().append("q", filter);
        }
        else if(term && filter){
            sortingOptions = new HttpParams().append("q", term+' '+filter)
        }else{
            //no term or filter
        }
        //sorting: .append("sort", "latitude:desc")
        return this.http.get(this.searchUrl, {params: sortingOptions}).pipe(map(response => response));
    }
}