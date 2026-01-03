import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MobileApp from './components/MobileApp';
import AdminDashboard from './admin/AdminDashboard';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MobileApp />} />
                <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
