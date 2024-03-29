import {Component, OnInit} from '@angular/core';
import {User} from "../../entities/user";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  currentUserID!: string;
  availableUsers!: User[];
  loginForm = this.fb.group(
    {
      id: [""],
      name: [""],
      loggedIn: [false],
      lastLoggedIn: [new Date()]
    },
    {
      updateOn: "change"
    })

  constructor(private activeRoute: ActivatedRoute,
              private fb: FormBuilder,
              private userService: UserService,
              private router: Router
              ) {
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
    this.currentUserID = this.loginForm.value.id as unknown as string
    let currentUser = this.availableUsers.find(element => element.id === this.currentUserID)
    currentUser!.loggedIn = true
    currentUser!.lastLoggedIn = new Date()
    this.userService.put(currentUser!)
    this.router.navigate(['overview/' + this.currentUserID])
  }
}
