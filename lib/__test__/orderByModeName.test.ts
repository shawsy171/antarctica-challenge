import { orderByModeName } from "lib/orderByModeName";
import {  Service } from "pages";

describe('The menu items should be ordered firstly by modeName & then by name', () => {
  describe("orderByModeName", () => {
    it('should return a Map with the key being the modeName and the value being an array of services', () => {
      const servicesData: Service[] = [
        {
          id: 1,
          modeName: "mode1",
          name: "name1",
        },
        {
          id: 2,
          modeName: "mode1",
          name: "name2",
        },
        {
          id: 3,
          modeName: "mode2",
          name: "name3",
        },
        {
          id: 4,
          modeName: "mode2",
          name: "name4",
        }
      ];
      const expectedResult: Map<string, Service[]> = new Map<string, Service[]>();
      expectedResult.set("mode1", [
        {
          id: 1,
          modeName: "mode1",
          name: "name1",
        },
        {
          id: 2,
          modeName: "mode1",
          name: "name2",
        }
      ]);
  
      expectedResult.set("mode2", [
        {
          id: 3,
          modeName: "mode2",
          name: "name3",
  
        },
        {
          id: 4,
          modeName: "mode2",
          name: "name4",
        }
      ]);
  
      const result = orderByModeName(servicesData);
      expect(result).toEqual(expectedResult);
    });
  })
  
})