export interface Transport {
  id: number,
  uuid: string,
  transportName: string,
  activityId: string
  emissionFactor: number,
  unitForCalculation: string,
  unitOfEmission: string,
  LCA_Activity: string,
  year: number,
  region: string,
}
