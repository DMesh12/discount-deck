import React, { useState } from 'react';
import { initialListings } from '../data';
import SellAsset from './SellAsset';
import LegalFooter from './LegalFooter';
import AssetCard from './AssetCard';

const Marketplace = ({ userAssets, onSell }) => {
    const [mode, setMode] = useState('buy'); // buy, sell
    const [selectedAssetToSell, setSelectedAssetToSell] = useState(null);

    if (selectedAssetToSell) {
        return <SellAsset asset={selectedAssetToSell} onBack={() => setSelectedAssetToSell(null)} />;
    }

    const sellableAssets = userAssets.filter(a => a.value > 0);

    return (
        <div className="p-6 h-full flex flex-col">
            <div className="flex bg-white p-1 rounded-xl shadow-sm mb-6">
                <TabButton label="Buy Cards" active={mode === 'buy'} onClick={() => setMode('buy')} />
                <TabButton label="Sell Assets" active={mode === 'sell'} onClick={() => setMode('sell')} />
            </div>

            {mode === 'buy' ? (
                <div className="flex-1 overflow-y-auto hide-scrollbar">
                    <h2 className="font-bold text-gray-900 mb-4">Featured Deals</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {initialListings.map(listing => (
                            <ListingCard key={listing.id} listing={listing} />
                        ))}
                        {/* Mock more items */}
                        <ListingCard listing={{ storeName: 'Nike', faceValue: 300, buyerPrice: 260, discount: 13, color: 'bg-black' }} />
                        <ListingCard listing={{ storeName: 'Castro', faceValue: 200, buyerPrice: 180, discount: 10, color: 'bg-red-600' }} />
                    </div>
                    <LegalFooter />
                </div>
            ) : (
                <div className="flex-1 overflow-y-auto hide-scrollbar">
                    <h2 className="font-bold text-gray-900 mb-2">Select to Sell</h2>
                    <p className="text-sm text-gray-500 mb-6">Turn your unused gift cards into cash.</p>
                    {sellableAssets.map(asset => (
                        <AssetCard key={asset.id} asset={asset} onClick={() => setSelectedAssetToSell(asset)} />
                    ))}
                </div>
            )}
        </div>
    );
};

const TabButton = ({ label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${active ? 'bg-primary text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
    >
        {label}
    </button>
);

const ListingCard = ({ listing }) => (
    <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col items-center text-center">
        <div className={`w-12 h-12 rounded-full ${listing.color || 'bg-gray-200'} mb-3 flex items-center justify-center text-white font-bold`}>
            {listing.storeName[0]}
        </div>
        <div className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-md mb-2">
            {listing.discount}% OFF
        </div>
        <h3 className="font-bold text-gray-900">{listing.storeName}</h3>
        <p className="text-xs text-gray-400 line-through">₪{listing.faceValue}</p>
        <p className="text-xl font-bold text-primary">₪{listing.buyerPrice}</p>
        <button className="w-full mt-3 bg-gray-900 text-white py-2 rounded-lg text-sm font-bold active:scale-95 transition">
            Buy Now
        </button>
    </div>
);

export default Marketplace;
