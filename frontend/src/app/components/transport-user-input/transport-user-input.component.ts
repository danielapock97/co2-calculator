import {Component, OnInit, Input} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Transport} from "../../entities/transport";
import {TransportService} from "../../services/transport.service";
import {User} from "../../entities/user";
import {UserTransportService} from "../../services/user-transport.service";
import {UserTransport} from "../../entities/user-transport";
import {CalculationService} from "../../services/calculation.service";
import {Emissions} from "../../entities/emissions";
import {ActivatedRoute, Router} from "@angular/router";
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
    private transportUserService: UserTransportService,
    private calculationService: CalculationService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
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
    let newData = this.inputForm.value as unknown as UserTransport;

    let transport =
      this.modesOfTransport.find(element => element.id === newData.transportID)

    if (transport !== undefined) {
      this.calculateEmissions(transport, newData.distance_km, newData)
    }

    this.inputForm.reset();
  }

  calculateEmissions(transport: Transport, distance: number, newData: UserTransport): void {
    this.calculationService.post(transport, distance).subscribe(
      res => {
        this.emissions = res;

        newData.userID = this.user.id;
        newData.transportID = transport.id;
        newData.calculatedEmissions = {
          co2e: res.co2e,
          co2e_calculation_method: res.co2e_calculation_method,
          co2e_calculation_origin: res.co2e_calculation_origin,
          co2e_unit: res.co2e_unit,
          constituent_gases: res.constituent_gases
        };
        this.saveInput(newData);
      },
      error => {
        console.log(error)
      }
    )
  }

  saveInput(userTransport: UserTransport) {
    this.transportUserService.post(userTransport).subscribe(
      res => {
        this.redirectAndSnackbar()
      },
      error => {
        console.log(error)
      }
    )
  }

  redirectAndSnackbar() {
    this.router.navigate(["my-statistics"], {relativeTo: this.route.parent})
    this.snackBar.open("Saved successfully!", '', {duration: 3000})
  }
}
