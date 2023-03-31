import {Component, Input} from '@angular/core';
import {User} from "../../entities/user";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent {
@Input() user!: User;
}
