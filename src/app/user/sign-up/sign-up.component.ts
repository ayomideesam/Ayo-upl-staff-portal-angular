import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../http.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  activeUser = {
    name: null,
    email: null,
    password: null
  };
  formError = 'This field is required';


  constructor(private web: HttpService, private toast: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  createUser() {
    console.log(this.activeUser);
    this.web.registerStaff(this.activeUser).subscribe(res => {
      this.toast.success('New User Record Added Successfully', 'User Details Create');
      console.log(res);
    }, error => {
      console.log(error);
    });
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.activeUser = {
      name: null,
      email: null,
      password: null
    };
  }

}
