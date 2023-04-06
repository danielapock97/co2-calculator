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
import {UserService} from "../../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-transport-user-input',
  templateUrl: './transport-user-input.component.html',
  styleUrls: ['./transport-user-input.component.css']
})
export class TransportUserInputComponent implements OnInit {
  user!: User;

  inputForm = this.fb.group(
    {
      id: [0],
      date: [(new Date())],
      transportID: [""],
      distance_km: [""],
    },
    {
      updateOn: "change"
    })

  modesOfTransport!: Transport[];
  emissions: Emissions | undefined

  constructor(
    private fb: FormBuilder,
    private transportService: TransportService,
    private transportUserService: TransportUserService,
    private calculationService: CalculationService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.getModesOfTransport();
    this.getUser()
  }

  getModesOfTransport() {
    this.transportService.get().subscribe(res => {
      this.modesOfTransport = res;
    })
  }


  getUser() {
    this.user = JSON.parse(window.localStorage.getItem('user')!) as User
  }

  onSave() {
    let newData = this.inputForm.value as unknown as TransportUser;

    let transport =
      this.modesOfTransport.find(element => element.id === newData.transportID)

    if (transport !== undefined) {
      this.calculateEmissions(transport, newData.distance_km, newData)
    }

    this.inputForm.reset();
  }

  calculateEmissions(transport: Transport, distance: number, newData: TransportUser): void {
    this.calculationService.post(transport, distance).subscribe(
      res => {
        this.emissions = res;

        newData.userID = this.user.id;
        newData.calculatedEmissions = res;
        newData.createdAt = new Date();
        this.saveInput(newData);
      }
    )
  }

  saveInput(userTransport: TransportUser) {
    this.transportUserService.post(userTransport).subscribe(
      res => {
        // console.log(res)
      }
    )
  }

  openSnackBar() {
    this.snackBar.open("Saved successfully!", '', {duration: 3000})
  }
}
