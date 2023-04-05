import {Component, OnInit, Input} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Transport} from "../../entities/transport";
import {TransportService} from "../../services/transport.service";
import {User} from "../../entities/user";
import {TransportUserService} from "../../services/transport-user.service";
import {TransportUser} from "../../entities/transport-user";
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {CalculationService} from "../../services/calculation.service";
import {Estimate} from "../../entities/estimate";
import {Emissions} from "../../entities/emissions";

@Component({
  selector: 'app-transport-user-input',
  templateUrl: './transport-user-input.component.html',
  styleUrls: ['./transport-user-input.component.css']
})
export class TransportUserInputComponent implements OnInit {
  @Input() user!: User;

  inputForm = this.fb.group(
    {
      id: [0],
      date: [""],
      transportID: [""],
      distance_km: [""],
    },
    {
      updateOn: "change"
    })

  modesOfTransport!: Transport[];
  emissions!: Emissions
  savedData!: TransportUser

  constructor(
    private fb: FormBuilder,
    private transportService: TransportService,
    private transportUserService: TransportUserService,
    private calculationService: CalculationService
  ) {
  }

  ngOnInit() {
    this.getModesOfTransport();
  }

  getModesOfTransport() {
    this.transportService.get().subscribe(res => {
      this.modesOfTransport = res;
    })
  }

  onSave() {
    let newData = this.inputForm.value as unknown as TransportUser;

    let transport =
      this.modesOfTransport.find(element => element.id === newData.transportID)

    if (transport !== undefined) {
      this.calculateEmissions(transport, newData.distance_km, newData)
    }
  }

  calculateEmissions(transport: Transport, distance: number, newData: TransportUser): void {
    this.calculationService.post(transport, distance).subscribe(
      res => {
        newData.userID = this.user.id
        newData.calculatedEmissions = res
        console.log(newData)
        // this.transportUserService.post(newData).subscribe(res => {
        //   console.log(res)
        // })
      }
    )
  }
}
