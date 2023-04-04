import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Transport} from "../../entities/transport";
import {TransportService} from "../../services/transport.service";
import {User} from "../../entities/user";
import {TransportUserService} from "../../services/transport-user.service";
import {TransportUser} from "../../entities/transport-user";

@Component({
  selector: 'app-transport-user-input',
  templateUrl: './transport-user-input.component.html',
  styleUrls: ['./transport-user-input.component.css']
})
export class TransportUserInputComponent implements OnInit{
  @Input() user!: User;

  inputForm = this.fb.group(
    {
      id: [0],
      mode_of_transport: [""],
      distance: [],
    },
    {
      updateOn: "change"
    })

  modesOfTransport!: Transport[];

  constructor(
    private fb: FormBuilder,
    private transportService: TransportService,
    private transportUserService: TransportUserService
  ) {}

  ngOnInit() {
    this.getModesOfTransport();
  }

  getModesOfTransport() {
    this.transportService.get().subscribe(res => {
      this.modesOfTransport = res;
    })
  }

  onSave() {
    let toPost = this.inputForm.value as TransportUser;
    toPost.userID = 0;
    toPost.transportID = 0;
    toPost.date = new Date();
    toPost.distance_km = 12;
    toPost.calculatedEmissions = 22;

    this.transportUserService.post(toPost).subscribe(res => {

    })
  }
}
