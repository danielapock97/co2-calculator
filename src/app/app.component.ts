import {Component, OnInit} from '@angular/core';
import {User} from "./entities/user";
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'co2-calculator';
  currentUser: User | undefined;

  constructor() {
  }

  ngOnInit() {

  }

}
