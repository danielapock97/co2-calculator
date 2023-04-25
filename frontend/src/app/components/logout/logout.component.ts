import { Component, Input } from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../entities/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  @Input() user: User | undefined;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}
  onLogout() {
    if (this.user !== undefined){
      this.user.loggedIn = false;
      this.userService.put(this.user).subscribe(res => {
      })
      window.localStorage.removeItem('user')
      this.router.navigate([""])
    }
  }
}
