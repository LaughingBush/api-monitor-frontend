import { useState, useEffect } from 'react';
import { RequestListView } from './components/RequestListView';
import { RequestTableView } from './components/RequestTableView';
import { ProblemsList } from './components/ProblemsList';
import { apiService } from './services/api';
import { ApiRequest, Problem, SortField, SortDirection, ViewMode, HttpMethod, ResponseStatus } from './types';
import './App.css';

type Tab = 'requests' | 'problems';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('requests');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMethod, setFilterMethod] = useState<HttpMethod | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<ResponseStatus | 'all'>('all');
  const [filterTimeRange, setFilterTimeRange] = useState<'all' | '1h' | '6h' | '24h'>('all');

  const [requests, setRequests] = useState<ApiRequest[]>([]);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [totalRequests, setTotalRequests] = useState(0);
  const [totalProblems, setTotalProblems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch requests from backend
  useEffect(() => {
    const fetchRequests = async () => {
      if (activeTab !== 'requests') return;

      setLoading(true);
      setError(null);

      try {
        const filters: any = {
          sortBy: sortField,
          sortDirection: sortDirection,
          limit: 100,
        };

        if (searchQuery) filters.search = searchQuery;
        if (filterMethod !== 'all') filters.method = filterMethod;
        if (filterStatus !== 'all') filters.response = filterStatus;

        // Time range filter
        if (filterTimeRange !== 'all') {
          const now = new Date();
          const hours = parseInt(filterTimeRange);
          const startTime = new Date(now.getTime() - hours * 60 * 60 * 1000);
          filters.startTime = startTime.toISOString();
        }

        const response = await apiService.getRequests(filters);
        setRequests(response.data);
        setTotalRequests(response.total);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch requests');
        console.error('Error fetching requests:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [activeTab, searchQuery, filterMethod, filterStatus, filterTimeRange, sortField, sortDirection]);

  // Fetch problems from backend
  useEffect(() => {
    const fetchProblems = async () => {
      if (activeTab !== 'problems') return;

      setLoading(true);
      setError(null);

      try {
        const filters: any = {
          sortBy: 'lastOccurrence',
          sortDirection: 'desc',
          limit: 100,
        };

        if (searchQuery) filters.search = searchQuery;
        if (filterMethod !== 'all') filters.method = filterMethod;
        if (filterStatus !== 'all') filters.status = filterStatus;

        const response = await apiService.getProblems(filters);
        setProblems(response.data);
        setTotalProblems(response.total);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch problems');
        console.error('Error fetching problems:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, [activeTab, searchQuery, filterMethod, filterStatus]);

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1 className="title">API Monitor</h1>
          <p className="subtitle">Treblle Ship Happens Hackathon 2025</p>
        </div>
      </header>

      <div className="container">
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'requests' ? 'active' : ''}`}
            onClick={() => setActiveTab('requests')}
          >
            API Requests
          </button>
          <button
            className={`tab ${activeTab === 'problems' ? 'active' : ''}`}
            onClick={() => setActiveTab('problems')}
          >
            Problems
          </button>
        </div>

        <div className="controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by path..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filters">
            <select
              value={filterMethod}
              onChange={(e) => setFilterMethod(e.target.value as HttpMethod | 'all')}
              className="filter-select"
            >
              <option value="all">All Methods</option>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="PATCH">PATCH</option>
              <option value="DELETE">DELETE</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value === 'all' ? 'all' : parseInt(e.target.value) as ResponseStatus)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="200">200</option>
              <option value="201">201</option>
              <option value="204">204</option>
              <option value="400">400</option>
              <option value="401">401</option>
              <option value="403">403</option>
              <option value="404">404</option>
              <option value="500">500</option>
              <option value="502">502</option>
              <option value="503">503</option>
            </select>

            <select
              value={filterTimeRange}
              onChange={(e) => setFilterTimeRange(e.target.value as 'all' | '1h' | '6h' | '24h')}
              className="filter-select"
            >
              <option value="all">All Time</option>
              <option value="1h">Last Hour</option>
              <option value="6h">Last 6 Hours</option>
              <option value="24h">Last 24 Hours</option>
            </select>
          </div>

          <div className="sort-controls">
            {activeTab === 'requests' && (
              <>
                <select
                  value={sortField}
                  onChange={(e) => setSortField(e.target.value as SortField)}
                  className="sort-select"
                >
                  <option value="createdAt">Sort by Created At</option>
                  <option value="responseTime">Sort by Response Time</option>
                </select>

                <button
                  onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
                  className="sort-direction-btn"
                  title={sortDirection === 'asc' ? 'Ascending' : 'Descending'}
                >
                  {sortDirection === 'asc' ? '↑' : '↓'}
                </button>
              </>
            )}

            <button
              onClick={() => setViewMode(prev => prev === 'list' ? 'table' : 'list')}
              className="view-toggle-btn"
            >
              {viewMode === 'list' ? '📋 Table View' : '📄 List View'}
            </button>
          </div>
        </div>

        <div className="content">
          {error && (
            <div style={{
              padding: '20px',
              backgroundColor: '#fee',
              color: '#c33',
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              <strong>Error:</strong> {error}
            </div>
          )}

          {loading ? (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              fontSize: '18px',
              color: '#666'
            }}>
              Loading...
            </div>
          ) : activeTab === 'requests' ? (
            <>
              {viewMode === 'list' ? (
                <RequestListView requests={requests} />
              ) : (
                <RequestTableView requests={requests} />
              )}
            </>
          ) : (
            <ProblemsList problems={problems} viewMode={viewMode} />
          )}
        </div>

        <footer className="footer">
          <p>
            {activeTab === 'requests'
              ? `Showing ${requests.length} of ${totalRequests} requests`
              : `Showing ${problems.length} of ${totalProblems} problems`}
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
