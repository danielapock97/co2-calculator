import {Emissions} from "./emissions";

export interface TransportUser {
  id: number,
  userID: String,
  transportID: string,
  date: Date,
  distance_km: number,
  calculatedEmissions: Emissions,
  createdAt: Date
}
