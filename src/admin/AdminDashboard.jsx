import React from 'react';
import { LayoutDashboard, Users, CreditCard, AlertTriangle, LogOut, Settings } from 'lucide-react';
import KPICards from './components/KPICards';
import TransactionsTable from './components/TransactionsTable';
import DisputeResolution from './components/DisputeResolution';
import RevenueChart from './components/RevenueChart';
import { kpiData, transactions, disputes, revenueData } from './data';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className="flex h-screen bg-gray-900 text-gray-100 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
                <div className="p-6">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                        GOD MODE
                    </h1>
                    <p className="text-gray-500 text-xs tracking-widest mt-1">ADMIN DASHBOARD</p>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    <SidebarItem icon={LayoutDashboard} label="Dashboard" active />
                    <SidebarItem icon={Users} label="Users" />
                    <SidebarItem icon={CreditCard} label="Transactions" />
                    <SidebarItem icon={AlertTriangle} label="Disputes" badge="1" />
                    <SidebarItem icon={Settings} label="Settings" />
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <Link to="/" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors p-3 rounded-xl hover:bg-gray-800">
                        <LogOut size={20} />
                        <span className="font-medium">Exit God Mode</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-gray-900 p-8">
                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Platform Overview</h2>
                        <p className="text-gray-400">Welcome back, Boss.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-green-400 to-blue-500 p-0.5">
                            <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center text-xs font-bold">
                                GM
                            </div>
                        </div>
                    </div>
                </header>

                {/* KPI Cards */}
                <KPICards data={kpiData} />

                {/* Grid Layout for Charts & Tables */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    {/* Revenue Chart - Spans 2 cols */}
                    <div className="lg:col-span-2">
                        <RevenueChart data={revenueData} />
                    </div>
                    {/* Dispute Resolution - Spans 1 col */}
                    <div>
                        <DisputeResolution disputes={disputes} />
                    </div>
                </div>

                {/* Transactions Table - Spans full width */}
                <TransactionsTable transactions={transactions} />
            </main>
        </div>
    );
};

const SidebarItem = ({ icon: Icon, label, active, badge }) => (
    <button className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${active ? 'bg-gray-800 text-green-400' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
        <div className="flex items-center gap-3">
            <Icon size={20} className={active ? 'text-green-400' : ''} />
            <span className="font-medium">{label}</span>
        </div>
        {badge && (
            <span className="bg-red-500/20 text-red-500 text-xs font-bold px-2 py-0.5 rounded-full border border-red-500/30">
                {badge}
            </span>
        )}
    </button>
);

export default AdminDashboard;
