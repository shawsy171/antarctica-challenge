import { sortByName } from "lib/sortByName";
import { Service } from "pages";

describe('sortByName', () => { 
  it('should sort the services by name', () => {
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

    const result = sortByName(servicesByMode);
    
    const mode1 = result.get('mode1') as Service[];
    expect(mode1[0].name).toEqual('name1');
    expect(mode1[1].name).toEqual('name2');
    const mode2 = result.get('mode2') as Service[];
    expect(mode2[0].name).toEqual('name3');
    expect(mode2[1].name).toEqual('name4');

    
  })
})