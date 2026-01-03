import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const RevenueChart = ({ data }) => {
    return (
        <div className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700 h-full">
            <h2 className="text-xl font-bold text-white mb-6">Revenue Growth</h2>
            <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                        <XAxis
                            dataKey="name"
                            stroke="#9CA3AF"
                            tick={{ fill: '#9CA3AF', fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            stroke="#9CA3AF"
                            tick={{ fill: '#9CA3AF', fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(value) => `₪${value}`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1F2937',
                                border: '1px solid #374151',
                                borderRadius: '8px',
                                color: '#fff'
                            }}
                            itemStyle={{ color: '#34D399' }}
                            formatter={(value) => [`₪${value}`, 'Revenue']}
                        />
                        <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#34D399"
                            strokeWidth={3}
                            dot={{ r: 4, fill: '#34D399', strokeWidth: 0 }}
                            activeDot={{ r: 6, fill: '#10B981' }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default RevenueChart;
