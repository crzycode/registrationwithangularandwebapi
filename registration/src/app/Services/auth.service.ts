import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private BaseUrl:string = "https://localhost:7192/api/User/";

  constructor(private http:HttpClient) { }
  signup(userobj:any){
    return this.http.post<any>(`${this.BaseUrl}Register`,userobj)

  }
  login(loginobj:any){
    return this.http.post<any>(`${this.BaseUrl}authonticate`,loginobj)
  }
}
