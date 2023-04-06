import {Component, OnInit} from '@angular/core';
import {User} from "../../entities/user";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit{
  user!: User;

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user')!) as User
  }
}
