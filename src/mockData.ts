import { ApiRequest, Problem } from './types';

// Generate mock API requests
export const generateMockRequests = (): ApiRequest[] => {
  const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] as const;
  const paths = [
    '/api/v1/users',
    '/api/v1/users/123',
    '/api/v1/products',
    '/api/v1/products/456',
    '/api/v1/orders',
    '/api/v1/orders/789',
    '/api/v1/auth/login',
    '/api/v1/auth/logout',
    '/api/v1/payments',
    '/api/v1/webhooks',
  ];
  const statuses = [200, 201, 204, 400, 401, 403, 404, 500, 502, 503] as const;

  const requests: ApiRequest[] = [];

  for (let i = 0; i < 50; i++) {
    const randomDate = new Date();
    randomDate.setHours(randomDate.getHours() - Math.floor(Math.random() * 24));
    randomDate.setMinutes(randomDate.getMinutes() - Math.floor(Math.random() * 60));

    requests.push({
      id: `req-${i + 1}`,
      method: methods[Math.floor(Math.random() * methods.length)],
      path: paths[Math.floor(Math.random() * paths.length)],
      response: statuses[Math.floor(Math.random() * statuses.length)],
      responseTime: Math.floor(Math.random() * 2000) + 10,
      createdAt: randomDate,
    });
  }

  return requests.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

// Generate mock problems
export const generateMockProblems = (): Problem[] => {
  const problems: Problem[] = [
    {
      id: 'prob-1',
      title: 'High Response Time on User Endpoint',
      description: 'GET /api/v1/users endpoint consistently returns slow responses',
      method: 'GET',
      path: '/api/v1/users',
      occurrences: 15,
      lastOccurrence: new Date(Date.now() - 1000 * 60 * 30),
      severity: 'high',
      status: 200,
    },
    {
      id: 'prob-2',
      title: 'Server Error on Payment Processing',
      description: 'POST /api/v1/payments returning 500 errors intermittently',
      method: 'POST',
      path: '/api/v1/payments',
      occurrences: 8,
      lastOccurrence: new Date(Date.now() - 1000 * 60 * 15),
      severity: 'critical',
      status: 500,
    },
    {
      id: 'prob-3',
      title: 'Unauthorized Access Attempts',
      description: 'Multiple 401 responses on protected endpoints',
      method: 'GET',
      path: '/api/v1/orders',
      occurrences: 23,
      lastOccurrence: new Date(Date.now() - 1000 * 60 * 5),
      severity: 'medium',
      status: 401,
    },
    {
      id: 'prob-4',
      title: 'Resource Not Found',
      description: 'DELETE /api/v1/products/456 returning 404 errors',
      method: 'DELETE',
      path: '/api/v1/products/456',
      occurrences: 5,
      lastOccurrence: new Date(Date.now() - 1000 * 60 * 60),
      severity: 'low',
      status: 404,
    },
    {
      id: 'prob-5',
      title: 'Bad Gateway Errors',
      description: 'Webhook endpoint experiencing 502 errors during high traffic',
      method: 'POST',
      path: '/api/v1/webhooks',
      occurrences: 12,
      lastOccurrence: new Date(Date.now() - 1000 * 60 * 45),
      severity: 'high',
      status: 502,
    },
  ];

  return problems;
};
