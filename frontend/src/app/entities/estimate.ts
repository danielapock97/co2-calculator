
export interface Estimate {
  "emission_factor": {
    "activity_id": string,
    "source": string,
    "region": string,
    "year": string,
    "lca_activity": string
  },
  "parameters": {
    "distance": number,
    "distance_unit": string
  }
}
