export const kpiData = [
    { label: 'Total Revenue', value: '₪12,450', subtext: '+12% from last week', trend: 'up', color: 'text-green-500' },
    { label: 'Active Users', value: '1,204', subtext: '+54 new users', trend: 'up', color: 'text-blue-500' },
    { label: 'Listing Volume', value: '340', subtext: 'Cards for sale', trend: 'neutral', color: 'text-purple-500' },
    { label: 'Dispute Rate', value: '0.8%', subtext: 'Low risk', trend: 'down', color: 'text-green-500' }
];

export const transactions = [
    { id: '#TX-902', asset: 'Zara Gift Card', seller: 'Danny', buyer: 'Sarah', faceValue: '₪500', soldFor: '₪450', fee: '₪22.50', status: 'Completed', date: '2 mins ago' },
    { id: '#TX-903', asset: 'Fox Home Credit', seller: 'Ron', buyer: 'Mike', faceValue: '₪300', soldFor: '₪250', fee: '₪12.50', status: 'Pending', date: '15 mins ago' },
    { id: '#TX-904', asset: 'Castro Voucher', seller: 'Maya', buyer: 'Liat', faceValue: '₪200', soldFor: '₪180', fee: '₪9.00', status: 'Disputed', date: '1 hour ago' },
    { id: '#TX-905', asset: 'Steam Wallet', seller: 'Alex', buyer: 'Tom', faceValue: '₪100', soldFor: '₪85', fee: '₪4.25', status: 'Completed', date: '3 hours ago' },
    { id: '#TX-906', asset: 'PlayStation Store', seller: 'Yoni', buyer: 'Gal', faceValue: '₪250', soldFor: '₪220', fee: '₪11.00', status: 'Completed', date: '5 hours ago' },
];

export const disputes = [
    { id: 'DSP-001', user: 'Danny', issue: 'Card Empty', amount: '₪400', status: 'Open' }
];

export const revenueData = [
    { name: 'Mon', revenue: 1200 },
    { name: 'Tue', revenue: 1900 },
    { name: 'Wed', revenue: 1500 },
    { name: 'Thu', revenue: 2100 },
    { name: 'Fri', revenue: 2800 },
    { name: 'Sat', revenue: 1700 },
    { name: 'Sun', revenue: 2300 },
];
