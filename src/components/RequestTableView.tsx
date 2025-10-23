import { ApiRequest } from '../types';
import './RequestTableView.css';

interface RequestTableViewProps {
  requests: ApiRequest[];
}

const getMethodColor = (method: string) => {
  const colors: Record<string, string> = {
    GET: '#61affe',
    POST: '#49cc90',
    PUT: '#fca130',
    PATCH: '#50e3c2',
    DELETE: '#f93e3e',
  };
  return colors[method] || '#999';
};

const getStatusColor = (status: number) => {
  if (status >= 200 && status < 300) return '#49cc90';
  if (status >= 400 && status < 500) return '#fca130';
  if (status >= 500) return '#f93e3e';
  return '#999';
};

export const RequestTableView = ({ requests }: RequestTableViewProps) => {
  return (
    <div className="table-container">
      <table className="table-view">
        <thead>
          <tr>
            <th>Method</th>
            <th>Status</th>
            <th>Path</th>
            <th>Response Time</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>
                <span
                  className="method-badge"
                  style={{ backgroundColor: getMethodColor(request.method) }}
                >
                  {request.method}
                </span>
              </td>
              <td>
                <span
                  className="status-badge"
                  style={{ color: getStatusColor(request.response) }}
                >
                  {request.response}
                </span>
              </td>
              <td className="path-cell">{request.path}</td>
              <td>
                <span className="response-time">{request.responseTime}ms</span>
              </td>
              <td className="date-cell">
                {new Date(request.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
