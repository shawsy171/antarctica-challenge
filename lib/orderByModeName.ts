import {Service } from "../pages";

export const orderByModeName = (servicesData: Service[]): Map<string, Service[]> => {
  return servicesData.reduce((acc: any, service: Service) => {
    const modeName = service.modeName;
    if (!acc.has(modeName)) {
      acc.set(modeName, []);
    }
    acc.get(modeName).push(service);
    return acc;
  }, new Map());
  
}