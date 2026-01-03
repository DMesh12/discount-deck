import React from 'react';
import { Link } from 'react-router-dom';

const LegalFooter = () => {
    return (
        <div className="mt-8 p-4 bg-gray-50 text-xs text-gray-400 text-center border-t border-gray-100">
            <p className="mb-2">DISCLAIMER: Discount Deck is a financial aggregator tool.</p>
            <p>
                We do not issue these cards. "Liquidity Exchange" is a peer-to-peer service.
                Commission rates may vary. Use at your own risk.
            </p>
            <div className="mt-4">
                <Link to="/admin" className="text-gray-300 hover:text-gray-500 transition-colors">
                    Admin Login
                </Link>
            </div>
        </div>
    );
};

export default LegalFooter;
