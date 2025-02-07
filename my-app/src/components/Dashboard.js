import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import './Dashboard.css';


const generateMockData = () => {
  const userGrowthData = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(2024, i, 1).toLocaleString('default', { month: 'short' }),
    totalUsers: Math.floor(100000 + (i * 15000) + Math.random() * 5000),
    activeUsers: Math.floor(80000 + (i * 12000) + Math.random() * 4000),
  }));

  const revenueData = [
    { name: 'Subscriptions', value: 750000 },
    { name: 'Advertisements', value: 250000 },
  ];

  const topSongs = [
    { name: 'HUMBLE', streams: 1200000, artist: 'Kendric Lamar' },
    { name: 'Gods Plan', streams: 980000, artist: 'Drake' },
    { name: 'Stronger', streams: 870000, artist: 'Kanye West' },
    { name: 'Lose Yourself', streams: 760000, artist: 'Eminem' },
    { name: 'No Role Modelz', streams: 650000, artist: 'J Cole' },
  ];

  const recentStreams = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    songName: topSongs[Math.floor(Math.random() * topSongs.length)].name,
    artist: topSongs[Math.floor(Math.random() * topSongs.length)].artist,
    dateStreamed: new Date(2024, 1, Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
    streamCount: Math.floor(Math.random() * 10000) + 1000,
    userId: `USER${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`,
  }));

  return {
    userGrowthData,
    revenueData,
    topSongs,
    recentStreams,
  };
};

const COLORS = ['#0088FE', '#00C49F'];

const Dashboard = () => {
  const mockData = useMemo(() => generateMockData(), []);
  const [sortConfig, setSortConfig] = useState({ key: 'dateStreamed', direction: 'desc' });
  const [filterText, setFilterText] = useState('');
  const [filterType, setFilterType] = useState('all');

  const keyMetrics = useMemo(() => ({
    totalUsers: mockData.userGrowthData[mockData.userGrowthData.length - 1].totalUsers,
    activeUsers: mockData.userGrowthData[mockData.userGrowthData.length - 1].activeUsers,
    totalStreams: mockData.topSongs.reduce((acc, song) => acc + song.streams, 0),
    revenue: mockData.revenueData.reduce((acc, item) => acc + item.value, 0),
    topArtist: mockData.topSongs[0].artist,
  }), [mockData]);

  const sortedAndFilteredStreams = useMemo(() => {
    return mockData.recentStreams
      .filter(stream => {
        const searchText = filterText.toLowerCase();
        if (filterType === 'artist') return stream.artist.toLowerCase().includes(searchText);
        if (filterType === 'song') return stream.songName.toLowerCase().includes(searchText);
        return stream.artist.toLowerCase().includes(searchText) || 
               stream.songName.toLowerCase().includes(searchText);
      })
      .sort((a, b) => {
        if (sortConfig.direction === 'asc') {
          return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
        }
        return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
      });
  }, [mockData.recentStreams, sortConfig, filterText, filterType]);

  const requestSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <h1 className="dashboard-title">Streamify Analytics Dashboard</h1>

      
        <div className="metrics-grid">
          {[
            { title: 'Total Users', value: keyMetrics.totalUsers.toLocaleString() },
            { title: 'Active Users', value: keyMetrics.activeUsers.toLocaleString() },
            { title: 'Total Streams', value: keyMetrics.totalStreams.toLocaleString() },
            { title: 'Revenue', value: `$${(keyMetrics.revenue / 1000000).toFixed(2)}M` },
            { title: 'Top Artist', value: keyMetrics.topArtist },
          ].map((metric, index) => (
            <div key={index} className="metric-card">
              <h3 className="metric-title">{metric.title}</h3>
              <p className="metric-value">{metric.value}</p>
            </div>
          ))}
        </div>

      
        <div className="charts-grid">
        
          <div className="chart-card">
            <h3 className="chart-title">User Growth</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData.userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="totalUsers" stroke="#8884d8" name="Total Users" />
                  <Line type="monotone" dataKey="activeUsers" stroke="#82ca9d" name="Active Users" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

         
          <div className="chart-card-2">
            <h3 className="chart-title">Revenue Distribution</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockData.revenueData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: $${(value / 1000000).toFixed(2)}M`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {mockData.revenueData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        
          <div className="chart-card full-width">
            <h3 className="chart-title">Top 5 Streamed Songs</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData.topSongs}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="streams" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

       
        <div className="table-card">
          <h3 className="table-title">Recent Streams</h3>
          <div className="table-controls">
            <input
              type="text"
              placeholder="Filter streams..."
              className="filter-input"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
            <select
              className="filter-select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All</option>
              <option value="song">Song Name</option>
              <option value="artist">Artist</option>
            </select>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  {['Song Name', 'Artist', 'Date Streamed', 'Stream Count', 'User ID'].map((header) => (
                    <th
                      key={header}
                      onClick={() => requestSort(header.toLowerCase().replace(' ', ''))}
                      className="sortable-header"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedAndFilteredStreams.map((stream) => (
                  <tr key={stream.id}>
                    <td>{stream.songName}</td>
                    <td>{stream.artist}</td>
                    <td>{stream.dateStreamed}</td>
                    <td>{stream.streamCount.toLocaleString()}</td>
                    <td>{stream.userId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;