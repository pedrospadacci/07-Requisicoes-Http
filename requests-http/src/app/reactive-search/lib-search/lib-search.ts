import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, Observable, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-lib-search',
  standalone: false,
  templateUrl: './lib-search.html',
  styleUrl: './lib-search.scss',
})
export class LibSearch {
  queryField = new FormControl()
  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries'
  results$!: Observable<any>
  total!: number
  readonly FIELDS =  'name,description,version,homepage'

  constructor(private http: HttpClient) { }

  ngOnInit(){
    this.results$ = this.queryField.valueChanges
      .pipe(
        map(value=>value.trim()),
        filter((value:any)=>value.length > 1),
        debounceTime(200),
        distinctUntilChanged(),
        //tap((value:any)=>console.log(value)),
        switchMap(value=> this.http.get(this.SEARCH_URL,{
          params:{
            search:value,
            fields:this.FIELDS
          }
        })),
        tap((res:any)=>this.total = res.total),
        map((res:any)=>res.results)
      )
  }

  onSearch() {
    //console.log(this.queryField.value)

    let value = this.queryField.value
    const fields =  'name,description,version,homepage'
    if (value && (value = value.trim()) !== '') {

      const params_ = {
        search: value,
        fields:fields
      }

      let params = new HttpParams()

      this.results$ = this.http.get(this.SEARCH_URL, {params})
        .pipe(
          tap((result: any) => this.total = result.total),
          map((result: any) => result.results)
        )
    }
  }
}
