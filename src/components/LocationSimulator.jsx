import React, { useState } from 'react';
import { MapPin, Navigation, RefreshCw } from 'lucide-react';

const LocationSimulator = ({ currentLocation, onLocationChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const locations = [
        { id: 'azrieli', name: 'Azrieli Mall' },
        { id: 'sarona', name: 'Sarona Market' },
        { id: 'home', name: 'Home' }
    ];

    const handleSelect = (locName) => {
        onLocationChange(locName);
        setIsOpen(false);
    };

    return (
        <div className="absolute bottom-6 right-6 z-50 flex flex-col items-end gap-2">
            {isOpen && (
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2 mb-2 w-48 animate-in slide-in-from-bottom-5 fade-in duration-200">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2 pt-1">Simulate Location</div>
                    <div className="flex flex-col gap-1">
                        {locations.map(loc => (
                            <button
                                key={loc.id}
                                onClick={() => handleSelect(loc.name)}
                                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${currentLocation === loc.name ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50 text-gray-700'}`}
                            >
                                <MapPin size={16} />
                                {loc.name}
                            </button>
                        ))}
                        <div className="h-px bg-gray-100 my-1"></div>
                        <button
                            onClick={() => handleSelect(null)}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                        >
                            <RefreshCw size={16} />
                            Reset Location
                        </button>
                    </div>
                </div>
            )}

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`h-14 w-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-gray-900 text-white rotate-45' : 'bg-white text-primary hover:scale-105'}`}
            >
                {isOpen ? (
                    <span className="text-2xl font-light">+</span> // Using plus for close (rotated)
                ) : (
                    <Navigation size={24} fill="currentColor" className="text-primary" />
                )}
            </button>
        </div>
    );
};

export default LocationSimulator;
