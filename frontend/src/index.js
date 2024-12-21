import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Function to handle and log performance metrics
const logPerformanceMetrics = (metric) => {
  console.log(metric); // Logs metrics to the console
  // You can send this data to an analytics endpoint if required
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Call reportWebVitals and pass the logPerformanceMetrics function
reportWebVitals(logPerformanceMetrics);
