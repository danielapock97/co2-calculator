import {Component, Input, Output, OnInit} from '@angular/core';
import { User} from "../../entities/user";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  @Output() currentUser: User | undefined;

  availableUsers: User[] | undefined;
  loginForm = this.fb.group(
    {
      name: [""]
    }, {
    })

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private userService: UserService) {


  }

  ngOnInit() {

  }

  login(userId: string) {


  }

  getAllUsers() {
    this.userService.getUsers().subscribe(
      res => {
        (this.availableUsers = res)
      }
    )
  }
}
