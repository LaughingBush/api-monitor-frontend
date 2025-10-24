import { ApiRequest, Problem, HttpMethod, ResponseStatus, SortField, SortDirection } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  limit: number;
  offset: number;
}

interface RequestFilters {
  method?: HttpMethod;
  response?: ResponseStatus;
  startTime?: string;
  endTime?: string;
  minResponseTime?: number;
  maxResponseTime?: number;
  search?: string;
  sortBy?: SortField;
  sortDirection?: SortDirection;
  limit?: number;
  offset?: number;
}

interface ProblemFilters {
  method?: HttpMethod;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  status?: ResponseStatus;
  search?: string;
  sortBy?: 'lastOccurrence' | 'occurrences';
  sortDirection?: SortDirection;
  limit?: number;
  offset?: number;
}

export const apiService = {
  // Requests endpoints
  async getRequests(filters: RequestFilters = {}): Promise<PaginatedResponse<ApiRequest>> {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== 'all') {
        params.append(key, String(value));
      }
    });

    const response = await fetch(`${API_BASE_URL}/api/requests?${params}`);
    if (!response.ok) {
      throw new Error('Failed to fetch requests');
    }

    const data = await response.json();

    // Convert date strings to Date objects
    return {
      ...data,
      data: data.data.map((req: any) => ({
        ...req,
        createdAt: new Date(req.createdAt),
      })),
    };
  },

  async getRequestById(id: string): Promise<ApiRequest> {
    const response = await fetch(`${API_BASE_URL}/api/requests/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch request');
    }

    const data = await response.json();
    return {
      ...data,
      createdAt: new Date(data.createdAt),
    };
  },

  async createRequest(request: Omit<ApiRequest, 'id'>): Promise<ApiRequest> {
    const response = await fetch(`${API_BASE_URL}/api/requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error('Failed to create request');
    }

    const data = await response.json();
    return {
      ...data,
      createdAt: new Date(data.createdAt),
    };
  },

  async deleteRequest(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/requests/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete request');
    }
  },

  // Problems endpoints
  async getProblems(filters: ProblemFilters = {}): Promise<PaginatedResponse<Problem>> {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== 'all') {
        params.append(key, String(value));
      }
    });

    const response = await fetch(`${API_BASE_URL}/api/problems?${params}`);
    if (!response.ok) {
      throw new Error('Failed to fetch problems');
    }

    const data = await response.json();

    // Convert date strings to Date objects
    return {
      ...data,
      data: data.data.map((prob: any) => ({
        ...prob,
        lastOccurrence: new Date(prob.lastOccurrence),
      })),
    };
  },

  async getProblemById(id: string): Promise<Problem> {
    const response = await fetch(`${API_BASE_URL}/api/problems/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch problem');
    }

    const data = await response.json();
    return {
      ...data,
      lastOccurrence: new Date(data.lastOccurrence),
    };
  },

  async createProblem(problem: Omit<Problem, 'id'>): Promise<Problem> {
    const response = await fetch(`${API_BASE_URL}/api/problems`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(problem),
    });

    if (!response.ok) {
      throw new Error('Failed to create problem');
    }

    const data = await response.json();
    return {
      ...data,
      lastOccurrence: new Date(data.lastOccurrence),
    };
  },

  async updateProblem(id: string, updates: Partial<Omit<Problem, 'id'>>): Promise<Problem> {
    const response = await fetch(`${API_BASE_URL}/api/problems/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error('Failed to update problem');
    }

    const data = await response.json();
    return {
      ...data,
      lastOccurrence: new Date(data.lastOccurrence),
    };
  },

  async deleteProblem(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/problems/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete problem');
    }
  },

  // Health check
  async checkHealth(): Promise<{ status: string; timestamp: string }> {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) {
      throw new Error('Health check failed');
    }
    return response.json();
  },
};
