import type { CreateSpiderfootScanDto, CreateSpiderfootScanResponse } from '../types/spiderfoot';
import { http } from './http';

export const createSpiderfootScanRequest = async (
  payload: CreateSpiderfootScanDto
): Promise<CreateSpiderfootScanResponse> => {
  const { data } = await http.post<CreateSpiderfootScanResponse>(
    '/spiderfoot/create-scan',
    payload
  );
  return data;
};
