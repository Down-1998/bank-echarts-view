import MockAdapter from 'axios-mock-adapter';
import { httpClient } from '../lib/http';
import { buildDashboardPayload } from './payload';

const mock = new MockAdapter(httpClient, { delayResponse: 700 });

mock.onGet('/dashboard/overview').reply(() => {
  return [
    200,
    {
      code: 0,
      message: 'ok',
      data: buildDashboardPayload(),
    },
  ];
});
