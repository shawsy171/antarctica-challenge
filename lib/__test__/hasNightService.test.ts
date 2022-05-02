import { hasNightService } from "lib/hasNightService";

describe('hasNightService', () => { 
  it('should return true if the service is night', () => {
    const service = {
      id: 3,
      name: "Station 3",
      modeName: "tube",
      lineStatuses: [{ statusSeverity: 5 }],
      serviceTypes: [{ name: "Night" }]
    };

    expect(hasNightService(service)).toBe(true);
  });

  it('should return false if the service is not night', () => {
    const service = {
      id: 3,
      name: "Station 3",
      modeName: "tube",
      lineStatuses: [{ statusSeverity: 5 }],
      serviceTypes: [{ name: "Regular" }]
    };

    expect(hasNightService(service)).toBe(false);
  });
})