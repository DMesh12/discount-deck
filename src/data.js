import { Wallet, Store, Tag, CircleDollarSign } from 'lucide-react';

// Helper to get future date string YYYY-MM-DD
const getDateDetails = (days) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
};

export const stores = [
    { id: '1', name: 'Zara', logo: 'https://logo.clearbit.com/zara.com', category: 'Fashion', locations: ['Azrieli Mall', 'Ramat Aviv Mall'] },
    { id: '2', name: 'Super-Pharm', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/55/Super-Pharm_Logo.svg/1200px-Super-Pharm_Logo.svg.png', category: 'Health', locations: ['Azrieli Mall', 'Sarona Market', 'Home'] },
    { id: '3', name: 'Aroma', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Aroma_Espresso_Bar_logo.svg/2560px-Aroma_Espresso_Bar_logo.svg.png', category: 'Food', locations: ['Azrieli Mall', 'Sarona Market'] },
];

export const initialAssets = [
    {
        id: '101',
        storeId: '1',
        storeName: 'Zara',
        type: 'giftCard',
        value: 300,
        expiry: getDateDetails(60), // Safe
        barcode: 'ZARA-1234',
        terms: 'Valid at all locations',
        color: 'bg-zinc-900', // Black
        textColor: 'text-white'
    },
    {
        id: '102',
        storeId: '2',
        storeName: 'Super-Pharm',
        type: 'membership',
        value: 0,
        expiry: getDateDetails(700), // Safe
        barcode: 'SP-999',
        terms: '15% Off Brand',
        color: 'bg-blue-700', // Blue
        textColor: 'text-white'
    },
    {
        id: '103',
        storeId: '3',
        storeName: 'Aroma',
        type: 'coupon',
        value: 15,
        expiry: getDateDetails(1), // Critical (Tomorrow)
        barcode: 'FREE-COFFEE',
        terms: 'Free Coffee',
        color: 'bg-red-700', // Red
        textColor: 'text-white'
    },
    // Super-Pharm Optimization Scenario assets
    {
        id: '201',
        storeId: '2',
        storeName: 'Super-Pharm',
        type: 'giftCard',
        value: 100,
        expiry: getDateDetails(90), // Safe
        barcode: 'SP-GIFT-100',
        terms: 'Store Credit',
        color: 'bg-blue-700',
        textColor: 'text-white'
    },
    {
        id: '202',
        storeId: '2',
        storeName: 'Super-Pharm',
        type: 'coupon',
        value: 0,
        expiry: getDateDetails(5), // Warning (5 days)
        barcode: 'SP-COUPON-15',
        terms: '15% Off Shampoo',
        color: 'bg-blue-700',
        textColor: 'text-white'
    },
];

export const initialListings = [
    {
        id: 'L1',
        storeName: 'Fox Home',
        faceValue: 500,
        buyerPrice: 450,
        discount: 10,
        color: 'bg-orange-500'
    }
];
