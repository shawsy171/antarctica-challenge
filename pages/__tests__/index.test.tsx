import { render, screen, cleanup, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Service} from '../../pages/index';
import Home from '@/pages/index'
/* 
  Given Preconditions
  When Action
  AND Expectations
  Then Post conditions
*/

const mockServices = [// should move to test/mock.ts
  {
    id: 1,
    name: "Station 1",
    modeName: "tube",
    lineStatuses: [{ statusSeverity: 10 }],
    serviceTypes: [{ name: "Regular" }]
  },
  {
    id: 2,
    name: "Station 2",
    modeName: "bus",
    lineStatuses: [{ statusSeverity: 20 }],
    serviceTypes: [{ name: "Regular" }]
  },
  {
    id: 3,
    name: "Station 3",
    modeName: "tube",
    lineStatuses: [{ statusSeverity: 5 }],
    serviceTypes: [{ name: "Regular" }]
  },
];

const renderHome = (services: Service[] = [], error = false) => {
  render(<Home services={services} error={error}/>)
}

describe('Home', () => {
  afterEach(cleanup)
  

  it('renders a heading', () => {
    renderHome()

    const heading = screen.getByRole('heading', {
      name: /welcome to Antarctica London Transport/i,
    })

    expect(heading).toBeInTheDocument()
  })

  describe('existing TFL services in a menu format', () => { // menu and when use click on it
    it('should show a menu ', () => {
      renderHome()
  
      const ServicesMenu = screen.getByRole('button', {
        name: /Services/i,
      })  

      expect(ServicesMenu).toBeInTheDocument()
    })

    it('should have 4 menu items', async () => {
      const user = userEvent.setup()
      renderHome(mockServices)
      
      const ServicesMenu = screen.getByRole('button', {
        name: /Services/i,
      })  

      await user.click(ServicesMenu)
      const menuItems = await screen.findAllByRole('menuitem')
      
      expect(menuItems).toHaveLength(4)
    })
  })

  describe('display notification', () => {
    it('should be visible if there no services', () => {
      renderHome([], true)
  
      const notification = screen.getByRole('alert')

      expect(notification).toBeInTheDocument()
    })

    it('should not be visible if there are services ', () => {
      
      renderHome(mockServices)
  
      const notification = screen.queryByRole('alert')

      expect(notification).not.toBeInTheDocument()
    })
  })

  describe('The menu should contain the name value from the service object', () => {
    it('should have a menu item with the name value from the service object', async () => {
      const user = userEvent.setup()

      renderHome(mockServices)

      const ServicesMenu = screen.getByRole('button', {
        name: /Services/i,
      })  

      await user.click(ServicesMenu)

      mockServices.forEach(async (service) => {
        const result = await within(ServicesMenu).findByRole('menuitem', { name: service.name })
        expect(result).toBeTruthy();
      })
    })
  })

  describe('next to the name of the service should be a visual cue if the service is facing a disruption', () => {
    it('should show Cancel if the service is facing a disruption', async () => {
      const user = userEvent.setup()

      const mockDisruptedService = {
        id: 5,
        name: "Station 5",
        modeName: "tube",
        lineStatuses: [{ statusSeverity: 20 }],
        serviceTypes: [{ name: "Regular" }]
      }
      
      renderHome([mockDisruptedService])

      const ServicesMenu = screen.getByRole('button', {
        name: /Services/i,
      })

      await user.click(ServicesMenu)

      const CancelIcon = await screen.findByTestId('CancelIcon');

      expect(CancelIcon).toBeInTheDocument()
    })
  })

  describe('Next to the name there should be a visual cue if the services operate in the evenings/night', () => {
    it('should show a Night Icon if the service operates in the evenings/night', async () => {

      const user = userEvent.setup()
  
        const mockDisruptedService = {
          id: 5,
          name: "Station 5",
          modeName: "tube",
          lineStatuses: [{ statusSeverity: 10 }],
          serviceTypes: [{ name: "Night" }]
        }
        
        renderHome([mockDisruptedService])
  
        const ServicesMenu = screen.getByRole('button', {
          name: /Services/i,
        })
  
        await user.click(ServicesMenu)
  
        const ModeNightIcon = await screen.findByTestId('ModeNightIcon');
  
        expect(ModeNightIcon).toBeInTheDocument()
    })
  })

  describe("  A header showing 'No Service Disruptions' if no object in the lineStatuses array has a statusSeverity value that's a different value than 10", () => {
    it('should show No Service Disruptions if service is not facing a disruption', async () => {
      const user = userEvent.setup()
      renderHome(mockServices)

      const ServicesMenu = screen.getByRole('button', {
        name: /Services/i,
      })

      await user.click(ServicesMenu)
      const menuItem = await screen.findByRole('menuitem', { name: 'Station 1' })
      
      await user.click(menuItem)

      const noDisruptionHeader = screen.getByRole('heading', {
        name: /No Service Disruptions/i,
      })
  
      expect(noDisruptionHeader).toBeInTheDocument()
    })

    it('should show "Service currently suffering disruptions" if service is not facing a disruption', async () => {
      const mockDisruptedService = {
        id: 6,
        name: "Station 6",
        modeName: "tube",
        lineStatuses: [{ statusSeverity: 20, reason: "We got london on the track" }],
        serviceTypes: [{ name: "Night" }]
      }

      const user = userEvent.setup()
      renderHome([mockDisruptedService])

      const ServicesMenu = screen.getByRole('button', {
        name: /Services/i,
      })

      await user.click(ServicesMenu)
      const menuItem = await screen.findByRole('menuitem', { name: 'Station 6' })
      
      await user.click(menuItem)
      
      const noDisruptionHeader = screen.getByRole('heading', {
        name: /Service currently suffering disruptions/i,
      })
  
      expect(noDisruptionHeader).toBeInTheDocument()
    })
  })

  describe('Cycle Hire', () => {
    it('has Cycle Hire option to the menu', async () => {
      const user = userEvent.setup();
      renderHome()
      const ServicesMenu = screen.getByRole('button', { name: /Services/i })
      await user.click(ServicesMenu)

      const CycleHireMenu = screen.getByRole('menuitem', {
        name: /Cycle Hire/i,
      })

      expect(CycleHireMenu).toBeInTheDocument()
    })
  })

})
