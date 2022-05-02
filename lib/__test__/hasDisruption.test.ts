import { hasDisruption } from "lib/hasDisruption";

describe('hasDisruption', () => { 
  it('should return true if there is a disruption', () => {
    const service = { id: 1, name: 'Station 1', modeName: 'tube', lineStatuses: [{ statusSeverity: 20 }]}
    expect(hasDisruption(service)).toBe(true);
  });

  it('should return false if there is no disruption', () => {
    const service = { id: 1, name: 'Station 1', modeName: 'tube', lineStatuses: [{ statusSeverity: 10 }]}
    expect(hasDisruption(service)).toBe(false);
  });
});