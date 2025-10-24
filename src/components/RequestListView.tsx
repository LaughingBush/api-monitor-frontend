import { ApiRequest } from '../types';
import { Sparkline } from './Sparkline';
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

const formatTimeAgo = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);

  if (seconds < 60) return `${seconds}sec ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}min ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}hr ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
};

export const RequestListView = ({ requests }: RequestListViewProps) => {
  return (
    <div className="list-view">
      {requests.map((request) => (
        <div key={request.id} className="list-item">
          <div className="list-item-left">
            <div className="list-item-badges">
              <span
                className="method-badge"
                style={{ backgroundColor: getMethodColor(request.method) }}
              >
                {request.method}
              </span>
              <span
                className="status-badge"
                style={{
                  color: getStatusColor(request.response),
                  borderColor: getStatusColor(request.response)
                }}
              >
                {request.response}
              </span>
              <span className="list-item-path">{request.path}</span>
            </div>
            <div className="list-item-meta">
              <span className="meta-item">
                ⚡ {request.responseTime}ms
              </span>
              <span className="meta-item">
                🕐 {formatTimeAgo(request.createdAt)}
              </span>
            </div>
          </div>
          <div className="list-item-right">
            <Sparkline width={200} height={60} />
          </div>
        </div>
      ))}
    </div>
  );
};
