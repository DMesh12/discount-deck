import React, { useState } from 'react';
import { LayoutDashboard, Wallet, ShoppingBag, Scan, User } from 'lucide-react';
import Dashboard from './Dashboard';
import WalletScreen from './Wallet';
import Marketplace from './Marketplace';
import Optimizer from './Optimizer';
import Profile from './Profile';
import { initialAssets, stores } from '../data';
import LocationSimulator from './LocationSimulator';

function MobileApp() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [selectedStore, setSelectedStore] = useState(null); // For Optimizer Trigger
    const [assets, setAssets] = useState(initialAssets);
    const [location, setLocation] = useState(null);
    const [toast, setToast] = useState(null);

    // Location Handler
    const handleLocationChange = (newLocation) => {
        setLocation(newLocation);
        if (newLocation) {
            const relevantStores = stores.filter(s => s.locations?.includes(newLocation));
            const count = assets.filter(a => relevantStores.some(s => s.id === a.storeId)).length;
            setToast({ message: `📍 You are at ${newLocation}! ${count} Relevant coupons found.`, type: 'info' });
        } else {
            setToast({ message: `Location reset. Showing all assets.`, type: 'info' });
        }
        setTimeout(() => setToast(null), 3000);
    };

    const handleSendGift = (assetId, friendName) => {
        setAssets(prev => prev.filter(a => a.id !== assetId));
        setToast({ message: `🎁 Gift link generated & sent to ${friendName}!`, type: 'success' });
        setTimeout(() => setToast(null), 3000);
    };

    // Navigation Handler
    const renderContent = () => {
        if (selectedStore) {
            return (
                <Optimizer
                    store={selectedStore}
                    userAssets={assets}
                    onClose={() => setSelectedStore(null)}
                />
            );
        }

        switch (activeTab) {
            case 'dashboard':
                return <Dashboard
                    assets={assets}
                    onOpenMarket={() => setActiveTab('market')}
                    onSimulatePOS={() => setSelectedStore(stores.find(s => s.name === 'Super-Pharm'))}
                    onSendGift={handleSendGift}
                />;
            case 'wallet':
                return <WalletScreen assets={assets} location={location} onSendGift={handleSendGift} />;
            case 'market':
                return <Marketplace
                    userAssets={assets}
                    onSell={(asset) => console.log('Selling', asset)}
                />;
            case 'scan':
                return (
                    <div className="h-full bg-black relative flex flex-col">
                        {/* Mock Camera View */}
                        <div className="flex-1 relative overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=600&auto=format&fit=crop"
                                className="w-full h-full object-cover opacity-60"
                                alt="Camera Feed"
                            />

                            {/* Overlay UI */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                                <div className="w-64 h-64 border-2 border-white/50 rounded-3xl relative">
                                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-xl"></div>
                                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-xl"></div>
                                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-xl"></div>
                                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-xl"></div>

                                    {/* Scanning Animation Line */}
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.8)] animate-[scan_2s_ease-in-out_infinite]"></div>
                                </div>
                                <p className="text-white mt-8 font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-md">
                                    Point camera at a barcode
                                </p>
                            </div>
                        </div>

                        {/* Camera Controls */}
                        <div className="h-32 bg-black flex items-center justify-around px-8 pb-8">
                            <button className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-white">
                                <Scan size={20} />
                            </button>
                            <div className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center">
                                <div className="w-16 h-16 bg-white rounded-full"></div>
                            </div>
                            <button className="text-white font-medium" onClick={() => setActiveTab('dashboard')}>Cancel</button>
                        </div>
                    </div>
                );
            case 'profile':
                return <Profile />;
            default:
                return <div className="p-8 text-center text-gray-500">Coming Soon</div>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
            {/* Phone Container */}
            <div className="w-full max-w-[480px] h-[850px] bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-gray-900 relative flex flex-col">

                {/* Status Bar Mock */}
                <div className="h-8 bg-gray-900 flex justify-between items-center px-6 text-white text-xs font-bold">
                    <span>9:41</span>
                    <div className="flex gap-1">
                        <div className="w-4 h-4 rounded-full bg-green-500"></div>
                        <div className="w-4 h-4 rounded-full border border-white"></div>
                    </div>
                </div>

                {/* Toast Notification */}
                {toast && (
                    <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 w-[90%] bg-gray-900/90 backdrop-blur text-white px-4 py-3 rounded-2xl shadow-xl animate-in slide-in-from-top-5 fade-in duration-300 flex items-center justify-center text-sm font-medium">
                        {toast.message}
                    </div>
                )}

                {/* Dynamic Content */}
                <div className="flex-1 overflow-y-auto hide-scrollbar bg-gray-50 relative">
                    {renderContent()}
                    <LocationSimulator currentLocation={location} onLocationChange={handleLocationChange} />
                </div>

                {/* Bottom Navigation */}
                {!selectedStore && activeTab !== 'scan' && (
                    <div className="h-20 bg-white border-t border-gray-100 flex justify-around items-center px-2">
                        <NavItem
                            icon={LayoutDashboard}
                            label="Home"
                            active={activeTab === 'dashboard'}
                            onClick={() => setActiveTab('dashboard')}
                        />
                        <NavItem
                            icon={Wallet}
                            label="Wallet"
                            active={activeTab === 'wallet'}
                            onClick={() => setActiveTab('wallet')}
                        />
                        <div className="relative -top-6">
                            <button className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-purple-200"
                                onClick={() => setActiveTab('scan')}
                            >
                                <Scan size={24} />
                            </button>
                        </div>
                        <NavItem
                            icon={ShoppingBag}
                            label="Market"
                            active={activeTab === 'market'}
                            onClick={() => setActiveTab('market')}
                        />
                        <NavItem
                            icon={User}
                            label="Profile"
                            active={activeTab === 'profile'}
                            onClick={() => setActiveTab('profile')}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

const NavItem = ({ icon: Icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`flex flex-col items-center justify-center w-16 gap-1 ${active ? 'text-primary' : 'text-gray-400'}`}
    >
        <Icon size={24} strokeWidth={active ? 2.5 : 2} />
        <span className="text-[10px] font-medium">{label}</span>
    </button>
);

export default MobileApp;
