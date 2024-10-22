import axios from 'axios';
import { PolicyHolderTree } from '../types';
import config from '../config';

const API_BASE_URL = config.apiBaseUrl;

const handleApiError = (error: unknown, context: string) => {
  if (axios.isAxiosError(error)) {
    console.error(`Error ${context}:`, error.message);
  } else {
    console.error('Unexpected error:', error);
  }
  throw error;
};

export const getPolicyHolder = async (code: string): Promise<PolicyHolderTree> => {
  try {
    const response = await axios.get<PolicyHolderTree>(`${API_BASE_URL}/api/policyholders`, {
      params: { code }
    });
    return response.data;
  } catch (error) {
    return handleApiError(error, 'fetching policy holder');
  }
};

export const getPolicyHolderTop = async (code: string): Promise<PolicyHolderTree> => {
  try {
    const response = await axios.get<PolicyHolderTree>(`${API_BASE_URL}/api/policyholders/${code}/top`);
    return response.data;
  } catch (error) {
    return handleApiError(error, 'fetching top policy holder');
  }
};
