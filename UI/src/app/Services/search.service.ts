import { Injectable } from '@angular/core';  
import {HttpClient, HttpResponse} from '@angular/common/http';    
import {HttpHeaders} from '@angular/common/http';    
import { Observable } from 'rxjs';
@Injectable({  
  providedIn: 'root'  
})  
export class SearchService {  
  Url: string | undefined; 
  
  constructor(private http : HttpClient) { }  


  searchdata(model : any){  
   return this.http.post<any>('https://localhost:44319/Api/SearchDate/Search',model);    
  }  

  showdata():Observable<any[]> {  
   return this.http.get<any>('https://localhost:44319/Api/SearchDate/Show');    
  }  

  readonly DataUrl = "https://localhost:44319/Api/Details";

  showCountry():Observable<any[]>{
    return this.http.get<any>(this.DataUrl + '/ShowCountry');
  }

  showState():Observable<any[]>{
    return this.http.get<any>(this.DataUrl + '/ShowState');
  }

  statusChange(data:any) : Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(this.DataUrl + '/Status' ,data);
  }
}
