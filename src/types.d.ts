export enum Gases {
  METHANE = "methane",
  CARBON_MONOXIDE = "carbonmonoxide",
  OZONE = "ozone",
  NITROGEN_DIOXIDE = "nitrogendioxide",
}

export enum Countries {
  Germany = "DE",
  France = "FR",
  UK = "GB",
  Jamaica = "JM",
  China = "CN",
}

export interface Data {
  average: number;
  end: string;
  start: string;
}

export interface ServerResponse {
  data: Data[];
}

export interface ChartProps {
  gas: string;
  data?: Data[];
}
