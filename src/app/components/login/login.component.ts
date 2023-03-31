import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {User} from "../../entities/user";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() onLoginEvent: EventEmitter<User> = new EventEmitter<User>();

  currentUser!: User;
  availableUsers!: User[];
  loginForm = this.fb.group(
    {
      id: [0],
      name: [""],
      role: [""],
      loggedIn: [false],
      lastLoggedIn: [new Date()]
    },
    {
      updateOn: "change"
    })

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private userService: UserService) {
  }

  ngOnInit() {
    this.getAllUsers()
  }

  getAllUsers() {
    this.userService.getUsers().subscribe(
      res => {
        this.availableUsers = res;
      }
    )
  }

  onLogin() {
    this.currentUser = this.loginForm.value.id as unknown as User;
    this.onLoginEvent.emit(this.currentUser);
  }
}
