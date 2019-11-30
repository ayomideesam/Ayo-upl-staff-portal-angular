import { Component } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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

  constructor(private web: HttpService) {
    setTimeout(() => {
      this.buttonState = false;
    }, 5500);
  }

  ngOnInit() {
    this.web.getStaffList().subscribe((data: any) => {
      this.lists = data.data;
      console.log(this.lists);
    });
  }

  toggleServerStatus() {
    this.statusFlag = !this.statusFlag;
    if (this.statusFlag === true) {
      this.serverStatus = 'Online';
    } else {
      this.serverStatus = 'Offline';
    }
    return this.serverStatus;
  }

  countClick() {
    this.clickCounter += 1;
  }

  buttonClick() {
    window.alert('Well Done');
  }

  reset() {
    this.name = '';
  }
}
