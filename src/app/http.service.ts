import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private web: HttpClient) { }

  getStaffList() {
    return this.web.get('http://127.0.0.1:8000/api/getStaffs');
    // return this.web.get('https://jsonplaceholder.typicode.com/users');
  }

  createNewStaff(data) {
    // return this.web.post('https://jsonplaceholder.typicode.com/posts', data);
    return this.web.post('http://127.0.0.1:8000/api/staff', data);
  }

  viewStaff(id) {
    return this.web.get('http://127.0.0.1:8000/api/getStaffs/' + id);
  }

  updateStaff(id, data) {
    return this.web.put('http://127.0.0.1:8000/api/updateStaffs/' + id, data);
  }

  deleteStaff(id) {
    return this.web.delete('http://127.0.0.1:8000/api/deleteStaffs/' + id);
  }

  toggleStaff(id) {
    return this.web.post('http://127.0.0.1:8000/api/toggleStaffs/' + id, {});
  }
}
