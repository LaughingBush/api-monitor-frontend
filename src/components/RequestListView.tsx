import { ApiRequest } from '../types';
import './RequestListView.css';

interface RequestListViewProps {
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

export const RequestListView = ({ requests }: RequestListViewProps) => {
  return (
    <div className="list-view">
      {requests.map((request) => (
        <div key={request.id} className="list-item">
          <div className="list-item-header">
            <span
              className="method-badge"
              style={{ backgroundColor: getMethodColor(request.method) }}
            >
              {request.method}
            </span>
            <span
              className="status-badge"
              style={{ color: getStatusColor(request.response) }}
            >
              {request.response}
            </span>
            <span className="response-time">
              {request.responseTime}ms
            </span>
          </div>
          <div className="list-item-path">
            {request.path}
          </div>
          <div className="list-item-footer">
            <span className="created-at">
              {new Date(request.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
