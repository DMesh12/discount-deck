import React, { useState } from 'react';
import { Scan, MapPin, Clock, Bell, AlertTriangle, X } from 'lucide-react';
import AssetCard from './AssetCard';
import SavingsAnalytics from './SavingsAnalytics';
import { getDaysRemaining } from '../utils';

const Dashboard = ({ assets, onOpenMarket, onSimulatePOS, onSendGift }) => {
    const [showNotifications, setShowNotifications] = useState(false);

    const totalBalance = assets.reduce((sum, item) => sum + (item.type === 'giftCard' ? item.value : 0), 0);

    // Filter urgent items (< 7 days)
    const urgentAssets = assets.filter(a => {
        const days = getDaysRemaining(a.expiry);
        return days <= 7 && days >= 0;
    });

    const urgentValue = urgentAssets.reduce((sum, item) => sum + (item.type === 'giftCard' ? item.value : 0), 0);
    const hasNotifications = urgentAssets.length > 0;

    return (
        <div className="p-6 relative">
            {/* Notifications Modal Overlay */}
            {showNotifications && (
                <div className="absolute top-16 right-6 z-50 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 animate-in fade-in slide-in-from-top-2">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-gray-900">Notifications</h3>
                        <button onClick={() => setShowNotifications(false)}><X size={16} /></button>
                    </div>
                    {hasNotifications ? (
                        <div className="flex flex-col gap-3">
                            {urgentAssets.map(asset => (
                                <div key={asset.id} className="flex gap-3 items-start border-b border-gray-50 pb-2 last:border-0">
                                    <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0"></div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">{asset.storeName}</p>
                                        <p className="text-xs text-red-500">Expires in {getDaysRemaining(asset.expiry)} days</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">No new alerts.</p>
                    )}
                </div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Discount Deck</h1>
                    <p className="text-gray-500 text-sm">Welcome back, Daniel</p>
                </div>
                <div className="flex gap-3">
                    <button
                        className="w-10 h-10 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-600 relative"
                        onClick={() => setShowNotifications(!showNotifications)}
                    >
                        <Bell size={20} />
                        {hasNotifications && (
                            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                        )}
                    </button>
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                        D
                    </div>
                </div>
            </div>

            {/* Critical Alert Banner */}
            {urgentValue > 0 && (
                <div className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-6 flex items-start gap-3">
                    <div className="bg-red-100 p-2 rounded-full text-red-600">
                        <AlertTriangle size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-red-700 text-sm">Action Required</h3>
                        <p className="text-xs text-red-600 mt-1">
                            You have <span className="font-bold">₪{urgentValue}</span> at risk of expiring within 7 days. Use them now!
                        </p>
                    </div>
                </div>
            )}

            {/* Total Balance Card */}
            <div className="bg-gradient-to-r from-primary to-purple-800 rounded-3xl p-6 text-white shadow-xl shadow-purple-200 mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10"></div>
                <p className="text-purple-200 text-sm font-medium mb-1">Total Savings Potential</p>
                <h2 className="text-4xl font-bold tracking-tight">₪{totalBalance.toLocaleString()}</h2>
                <div className="mt-6 flex gap-3">
                    <button className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/30 transition">
                        Add Money
                    </button>
                    <button className="bg-white text-primary px-4 py-2 rounded-xl text-sm font-bold shadow-sm" onClick={onOpenMarket}>
                        Marketplace
                    </button>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-0">
                <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
                    <QuickAction icon={Scan} label="Scan New" />
                    <QuickAction icon={MapPin} label="Nearby" />
                    <QuickAction icon={Clock} label="Expiring" />
                </div>
            </div>

            {/* Analytics */}
            <SavingsAnalytics />

            {/* Recent Assets */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900">Recent Assets</h3>
                    <button className="text-primary text-sm font-medium" onClick={onSimulatePOS}>Simulate POS</button>
                </div>
                <div className="flex flex-col gap-1">
                    {assets.slice(0, 3).map(asset => (
                        <AssetCard key={asset.id} asset={asset} onSendGift={onSendGift} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const QuickAction = ({ icon: Icon, label }) => (
    <button className="flex flex-col items-center gap-2 min-w-[72px]">
        <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-gray-700">
            <Icon size={24} />
        </div>
        <span className="text-xs font-medium text-gray-600">{label}</span>
    </button>
);

export default Dashboard;
