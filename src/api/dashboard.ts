import { http } from '../lib/http';
import type { DashboardPayload } from '../types/dashboard';

export async function getDashboardData() {
  const response = await http.get<DashboardPayload>('/dashboard/overview');
  return response;
}
