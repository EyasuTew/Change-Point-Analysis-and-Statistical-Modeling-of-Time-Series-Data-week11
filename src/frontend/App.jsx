import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';

const API_BASE = 'http://localhost:5000/api';

function App() {
  const [prices, setPrices] = useState([]);
  const [events, setEvents] = useState([]);
  const [changePoints, setChangePoints] = useState([]);
  const [startDate, setStartDate] = useState('2014-01-01');
  const [endDate, setEndDate] = useState('2022-09-30');
  const [highlightedEvent, setHighlightedEvent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pRes, eRes, cpRes] = await Promise.all([
          axios.get(`${API_BASE}/prices?start=${startDate}&end=${endDate}`),
          axios.get(`${API_BASE}/events`),
          axios.get(`${API_BASE}/change-points`)
        ]);
        setPrices(pRes.data);
        setEvents(eRes.data);
        setChangePoints(cpRes.data);
      } catch (err) {
        console.error("API error:", err);
      }
    };
    fetchData();
  }, [startDate, endDate]);

  const chartData = prices.dates?.map((d, i) => ({
    date: d,
    price: prices.prices[i],
    event: events.find(e => e.Date === d)?.Event_Description || null
  })) || [];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
      return (
        <div style={{ background: '#fff', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
          <p><strong>{format(parseISO(label), 'MMM dd, yyyy')}</strong></p>
          <p>Price: ${payload[0].value.toFixed(2)}</p>
          {payload[0].payload.event && <p>Event: {payload[0].payload.event}</p>}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Brent Oil Price Dashboard</h1>

      {/* Date Range Filter */}
      <div style={{ marginBottom: '20px' }}>
        <label>Start: <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} /></label>
        <span>   </span>
        <label>End: <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} /></label>
      </div>

      {/* Main Chart */}
      <div style={{ height: '500px', marginBottom: '40px' }}>
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(tick) => format(parseISO(tick), 'MMM yy')}
              interval="preserveStartEnd"
            />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />

            {/* Event Markers / Highlights */}
            {events.map((ev, i) => {
              const isHighlighted = highlightedEvent === ev.Date;
              if (!chartData.some(d => d.date === ev.Date)) return null;
              return (
                <ReferenceLine 
                  key={i}
                  x={ev.Date}
                  stroke={isHighlighted ? "#ff7300" : "#82ca9d"}
                  strokeWidth={isHighlighted ? 3 : 1.5}
                  strokeDasharray="3 3"
                  label={{ value: ev.Event_Description.slice(0,15)+'...', position: 'top', fill: isHighlighted ? "#ff7300" : "#82ca9d" }}
                  onClick={() => setHighlightedEvent(isHighlighted ? null : ev.Date)}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Event List */}
      <h2>Key Events (click to highlight)</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {events.map((ev, i) => (
          <li 
            key={i}
            onClick={() => setHighlightedEvent(ev.Date)}
            style={{
              cursor: 'pointer',
              padding: '8px',
              background: highlightedEvent === ev.Date ? '#fff3cd' : 'transparent',
              marginBottom: '4px',
              borderLeft: '4px solid #82ca9d'
            }}
          >
            <strong>{ev.Date}</strong>: {ev.Event_Description} ({ev.Expected_Impact})
          </li>
        ))}
      </ul>

      {/* Change Point Insights */}
      <h2>Detected Change Points</h2>
      <ul>
        {changePoints.map((cp, i) => (
          <li key={i}>
            <strong>{cp.date}</strong>: {cp.description}<br />
            Mean shift: {cp.mean_before.toFixed(4)} → {cp.mean_after.toFixed(4)}<br />
            Prob. increase: {(cp.prob_increase * 100).toFixed(1)}%
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;