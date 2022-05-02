import { Service } from 'pages';

export const hasDisruption = (service: Service): boolean => {  // write test for this
  return service.lineStatuses.some((line) => {
    return line.statusSeverity !== 10;
  })
}