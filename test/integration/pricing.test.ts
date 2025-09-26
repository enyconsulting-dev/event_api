import request from 'supertest';
import app, { startTestDb, stopTestDb } from '../../test/testSetup';

describe('Event Pricing API', () => {
  beforeAll(async () => {
    await startTestDb();
  });

  afterAll(async () => {
    await stopTestDb();
  });

  test('should create pricing for an event and perform CRUD', async () => {
    // Create event first
    const eventPayload = {
      title: 'Pricing Event',
      locations: [
        {
          name: 'Venue',
          state: 'S',
          country: 'C',
          startDate: new Date().toISOString(),
        }
      ]
    };

    const createEventRes = await request(app).post('/v1/events').send(eventPayload).expect(201);
    const event = createEventRes.body.data;

    const pricingPayload = {
      eventId: event._id,
      locationId: event.locations[0]._id,
      price: 25,
      currency: 'USD',
      benefits: ['Entry', 'Drink']
    };

    const createPricingRes = await request(app).post('/v1/events/pricing').send(pricingPayload).expect(201);
    const pricing = createPricingRes.body.data;

    // Get
    const getRes = await request(app).get(`/v1/events/pricing/${pricing._id}`).expect(200);
    expect(getRes.body.data.price).toBe(25);

    // Update
    const updateRes = await request(app).patch(`/v1/events/pricing/${pricing._id}`).send({ price: 30 }).expect(200);
    expect(updateRes.body.data.price).toBe(30);

    // Delete
    await request(app).delete(`/v1/events/pricing/${pricing._id}`).expect(200);
  });
});
