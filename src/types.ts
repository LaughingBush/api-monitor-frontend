export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export type ResponseStatus = 200 | 201 | 204 | 400 | 401 | 403 | 404 | 500 | 502 | 503;

export interface ApiRequest {
  id: string;
  method: HttpMethod;
  path: string;
  response: ResponseStatus;
  responseTime: number; // in ms
  createdAt: Date;
}

export interface Problem {
  id: string;
  title: string;
  description: string;
  method: HttpMethod;
  path: string;
  occurrences: number;
  lastOccurrence: Date;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: ResponseStatus;
}

export type SortField = 'createdAt' | 'responseTime';
export type SortDirection = 'asc' | 'desc';
export type ViewMode = 'list' | 'table';
