export const getDaysRemaining = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

export const getExpiryStatus = (days) => {
    if (days < 0) return 'expired';
    if (days <= 3) return 'critical';
    if (days <= 7) return 'warning';
    return 'safe';
};
