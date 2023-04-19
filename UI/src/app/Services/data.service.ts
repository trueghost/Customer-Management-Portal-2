import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  readonly DataUrl = "https://localhost:44319/Api/Details";

  constructor(private http:HttpClient) { }

  addDetails(data:any) {
    return this.http.post(this.DataUrl + '/Add', data);
  }
  showDetails():Observable<any[]>{
    return this.http.get<any>(this.DataUrl + '/Show');
  }
  
  updateDetails(data:any) {
    return this.http.put(this.DataUrl + `/Update`, data).subscribe();
  }
  
  statusChange(data:any) : Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(this.DataUrl + '/Status' ,data);
  }
  

  showCountry():Observable<any[]>{
    return this.http.get<any>(this.DataUrl + '/ShowCountry');
  }

  showState():Observable<any[]>{
    return this.http.get<any>(this.DataUrl + '/ShowState');
  }
  
}