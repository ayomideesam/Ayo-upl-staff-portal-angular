import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  activeLogin = {
    email: null,
    password: null
  };
  formError = 'This field is required';

  constructor(private web: HttpService) { }

  ngOnInit() {
    this.resetForm();
  }

  loginUser() {
    console.log(this.activeLogin);

  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.activeLogin = {
      email: null,
      password: null
    };
  }
}
