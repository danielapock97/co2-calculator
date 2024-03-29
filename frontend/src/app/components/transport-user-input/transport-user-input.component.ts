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
import {MatDialog} from "@angular/material/dialog";
import {DialogSaveUserInputComponent} from "../dialog-save-user-input/dialog-save-user-input.component";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-transport-user-input',
  templateUrl: './transport-user-input.component.html',
  styleUrls: ['./transport-user-input.component.css']
})
export class TransportUserInputComponent implements OnInit {
  user!: User;

  trip_categories: string[] = ["Arbeitsweg", "Dienstreise"]
  selectedTransportName: string = "";

  inputForm = this.fb.group(
    {
      id: [0],
      date: [(new Date())],
      transportID: [""],
      distance_km: [""],
      trip_category: [""]
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
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private userService: UserService
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
        console.log(this.inputForm.value)
        newData.trip_category = this.inputForm.value.trip_category as string;
        console.log(newData.trip_category)
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
        this.inputForm.reset();
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

  openDialog(): void {
    if (this.user.showSaveDialog) {
      let newData = this.inputForm.value as unknown as UserTransport;
      let transport =
        this.modesOfTransport.find(element => element.id === newData.transportID)
      this.selectedTransportName = transport!.name
      console.log(this.selectedTransportName)

      const dialogRef = this.dialog.open(DialogSaveUserInputComponent, {
        data: {
          inputData: newData,
          transportMode: this.selectedTransportName
        }
      })

      dialogRef.afterClosed().subscribe(res => {
        if (res.save) {
          this.saveConfirmed()
        }

        if (res.settings) {
          this.updateSettings(res.settings);
        }
      })
    } else {
      this.saveConfirmed()
    }
  }

  saveConfirmed(): void {
    let newData = this.inputForm.value as unknown as UserTransport;

    let transport =
      this.modesOfTransport.find(element => element.id === newData.transportID)

    if (transport !== undefined) {
      this.calculateEmissions(transport, newData.distance_km, newData)
    }
  }

  updateSettings(value: boolean) {
    this.user.showSaveDialog = false
    this.userService.put(this.user).subscribe(
      res => {
        console.log(res)
      }
    )
  }
}
