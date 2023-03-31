import {AfterViewInit, Component, Input, ViewChild, OnInit} from '@angular/core';
import {BreakpointObserver} from "@angular/cdk/layout";
import {MatSidenav} from "@angular/material/sidenav";
import {User} from "../../entities/user";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements AfterViewInit, OnInit{
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  @Input() user!: User;

  constructor(private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit() {
    console.log(this.user)
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

}
