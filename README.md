# API Monitor - Treblle Ship Happens Hackathon 2025

A modern, feature-rich API monitoring dashboard built with React and TypeScript for the Treblle Ship Happens Hackathon 2025.

## Features

### Base Requirements
- **List View**: Display API requests in a card-based list format
- **Table View**: Display API requests in a structured table format
- **Sort Functionality**:
  - Sort by Created At
  - Sort by Response Time
  - Toggle ascending/descending order
- **Filter Functionality**:
  - Filter by HTTP Method (GET, POST, PUT, PATCH, DELETE)
  - Filter by Response Status (200, 201, 400, 401, 404, 500, etc.)
  - Filter by Time Range (Last Hour, Last 6 Hours, Last 24 Hours, All Time)
- **Search Function**: Search API requests by path
- **Problem Object**:
  - Dedicated view for API problems/issues
  - Displays severity, occurrences, method, path, and status
  - Supports both list and table views
  - Full filtering and search capabilities

### Advanced Features Implemented
- **Custom Gradient Design**: Beautiful gradient backgrounds and modern UI
- **Responsive Design**: Works seamlessly on all screen sizes
- **Real-time Filtering**: Instant updates as you type or change filters
- **Mock Data**: Pre-populated with 50 API requests and 5 problem scenarios
- **TypeScript**: Full type safety throughout the application
- **Modern React**: Uses React 18 with hooks and functional components

## Tech Stack

- **React 18**: Modern UI library with hooks
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and development server
- **CSS3**: Custom styling with gradients and animations

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd api-monitor-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
api-monitor-frontend/
├── src/
│   ├── components/
│   │   ├── RequestListView.tsx      # List view for API requests
│   │   ├── RequestListView.css
│   │   ├── RequestTableView.tsx     # Table view for API requests
│   │   ├── RequestTableView.css
│   │   ├── ProblemsList.tsx         # Problems view component
│   │   └── ProblemsList.css
│   ├── App.tsx                      # Main application component
│   ├── App.css
│   ├── main.tsx                     # Application entry point
│   ├── index.css                    # Global styles
│   ├── types.ts                     # TypeScript type definitions
│   └── mockData.ts                  # Mock data generator
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Features in Detail

### API Requests View

The main view displays all API requests with the following information:
- **Method**: HTTP method with color-coded badges
- **Response Status**: Status code with color indication (green for 2xx, orange for 4xx, red for 5xx)
- **Path**: The API endpoint path
- **Response Time**: Time taken to process the request in milliseconds
- **Created At**: Timestamp of when the request was made

### Problems View

A dedicated section for identifying and tracking API problems:
- **Severity Levels**: Low, Medium, High, Critical
- **Occurrence Count**: Number of times the problem has occurred
- **Method & Path**: Where the problem is happening
- **Status Code**: Associated HTTP status code
- **Last Occurrence**: When the problem was last seen

### Filtering & Search

- **Method Filter**: Filter by specific HTTP methods
- **Status Filter**: Filter by response status codes
- **Time Range Filter**: View requests from specific time periods
- **Search**: Find requests by path matching

### Sorting

- Sort by timestamp (newest/oldest first)
- Sort by response time (fastest/slowest first)
- Toggle between ascending and descending order

## Mock Data

The application includes mock data generators that create:
- 50 sample API requests with various methods, paths, statuses, and response times
- 5 problem scenarios with different severity levels

All data is generated on application load and stored in memory.

## Color Scheme

The application uses a modern dark theme with gradient backgrounds:
- **Primary**: Purple/Blue gradient (#646cff)
- **Background**: Dark gradient from black to navy
- **Success**: Green (#49cc90)
- **Warning**: Orange (#fca130)
- **Error**: Red (#f93e3e)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Backend Integration

This frontend is now **fully integrated** with the API Monitor Backend!

### Setup

1. **Start the backend server** (from `api-monitor-backend` directory):
```bash
npm run dev
```

2. **Configure the frontend** - Create `.env` file:
```bash
cp .env.example .env
```

Default configuration:
```
VITE_API_URL=http://localhost:3000
```

3. **Start the frontend**:
```bash
npm run dev
```

### API Integration Features

- ✅ **Real-time data** fetching from backend
- ✅ **Server-side filtering** - All filters applied on backend
- ✅ **Server-side sorting** - Efficient sorting on database level
- ✅ **Loading states** - Visual feedback during API calls
- ✅ **Error handling** - User-friendly error messages
- ✅ **Type-safe API** - Full TypeScript integration

### API Service

The frontend uses `src/services/api.ts` to communicate with the backend:

```typescript
// Fetch requests with filters
apiService.getRequests({
  method: 'GET',
  response: 200,
  sortBy: 'responseTime',
  sortDirection: 'desc'
});

// Fetch problems with filters
apiService.getProblems({
  severity: 'critical',
  search: 'payment'
});
```

## License

MIT

## Hackathon Submission

**Treblle Ship Happens Hackathon 2025**
Submission by: [Your Name]
Date: October 24, 2025
