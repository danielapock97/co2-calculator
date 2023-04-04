export interface TransportUser {
  id: number,
  userID: number,
  transportID: string,
  date: Date,
  distance_km: number,
  calculatedEmissions: number
}
