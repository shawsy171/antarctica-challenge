import { Service } from 'pages';

export const hasNightService = (service: Service): boolean => {
  return service.serviceTypes.some((serviceType) => {
    return serviceType.name === 'Night';
  })
}
