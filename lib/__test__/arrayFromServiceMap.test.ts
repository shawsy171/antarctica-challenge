import { arrayFromServicesMap } from "lib/arrayFromServicesMap";
import { Service } from "pages";

describe('arrayFromServicesMap', () => { 
  it('should return an array of services Map', () => {
    const servicesByMode = new Map<string, Service[]>();
    servicesByMode.set('mode1', [
      {
        id: 2,
        modeName: "mode1",
        name: "name2",
      },
      {
        id: 1,
        modeName: "mode1",
        name: "name1",
      },
    ]);
    servicesByMode.set('mode2', [
      {
        id: 4,
        modeName: "mode2",
        name: "name4",
      },
      {
        id: 3,
        modeName: "mode2",
        name: "name3",
      },
    ]);

    const result = arrayFromServicesMap(servicesByMode);

    expect(Array.isArray(result)).toBeTruthy();
  })
 })