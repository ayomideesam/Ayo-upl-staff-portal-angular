import {AfterViewInit, Component} from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  AfterViewInit{
  title = 'ngee';
  clickCounter = 0;
  serverName = 'BioChoice';
  serverPid = 10;
  serverStatus = 'Offline';
  statusFlag = false;
  buttonState = true;
  ServerID = '';
  name = '';
  lists = Object;
  token : string = null;

  constructor(private web: HttpService) {

    setTimeout(() => {
      this.buttonState = false;
    }, 5500);
  }

  ngAfterViewInit() {
  this.token = sessionStorage.getItem('user_token');
  }
}
