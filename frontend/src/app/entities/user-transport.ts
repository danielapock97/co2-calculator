import {Emissions} from "./emissions";

export interface UserTransport {
  userID: String,
  transportID: string,
  date: Date,
  distance_km: number,
  calculatedEmissions: Emissions,
  trip_category: string
}
