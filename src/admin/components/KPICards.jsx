import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const KPICard = ({ label, value, subtext, trend, color }) => {
    const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
    // Map text color class to border/bg colors for consistency
    const borderColor = color.includes('green') ? 'border-green-500' : color.includes('blue') ? 'border-blue-500' : color.includes('purple') ? 'border-purple-500' : 'border-gray-500';

    return (
        <div className={`bg-gray-800 p-6 rounded-2xl border-l-4 ${borderColor} shadow-lg`}>
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">{label}</h3>
                    <p className={`text-3xl font-bold text-white mt-1`}>{value}</p>
                </div>
                <div className={`p-2 rounded-lg bg-gray-700/50 ${color}`}>
                    <TrendIcon size={24} />
                </div>
            </div>
            <p className="text-gray-500 text-xs mt-4 font-medium flex items-center gap-1">
                <span className={color}>{subtext}</span>
            </p>
        </div>
    );
};

const KPICards = ({ data }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {data.map((item, index) => (
                <KPICard key={index} {...item} />
            ))}
        </div>
    );
};

export default KPICards;
