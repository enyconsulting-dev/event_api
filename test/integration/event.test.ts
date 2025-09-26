import request from 'supertest';
import app, { startTestDb, stopTestDb } from '../../test/testSetup';
import { EventModel } from '../../src/model/index';

describe('Event API', () => {
  beforeAll(async () => {
    await startTestDb();
  });

  afterAll(async () => {
    await stopTestDb();
  });

  test('should create, get, update and delete an event', async () => {
    const payload = {
      title: 'Test Event',
      description: 'A test',
      locations: [
        {
          name: 'Test Venue',
          address: '123 Test St',
          state: 'TestState',
          country: 'TestCountry',
          startDate: new Date().toISOString(),
          coordinates: [-122.4194, 37.7749]
        }
      ]
    };

    // Create
    const createRes = await request(app).post('/v1/events').send(payload).expect(201);
    const created = createRes.body.data;
    expect(created.title).toBe('Test Event');

    const id = created._id;

    // Get
    const getRes = await request(app).get(`/v1/events/${id}`).expect(200);
    expect(getRes.body.data.title).toBe('Test Event');

    // Update
    const updateRes = await request(app).patch(`/v1/events/${id}`).send({ title: 'Updated' }).expect(200);
    expect(updateRes.body.data.title).toBe('Updated');

    // Delete
    await request(app).delete(`/v1/events/${id}`).expect(200);

    const found = await EventModel.findById(id);
    expect(found).toBeNull();
  });
});
