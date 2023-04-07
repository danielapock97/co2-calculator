import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {BreakpointObserver} from "@angular/cdk/layout";
import {MatSidenav} from "@angular/material/sidenav";
import {User} from "../../entities/user";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements AfterViewInit, OnInit{
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  user: User | undefined;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    let userID = null;
    this.activeRoute.paramMap.subscribe(
      params => {
        userID = params.get('id')
      }
    )

    if (userID !== null) {
      this.getUserById(userID)
    }
  }

  ngAfterViewInit() {
    this.breakpointObserver.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  getUserById(id: number) {
    this.userService.getUserById(id).subscribe(
      res => {
        this.user = res
        window.localStorage.setItem('user', JSON.stringify(this.user))
      }
    )
  }
}
