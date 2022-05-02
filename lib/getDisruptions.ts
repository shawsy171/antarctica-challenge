import { Service, LineStatus } from "pages";

export const getDisruptions = (service: Service): string[] => {
  const reasons = service.lineStatuses.reduce((acc: string[], lineStatus: LineStatus) => {
    if(lineStatus.reason && lineStatus.statusSeverity !== 10) {
      acc.push(lineStatus.reason);
    }

    return acc;
  }, [])

  return reasons;
}
