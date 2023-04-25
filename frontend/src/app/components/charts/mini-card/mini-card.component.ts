import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-mini-card',
  templateUrl: './mini-card.component.html',
  styleUrls: ['./mini-card.component.css']
})
export class MiniCardComponent {
  @Input() value: number = 0;
  @Input() title: string = "";

}
