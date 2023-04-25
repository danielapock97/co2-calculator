import {Component, OnInit} from '@angular/core';
import {User} from "../../entities/user";
import {ActivatedRoute, Router} from "@angular/router";
import {__param} from "tslib";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit{
  user: User | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user')!) as User
  }

  toNewDataButton() {
    this.router.navigate(["new-calculation"], {relativeTo: this.route.parent})
  }
}
