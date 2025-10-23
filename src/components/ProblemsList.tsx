import { Problem } from '../types';
import './ProblemsList.css';

interface ProblemsListProps {
  problems: Problem[];
  viewMode: 'list' | 'table';
}

const getSeverityColor = (severity: string) => {
  const colors: Record<string, string> = {
    low: '#49cc90',
    medium: '#fca130',
    high: '#ff6b6b',
    critical: '#f93e3e',
  };
  return colors[severity] || '#999';
};

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

export const ProblemsList = ({ problems, viewMode }: ProblemsListProps) => {
  if (viewMode === 'table') {
    return (
      <div className="table-container">
        <table className="problems-table">
          <thead>
            <tr>
              <th>Severity</th>
              <th>Title</th>
              <th>Method</th>
              <th>Path</th>
              <th>Status</th>
              <th>Occurrences</th>
              <th>Last Occurrence</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem) => (
              <tr key={problem.id}>
                <td>
                  <span
                    className="severity-badge"
                    style={{ backgroundColor: getSeverityColor(problem.severity) }}
                  >
                    {problem.severity}
                  </span>
                </td>
                <td className="title-cell">{problem.title}</td>
                <td>
                  <span
                    className="method-badge"
                    style={{ backgroundColor: getMethodColor(problem.method) }}
                  >
                    {problem.method}
                  </span>
                </td>
                <td className="path-cell">{problem.path}</td>
                <td>
                  <span className="status-badge">{problem.status}</span>
                </td>
                <td className="count-cell">{problem.occurrences}</td>
                <td className="date-cell">
                  {new Date(problem.lastOccurrence).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="problems-list">
      {problems.map((problem) => (
        <div key={problem.id} className="problem-item">
          <div className="problem-header">
            <span
              className="severity-badge"
              style={{ backgroundColor: getSeverityColor(problem.severity) }}
            >
              {problem.severity}
            </span>
            <span
              className="method-badge"
              style={{ backgroundColor: getMethodColor(problem.method) }}
            >
              {problem.method}
            </span>
            <span className="status-badge">{problem.status}</span>
            <span className="occurrences-badge">
              {problem.occurrences} occurrences
            </span>
          </div>
          <h3 className="problem-title">{problem.title}</h3>
          <p className="problem-description">{problem.description}</p>
          <div className="problem-footer">
            <span className="problem-path">{problem.path}</span>
            <span className="problem-date">
              Last seen: {new Date(problem.lastOccurrence).toLocaleString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
