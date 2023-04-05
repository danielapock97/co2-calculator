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
  @Input() user!: User;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}
  onLogout() {
    this.user.loggedIn = false;
    this.userService.put(this.user).subscribe(res => {
      console.log(this.user)
    })
    this.router.navigate([""])
  }
}
