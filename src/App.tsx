import { useState, useMemo } from 'react';
import { RequestListView } from './components/RequestListView';
import { RequestTableView } from './components/RequestTableView';
import { ProblemsList } from './components/ProblemsList';
import { generateMockRequests, generateMockProblems } from './mockData';
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

  const requests = useMemo(() => generateMockRequests(), []);
  const problems = useMemo(() => generateMockProblems(), []);

  // Filter and sort requests
  const filteredRequests = useMemo(() => {
    let filtered = [...requests];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(req =>
        req.path.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Method filter
    if (filterMethod !== 'all') {
      filtered = filtered.filter(req => req.method === filterMethod);
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(req => req.response === filterStatus);
    }

    // Time range filter
    if (filterTimeRange !== 'all') {
      const now = Date.now();
      const hours = parseInt(filterTimeRange);
      const cutoff = now - hours * 60 * 60 * 1000;
      filtered = filtered.filter(req => new Date(req.createdAt).getTime() >= cutoff);
    }

    // Sort
    filtered.sort((a, b) => {
      let aVal: number, bVal: number;

      if (sortField === 'createdAt') {
        aVal = new Date(a.createdAt).getTime();
        bVal = new Date(b.createdAt).getTime();
      } else {
        aVal = a.responseTime;
        bVal = b.responseTime;
      }

      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    });

    return filtered;
  }, [requests, searchQuery, filterMethod, filterStatus, filterTimeRange, sortField, sortDirection]);

  // Filter and sort problems
  const filteredProblems = useMemo(() => {
    let filtered = [...problems];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(prob =>
        prob.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prob.path.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Method filter
    if (filterMethod !== 'all') {
      filtered = filtered.filter(prob => prob.method === filterMethod);
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(prob => prob.status === filterStatus);
    }

    // Time range filter
    if (filterTimeRange !== 'all') {
      const now = Date.now();
      const hours = parseInt(filterTimeRange);
      const cutoff = now - hours * 60 * 60 * 1000;
      filtered = filtered.filter(prob => new Date(prob.lastOccurrence).getTime() >= cutoff);
    }

    return filtered;
  }, [problems, searchQuery, filterMethod, filterStatus, filterTimeRange]);

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
          {activeTab === 'requests' ? (
            <>
              {viewMode === 'list' ? (
                <RequestListView requests={filteredRequests} />
              ) : (
                <RequestTableView requests={filteredRequests} />
              )}
            </>
          ) : (
            <ProblemsList problems={filteredProblems} viewMode={viewMode} />
          )}
        </div>

        <footer className="footer">
          <p>
            {activeTab === 'requests'
              ? `Showing ${filteredRequests.length} of ${requests.length} requests`
              : `Showing ${filteredProblems.length} of ${problems.length} problems`}
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
