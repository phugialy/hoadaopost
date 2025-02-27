import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import './styles/App.css';

const App = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [copyMessage, setCopyMessage] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');

    // Toggle theme between dark and light modes
    const toggleTheme = () => {
        setDarkMode((prevMode) => !prevMode);
        const newMode = darkMode ? 'light-mode' : 'dark-mode';
        document.body.className = newMode;
    };

    useEffect(() => {
        // Fetch data from the backend using the URL from .env
        const fetchData = async () => {
            try {
                const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
                const response = await fetch(`${API_URL}/api/data`);
                const result = await response.json();
                setTableData(result.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        // Set today's date
        const today = new Date();
        setCurrentDate(today.toISOString().split('T')[0]);

        // Update current time dynamically
        const updateCurrentTime = () => {
            const now = new Date();
            const time = `${String(now.getHours()).padStart(2, '0')}:${String(
                now.getMinutes()
            ).padStart(2, '0')}`;
            setCurrentTime(time);
        };

        updateCurrentTime(); // Initial time update
        const interval = setInterval(updateCurrentTime, 1000);

        // Cleanup function
        return () => {
            clearInterval(interval);
        };
    }, []);

    // Handle copying text to clipboard
    const handleCopy = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopyMessage(`Copied: ${text}`);
            setTimeout(() => setCopyMessage(''), 2000);
        });
    };

    // Group table rows by date
    const groupRowsByDate = (rows) => {
        const groupedRows = [];
        let lastDate = null;

        rows.forEach((row) => {
            const [date, ...rest] = row;

            if (date !== lastDate) {
                groupedRows.push({ date, data: [rest] });
                lastDate = date;
            } else {
                const lastGroup = groupedRows[groupedRows.length - 1];
                lastGroup.data.push(rest);
            }
        });

        return groupedRows;
    };

    // Check if a row is active based on the current time and date
    const isRowActive = (date, time) => {
        if (date !== currentDate) return false;
        const [hour, minute] = time.split(':').map(Number);
        const [currentHour, currentMinute] = currentTime.split(':').map(Number);
        const eventStart = hour * 60 + minute;
        const current = currentHour * 60 + currentMinute;

        return current >= eventStart && current < eventStart + 60;
    };

    // Group data for the table
    const groupedData = tableData.length > 1 ? groupRowsByDate(tableData.slice(1)) : [];

    return (
        <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
            <Header darkMode={darkMode} toggleTheme={toggleTheme} />
            <main>
                <p>Welcome to the official website of HOA DAO LION DANCE 2025.</p>
                {copyMessage && <div className="copy-toast">{copyMessage}</div>}
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                {tableData[0]?.map((header, index) => (
                                    <th key={index}>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {groupedData.map((group, groupIndex) =>
                                group.data.map((row, rowIndex) => {
                                    const date = group.date;
                                    const time = row[0];
                                    const isActive = isRowActive(date, time);
                                    const rowClass = isActive ? 'highlight-row' : '';

                                    return (
                                        <tr key={`${groupIndex}-${rowIndex}`} className={rowClass}>
                                            {rowIndex === 0 && (
                                                <td
                                                    rowSpan={group.data.length}
                                                    className={
                                                        !isActive && date === currentDate
                                                            ? 'highlight-date-cell'
                                                            : ''
                                                    }
                                                >
                                                    {group.date}
                                                </td>
                                            )}
                                            {row.map((cell, cellIndex) => {
                                                if (cellIndex === 2) {
                                                    return (
                                                        <td
                                                            key={cellIndex}
                                                            className="copyable-cell"
                                                            onClick={() => handleCopy(cell)}
                                                            title="Click to copy address"
                                                        >
                                                            {cell}
                                                        </td>
                                                    );
                                                }
                                                if (cellIndex === row.length - 1) {
                                                    return (
                                                        <td key={cellIndex}>
                                                            <button
                                                                className="nav-button"
                                                                onClick={() =>
                                                                    window.open(
                                                                        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                                                            row[2]
                                                                        )}`,
                                                                        '_blank'
                                                                    )
                                                                }
                                                            >
                                                                Navigate
                                                            </button>
                                                        </td>
                                                    );
                                                }
                                                return <td key={cellIndex}>{cell}</td>;
                                            })}
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default App;
