import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, ArrowUpRight } from 'lucide-react';

const data = [
    { name: 'Aug', saved: 150 },
    { name: 'Sep', saved: 230 },
    { name: 'Oct', saved: 180 },
    { name: 'Nov', saved: 320 },
    { name: 'Dec', saved: 290 },
    { name: 'Jan', saved: 450 },
];

const SavingsAnalytics = () => {
    // Determine max value for dynamic coloring if needed, or just use a nice gradient
    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-8">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-gray-500 font-medium mb-1">My Savings</h3>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-gray-900 tracking-tight">₪1,620</span>
                        <span className="flex items-center text-emerald-600 text-sm font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                            <TrendingUp size={14} className="mr-1" />
                            +12%
                        </span>
                    </div>
                </div>
                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                    <ArrowUpRight size={20} />
                </div>
            </div>

            <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#9CA3AF', fontWeight: 500 }}
                            dy={10}
                        />
                        <Tooltip
                            cursor={{ fill: '#F3F4F6', radius: 4 }}
                            contentStyle={{
                                borderRadius: '12px',
                                border: 'none',
                                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                                padding: '8px 12px',
                                backgroundColor: '#1F2937',
                                color: 'white'
                            }}
                            itemStyle={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}
                            labelStyle={{ display: 'none' }}
                            formatter={(value) => [`₪${value}`, 'Saved']}
                        />
                        <Bar
                            dataKey="saved"
                            radius={[6, 6, 6, 6]}
                            barSize={32}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index === data.length - 1 ? '#6750A4' : '#E5E7EB'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between text-xs text-gray-500">
                <span>Last 6 Months</span>
                <span className="font-semibold text-primary">View Report</span>
            </div>
        </div>
    );
};

export default SavingsAnalytics;
