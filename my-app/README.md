# Streamify Analytics Dashboard

A React-based analytics dashboard for a fictional music streaming service that visualizes key metrics, user growth, revenue distribution, and streaming data.

## Features

### Key Metrics Display
- Total Users Count
- Active Users (30-day active)
- Total Streams
- Revenue Overview
- Top Artist

### Interactive Data Visualizations
- User Growth Chart (Line Chart)
  - Tracks total and active users over 12 months
  - Interactive tooltips
- Revenue Distribution (Pie Chart)
  - Breakdown of revenue sources
  - Interactive segments
- Top 5 Streamed Songs (Bar Chart)
  - Visual representation of most popular tracks
  - Stream count visualization

### Data Table
- Comprehensive stream data display
- Sortable columns
- Filter functionality
  - By song name
  - By artist
  - Combined search

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
```bash
git clone < https://github.com/kapil220/speedybrand >
cd my-app
```

2. Install dependencies
```bash
npm install
```

3. Install required packages
```bash
npm install recharts
```

### Running the Application

Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Deployed on vercel

Link to live: https://speedybrand-oi67k26kt-kapil220s-projects.vercel.app/

## Project Structure

```
src/
├── components/
│   ├── Dashboard.js        # Main dashboard component
│   └── Dashboard.css       # Dashboard styles
├── App.js                  # Root component
└── index.js               # Entry point
```

## Implementation Details

### Technology Stack
- React.js
- Recharts for data visualization
- CSS for styling

### Key Components

#### Dashboard.js
- Main container component
- Manages state for sorting and filtering
- Handles data processing and visualization

#### Dashboard.css
- Contains all styling for the dashboard
- Implements responsive design
- Provides modern, clean UI elements

### Performance Optimizations
- Memoized calculations for filtered data
- Efficient sorting algorithms
- Responsive design considerations
- Optimized re-rendering

## Features Breakdown

### Metrics Cards
- Clean, modern design
- Real-time data updates
- Responsive layout

### Charts
1. User Growth Chart
   - Monthly tracking
   - Dual metrics display
   - Interactive tooltips

2. Revenue Distribution
   - Clear segment visualization
   - Interactive elements
   - Percentage breakdown

3. Top Songs Chart
   - Stream count visualization
   - Interactive elements
   - Clear labeling

### Data Table
- Sortable columns
- Search functionality
- Responsive design
- Efficient data handling

## Customization

### Styling
The dashboard's appearance can be customized by modifying `Dashboard.css`. Key areas for customization:

```css

.dashboard {
  --primary-color: #your-color;
  --secondary-color: #your-color;
}
```

### Data Configuration
Mock data can be modified in the `generateMockData` function within `Dashboard.js`

## Best Practices

### Code Organization
- Component-based architecture
- Separation of concerns
- Clean code principles
- Consistent naming conventions

### Performance
- Memoization for expensive calculations
- Efficient state management
- Optimized rendering
- Responsive design considerations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Acknowledgments

- Recharts library for chart components
- React.js community
- Modern dashboard design inspirations