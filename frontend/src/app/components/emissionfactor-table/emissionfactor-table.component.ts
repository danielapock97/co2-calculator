import {Component, OnInit} from '@angular/core';
import {TransportService} from "../../services/transport.service";
import {Transport} from "../../entities/transport";

@Component({
  selector: 'app-emissionfactor-table',
  templateUrl: './emissionfactor-table.component.html',
  styleUrls: ['./emissionfactor-table.component.css']
})
export class EmissionfactorTableComponent implements OnInit{

  data: Transport[] = []
  constructor(private transportService: TransportService) {
  }

  ngOnInit() {
    this.transportService.get().subscribe(
      res => {
        this.data = res
      }
    )
  }
}
