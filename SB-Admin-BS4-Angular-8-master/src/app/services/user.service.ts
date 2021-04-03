import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
 import {config} from '../config/config';
@Injectable({
  providedIn: 'root'
})
export class UserService {
    private currentUserSubject: BehaviorSubject<any>;
    private currentUser: Observable<any>;
  constructor(private http:HttpClient) {

    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();


  }

    public get currentUserValue(){
        return this.currentUserSubject.value
    }

  register(data):Observable<any>{
    return this.http.post<any>(config.LEARNERS+`/users/register`,data)
  }

  login(email:string , password:string):Observable<any>{


    return this.http.post<any>(config.LEARNERS+`/users/authenticate`,{email , password})
    .pipe(map(user=>{
        if(user && user.token){
            localStorage.setItem('currentUser' ,JSON.stringify(user));
            this.currentUserSubject.next(user);
        };
        return user;
    }))


  }
}
