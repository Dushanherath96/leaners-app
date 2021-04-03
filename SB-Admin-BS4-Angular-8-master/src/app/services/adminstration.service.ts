import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminstrationService {

  constructor(private http:HttpClient) { }

staffSave() {
    return this.http.post<any>(config.LEARNERS+`/admin/saveStaff`,data)
}




}
