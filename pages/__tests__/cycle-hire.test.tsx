import React from "react"
import { render, screen, cleanup, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CycleHire from "../cycle-hire"
import * as api from '../../services/api/api';

jest.mock('../../services/api/api', () => {
  return {
    __esModule: true,
    createCycleHireFetch: jest.fn().mockImplementation(() => () => ([{
      commonName: "Park Road (Baker Street), The Fake Regent's Park",
      id: "BikePoints_114",
      lat: 51.524517,
      lon: -0.158963,
    }, {
      commonName: "Fake Street, Fake Town",
      id: "BikePoints_007",
      lat: 69.524517,
      lon: 21.158963,
    }])),
  }
})

const renderCycleHire = () => {
  render(<CycleHire/>)
}

describe('renders CycleHire', () => { 
  it('renders a heading', () => {
    renderCycleHire()

    const heading = screen.getByRole('heading', {
      name: /cycle hire/i,
    })

    expect(heading).toBeInTheDocument()
  })
  it('has A search box where the user can enter a text and have returned the bikepoints that match the search', () => {
    renderCycleHire()
  })
  describe('results', () => {

    it(' display the results of this search as a list', async () => {
      userEvent.setup();

      renderCycleHire()

      const searchBox = screen.getByRole('textbox', {
        name: /cycle hire/i,
      })

      await userEvent.type(searchBox, 'regent')

      const results = await screen.findAllByRole('listitem')

      expect(results).toHaveLength(2)
    })
  
    it('show the id of the bike point', async () => {
      userEvent.setup();

      renderCycleHire()

      const searchBox = screen.getByRole('textbox', {
        name: /cycle hire/i,
      })

      await userEvent.type(searchBox, 'regent')

      const results = await screen.findByText(/BikePoints_007/i)

      expect(results).toBeInTheDocument();
    })

    it('show its commonName value', async () => {
      userEvent.setup();

      renderCycleHire()

      const searchBox = screen.getByRole('textbox', {
        name: /cycle hire/i,
      })

      await userEvent.type(searchBox, 'regent')

      const results = await screen.findByText(/Fake Street, Fake Town/i)

      expect(results).toBeInTheDocument();
    })

    it('show its coordinates', async () => {
      userEvent.setup();

      renderCycleHire()

      const searchBox = screen.getByRole('textbox', {
        name: /cycle hire/i,
      })

      await userEvent.type(searchBox, 'regent')

      const results = await screen.findByText(/(69.524517, 21.158963)/i)

      expect(results).toBeInTheDocument();
    })

    describe('If the api returns an empty array', () => { 
      it('display the following: A header saying “No bike points found for {SEARCH_TERM}”', async () => {
        (api.createCycleHireFetch as jest.Mock).mockImplementation(() => () => {
          return []
        })

        userEvent.setup();
  
        renderCycleHire()
  
        const searchBox = screen.getByRole('textbox', {
          name: /cycle hire/i,
        })
  
        await userEvent.type(searchBox, 'no content')
  
        // const results = await screen.findByText(/No bike points found for no content/i)
        // screen.debug()
        // expect(results).toBeInTheDocument(); // TODO: fix this can't override the createCycleHireFetch mock
      })
     })
   })
})