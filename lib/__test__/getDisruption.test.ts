import { getDisruptions } from '../../lib/getDisruptions';

describe('getDisruptions', () => {
  it('should return an array of disruptions if is there are any', () => {
    const mockService =  {
      id: 1,
      name: "Station 1",
      modeName: "tube",
      lineStatuses: [{ statusSeverity: 20, reason: "Leaves on the track" }],
      serviceTypes: [{ name: "Regular" }]
    }

    const result = getDisruptions(mockService);

    expect(result).toEqual(["Leaves on the track"]);
  })
  it('should return an empty array if there are no disruptions', () => {
    const mockService =  {
      id: 1,
      name: "Station 1",
      modeName: "tube",
      lineStatuses: [{ statusSeverity: 10}],
      serviceTypes: [{ name: "Regular" }]
    }

    const result = getDisruptions(mockService);

    expect(result).toEqual([]);
  })
  
})