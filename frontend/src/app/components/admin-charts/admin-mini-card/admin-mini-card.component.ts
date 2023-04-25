import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-admin-mini-card',
  templateUrl: './admin-mini-card.component.html',
  styleUrls: ['./admin-mini-card.component.css']
})
export class AdminMiniCardComponent {
  @Input() value: number = 0;
  @Input() title: string = "";

}
