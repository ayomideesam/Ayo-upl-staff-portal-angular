import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

declare const $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  activeLogin = {
    email: null,
    password: null
  };
  activeUser = {
    name: null,
    email: null,
    password: null
  };
  formError = 'This field is required';
  // isLoginError = false;
  constructor(private web: HttpService, private toast: ToastrService, private router: Router, private SpinnerService: NgxSpinnerService) {
    sessionStorage.removeItem('user_token');
  }

  ngOnInit() {
    this.resetForm();

    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });
  }

  createUser() {
    console.log(this.activeUser);
    this.SpinnerService.show();
    this.web.registerStaff(this.activeUser).subscribe(res => {
      console.log(res);
      this.activeUser = {
        name: null,
        email: null,
        password: null
      };
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.SpinnerService.hide();
      }, 5000);
      this.toast.success('New User Record Added Successfully', 'User Details Create');
    }, error => {
      console.log(error);
    });
  }

  loginUser() {
    console.log(this.activeLogin);
    this.SpinnerService.show();
    this.web.loginStaff(this.activeLogin).subscribe(
      (res: any) => {
        console.log("token", res);
        if(!res.token) {
          this.toast.error('Token not set', 'Token Error');
        } else {
          sessionStorage.setItem('user_token', res.token);
          setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.SpinnerService.hide();
          }, 5000);
          this.toast.success('User Logged in Successfully', 'User Login');
          this.router.navigate(['/staff']);
        }
      }, error => {
        console.log(error);
        // this.isLoginError = true;
        this.toast.error('Invalid Email or Password', 'User Login');
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
    this.activeLogin = {
      email: null,
      password: null
    };
  }

}
