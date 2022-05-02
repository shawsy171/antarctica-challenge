import { Service } from "../pages";

export const sortByName = (servicesByMode: Map<string, Service[]>): Map<string, Service[]> => {
  servicesByMode.forEach((services: Service[]) => {
    services.sort((a: Service, b: Service) => a.name.localeCompare(b.name));
  });

  return servicesByMode;
}