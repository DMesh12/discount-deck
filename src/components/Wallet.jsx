import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import AssetCard from './AssetCard';

import { stores } from '../data';

const WalletScreen = ({ assets, location, onSendGift }) => {
    const [filter, setFilter] = useState('all'); // all, giftCard, coupon
    const [search, setSearch] = useState('');

    const filteredAssets = assets.filter(asset => {
        const matchesType = filter === 'all' || asset.type === filter;
        const matchesSearch = asset.storeName.toLowerCase().includes(search.toLowerCase());

        // Location Filter
        let matchesLocation = true;
        if (location) {
            const store = stores.find(s => s.id === asset.storeId);
            matchesLocation = store?.locations?.includes(location);
        }

        return matchesType && matchesSearch && matchesLocation;
    });

    return (
        <div className="p-6 h-full flex flex-col">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">My Wallet</h1>

            {/* Search Bar */}
            <div className="relative mb-6">
                <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Search cards..."
                    className="w-full bg-white rounded-xl py-3 pl-12 pr-4 shadow-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Filters */}
            <div className="flex gap-2 mb-6 overflow-x-auto hide-scrollbar">
                <FilterChip label="All" active={filter === 'all'} onClick={() => setFilter('all')} />
                <FilterChip label="Gift Cards" active={filter === 'giftCard'} onClick={() => setFilter('giftCard')} />
                <FilterChip label="Coupons" active={filter === 'coupon'} onClick={() => setFilter('coupon')} />
                <FilterChip label="Memberships" active={filter === 'membership'} onClick={() => setFilter('membership')} />
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto hide-scrollbar pb-20">
                {filteredAssets.length > 0 ? filteredAssets.map(asset => (
                    <AssetCard key={asset.id} asset={asset} onSendGift={onSendGift} />
                )) : (
                    <div className="text-center py-20 text-gray-400">
                        <p>No assets found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const FilterChip = ({ label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${active ? 'bg-black text-white' : 'bg-white text-gray-600 border border-gray-100'
            }`}
    >
        {label}
    </button>
);

export default WalletScreen;
