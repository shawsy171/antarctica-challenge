import { rest } from 'msw';

export const handlers = [
  rest.get('https://api.tfl.gov.uk/BikePoint/Search', (req, res, ctx) => {
    return res(
      ctx.json([{
        commonName: "Park Road (Baker Street), The Fake Regent's Park",
        id: "BikePoints_114",
        lat: 51.524517,
        lon: -0.158963,
      }])
    );
  })
]