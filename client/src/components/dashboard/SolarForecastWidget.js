import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Spinner } from 'react-bootstrap';
import './SolarForecastWidget.css';

const SolarForecastWidget = () => {
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(true);
    const [locationLoading, setLocationLoading] = useState(false); // New state for location
    const [error, setError] = useState(null);
    const [locationName, setLocationName] = useState('New Delhi'); // Default
    const [coords, setCoords] = useState({ lat: 28.6139, lon: 77.2090 }); // Default Delhi

    const getUserLocation = () => {
        setLocationLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    setCoords({ lat, lon });
                    
                    try {
                        const cityResp = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
                        const cityData = await cityResp.json();
                        setLocationName(cityData.city || cityData.locality || "My Location");
                    } catch (e) {
                        setLocationName("My Location");
                    } finally {
                        setLocationLoading(false);
                    }
                },
                (err) => {
                    console.log("Location access denied or error.", err);
                    alert("Please allow location access in your browser settings to see local data.");
                    setLocationLoading(false);
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
            setLocationLoading(false);
        }
    };

    useEffect(() => {
        // Initial load - try to get location silently once, but don't force it if it fails
        // We comment this out to let user manually click if they want, 
        // OR we can keep it but handle failures gracefully.
        // Let's rely on the manual button for clarity now if auto failed previously.
        // But for "Automatic" feel, we usually want it on mount.
        // Let's try calling it on mount, but without the alert on error.
        if (navigator.geolocation) {
             navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    setCoords({ lat, lon });
                     try {
                        const cityResp = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
                        const cityData = await cityResp.json();
                        setLocationName(cityData.city || cityData.locality || "My Location");
                    } catch (e) {}
                },
                () => { /* Ignore errors on auto-fetch */ }
             );
        }
    }, []);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                // Using Open-Meteo API with dynamic coords
                const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=auto&forecast_days=3`);
                
                if (!response.ok) {
                    throw new Error('Weather data unavailable');
                }

                const data = await response.json();
                processWeatherData(data);
            } catch (err) {
                console.error("Weather fetch error:", err);
                setError("Unable to load forecast");
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [coords]); // Run whenever coords update

    const processWeatherData = (data) => {
        if (!data.daily) return;

        const processed = data.daily.time.map((date, index) => {
            const code = data.daily.weathercode[index];
            const maxTemp = data.daily.temperature_2m_max[index];
            
            // Determine efficiency based on WMO weather codes
            let efficiency = 100;
            let icon = 'fa-sun';
            let condition = 'Sunny';
            let colorClass = 'text-warning';

            // WMO Code Interpretation
            if (code === 0) { // Clear sky
                efficiency = 100;
                condition = 'Perfect Sun';
            } else if (code >= 1 && code <= 3) { // Mainly clear, partly cloudy, overcast
                efficiency = code === 1 ? 90 : (code === 2 ? 75 : 50);
                icon = code === 1 ? 'fa-cloud-sun' : 'fa-cloud';
                condition = code === 3 ? 'Overcast' : 'Partly Cloudy';
                colorClass = code === 3 ? 'text-secondary' : 'text-info';
            } else if (code >= 45 && code <= 48) { // Fog
                efficiency = 30;
                icon = 'fa-smog';
                condition = 'Foggy';
                colorClass = 'text-secondary';
            } else if (code >= 51 && code <= 67) { // Drizzle / Rain
                efficiency = 25;
                icon = 'fa-cloud-rain';
                condition = 'Rainy';
                colorClass = 'text-primary';
            } else if (code >= 80 && code <= 99) { // Showers
                efficiency = 15;
                icon = 'fa-cloud-bolt';
                condition = 'Storms';
                colorClass = 'text-dark';
            }

            return {
                date: new Date(date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' }),
                temp: Math.round(maxTemp),
                efficiency,
                icon,
                condition,
                colorClass
            };
        });

        setForecast(processed);
    };

    if (loading) return (
        <Card className="forecast-card shadow-sm h-100 d-flex align-items-center justify-content-center p-4">
             <Spinner animation="border" variant="warning" />
             <p className="mt-2 small text-muted">Analyzing Sky...</p>
        </Card>
    );

    if (error || forecast.length === 0) return (
        <Card className="forecast-card shadow-sm h-100 p-3">
             <div className="text-center text-muted">
                <i className="fa-solid fa-satellite-dish mb-2"></i>
                <p>Forecast Offline</p>
             </div>
        </Card>
    );

    const today = forecast[0];

    return (
        <Card className="forecast-card border-0 shadow-sm h-100 overflow-hidden">
            {/* Background Decoration */}
            <div className={`weather-bg-glow ${today.condition.toLowerCase().includes('sun') ? 'sunny-glow' : 'cloudy-glow'}`}></div>

            <Card.Body className="position-relative z-1 p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold mb-0 text-dark">Solar Production</h5>
                    <button 
                        onClick={getUserLocation} 
                        className="badge bg-light text-dark border border-0 d-flex align-items-center gap-2 p-2 rounded-pill bg-hover-gray" 
                        style={{cursor: 'pointer'}}
                        disabled={locationLoading}
                    >
                        {locationLoading ? (
                            <Spinner animation="border" size="sm" variant="primary" />
                        ) : (
                            <i className="fa-solid fa-location-crosshairs text-primary"></i>
                        )}
                        <span>{locationLoading ? 'Locating...' : locationName}</span>
                    </button>
                </div>

                {/* Today's Highlight */}
                <div className="text-center py-3 mb-3 main-forecast-display">
                    <div className="efficiency-ring mb-3">
                        <i className={`fa-solid ${today.icon} display-4 ${today.colorClass} mb-2`}></i>
                        <h2 className="display-4 fw-bold mb-0">{today.efficiency}<span className="fs-4">%</span></h2>
                        <span className="text-muted text-uppercase small fw-bold">Efficiency</span>
                    </div>
                    <h5 className="fw-bold">{today.condition} &bull; {today.temp}°C</h5>
                    <div className="progress mt-3" style={{height: '8px', background: '#e9ecef'}}>
                        <div 
                            className={`progress-bar ${today.efficiency > 80 ? 'bg-success' : (today.efficiency > 50 ? 'bg-warning' : 'bg-danger')}`} 
                            role="progressbar" 
                            style={{width: `${today.efficiency}%`}}
                        ></div>
                    </div>
                    <p className="small text-muted mt-2">
                        {today.efficiency > 80 
                            ? "Excellent conditions! Maximum generation expected." 
                            : (today.efficiency > 50 ? "Moderate generation. Good time for battery charging." : "Low light. System will run on efficiency mode.")}
                    </p>
                </div>

                {/* Next Days List */}
                <div className="forecast-list border-top pt-3">
                    {forecast.slice(1).map((day, idx) => (
                        <div key={idx} className="d-flex justify-content-between align-items-center mb-2 px-2 py-1 rounded hover-bg-light">
                            <div className="d-flex align-items-center" style={{width: '80px'}}>
                                <span className="fw-bold small">{day.date}</span>
                            </div>
                            <div className="text-center flex-grow-1">
                                <i className={`fa-solid ${day.icon} ${day.colorClass}`}></i>
                                <span className="ms-2 small">{day.condition}</span>
                            </div>
                            <div className="text-end" style={{width: '60px'}}>
                                <span className={`badge ${day.efficiency > 70 ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'} border rounded-pill`}>
                                    {day.efficiency}%
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </Card.Body>
        </Card>
    );
};

export default SolarForecastWidget;
