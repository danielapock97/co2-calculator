import {Transport} from "./transport";

export interface Emissions {
  "co2e": number,
  "co2e_unit": string,
  "co2e_calculation_method": string,
  "co2e_calculation_origin": string,
  "emission_factor": Transport,
  "constituent_gases": {
    "co2e_total": number | null,
    "co2e_other": number | null
    "co2": number | null
    "ch4": number | null
    "n2o": number | null
  }
}
