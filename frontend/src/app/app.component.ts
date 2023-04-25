import {Component, OnInit} from '@angular/core';
import {User} from "./entities/user";
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'co2-calculator';
  currentUser!: User;

  onLogin(user: User) {
    this.currentUser = user;
  }

}
