import { Service } from "../pages";

export const arrayFromServicesMap = (servicesByMode: Map<string, Service[]>) => {
  let formattedServices: any = [];

  for (let [, services] of servicesByMode as any) { // any because typescript is not treating Map as an Iterable
    formattedServices = [...formattedServices, ...services];
  }
  return formattedServices;
}