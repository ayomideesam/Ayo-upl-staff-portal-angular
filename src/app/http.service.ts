import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment as ENV } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  _headers : any = {};
  token : string;

  constructor(private web: HttpClient) {

  }
  addAuthorization() {
   this.token = sessionStorage.getItem('user_token');
   if(this.token) {
     this._headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': this.token
     })
   }else {
     this._headers = new HttpHeaders({
       'Content-Type': 'application/json'
     })
   }
  }
  getStaffList() {
    this.addAuthorization();
    return this.web.get(`${ENV.BaseUrl}getStaffs`, {
      headers: this._headers
    });
    // return this.web.get('https://jsonplaceholder.typicode.com/users');
  }

  createNewStaff(data) {
    this.addAuthorization();
    // return this.web.post('https://jsonplaceholder.typicode.com/posts', data);
    return this.web.post(ENV.BaseUrl+'staff', data, {
      headers: this._headers
    });
  }

  registerStaff(data) {
    this.addAuthorization();
   return this.web.post(ENV.BaseUrl+'registerStaff', data, {
     headers: this._headers
   });
  }

  loginStaff(data) {
    this.addAuthorization();
    return this.web.post(ENV.BaseUrl+'loginStaff', data, {
      headers: this._headers
    });
  }

  viewStaff(id) {
    this.addAuthorization();
    return this.web.get(ENV.BaseUrl+'getStaffs/' + id, {
      headers: this._headers
    });
  }

  updateStaff(id, data) {
    this.addAuthorization();
    return this.web.put(ENV.BaseUrl+'updateStaffs/' + id, data, {
      headers: this._headers
    });
  }

  deleteStaff(id) {
    this.addAuthorization();
    return this.web.delete(ENV.BaseUrl+'deleteStaffs/' + id, {
      headers: this._headers
    });
  }

  toggleStaff(id) {
    this.addAuthorization();
    return this.web.post(ENV.BaseUrl+'toggleStaffs/' + id, {}, {
      headers: this._headers
    });
  }
}
