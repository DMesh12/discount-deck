import React, { useState } from 'react';
import { Gift, Percent, Award, ArrowUpRight, AlertTriangle, Clock, Send, X } from 'lucide-react';
import { getDaysRemaining, getExpiryStatus } from '../utils';

const AssetCard = ({ asset, onClick, onLongPress, onSendGift }) => {
    const daysLeft = getDaysRemaining(asset.expiry);
    const status = getExpiryStatus(daysLeft);
    const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
    const [friendName, setFriendName] = useState('');
    const [note, setNote] = useState('');

    const handleSend = (e) => {
        e.stopPropagation();
        if (!friendName) return;
        onSendGift(asset.id, friendName, note);
        setIsGiftModalOpen(false);
    };

    // Determine gradient/color
    const getGradient = (type) => {
        switch (type) {
            case 'giftCard': return 'bg-gradient-to-br from-emerald-500 to-emerald-700'; // Green for money
            case 'membership': return 'bg-gradient-to-br from-yellow-400 to-yellow-600'; // Gold
            case 'coupon': return 'bg-gradient-to-br from-orange-500 to-red-600'; // Red
            default: return 'bg-gray-800';
        }
    };

    const Icon = asset.type === 'giftCard' ? Gift : asset.type === 'coupon' ? Percent : Award;

    const renderBadge = () => {
        if (status === 'critical') {
            return (
                <div className="flex items-center gap-1 bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-[10px] font-bold">
                    <AlertTriangle size={10} />
                    ⚠️ Expires in {daysLeft} days!
                </div>
            );
        }
        if (status === 'warning') {
            return (
                <div className="flex items-center gap-1 bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-[10px] font-bold">
                    <Clock size={10} />
                    Expiring soon ({daysLeft} days)
                </div>
            );
        }
        if (status === 'expired') {
            return (
                <div className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full text-[10px] font-bold line-through">
                    Expired
                </div>
            );
        }
        // Safe
        return (
            <span className="text-xs text-gray-400">Valid until {asset.expiry}</span>
        );
    };

    return (
        <>
            <div
                className="bg-white rounded-2xl p-0.5 shadow-sm mb-3 cursor-pointer transition-transform active:scale-95 group relative"
                onClick={onClick}
                onContextMenu={(e) => { e.preventDefault(); onLongPress && onLongPress(); }}
            >
                <div className={`flex h-24 rounded-2xl overflow-hidden bg-white ${status === 'expired' ? 'opacity-60 grayscale' : ''}`}>
                    {/* Left Side: Color/Logo */}
                    <div className={`w-24 ${getGradient(asset.type)} p-4 flex items-center justify-center text-white relative`}>
                        <div className="text-4xl font-bold opacity-20">{asset.storeName[0]}</div>
                        <Icon className="absolute text-white" size={32} />
                    </div>

                    {/* Right Side: Details */}
                    <div className="flex-1 p-4 flex flex-col justify-between relative">
                        <div>
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-gray-800">{asset.storeName}</h3>
                                {status === 'critical' || status === 'warning' ? (
                                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                                ) : null}
                            </div>
                            <p className="text-sm text-gray-500">{asset.type === 'giftCard' ? `Value: ₪${asset.value}` : asset.terms}</p>
                        </div>

                        <div className="flex justify-between items-end">
                            {renderBadge()}

                            {/* Actions Row */}
                            <div className="flex gap-2">
                                {onSendGift && (
                                    <button
                                        className="p-1.5 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
                                        onClick={(e) => { e.stopPropagation(); setIsGiftModalOpen(true); }}
                                    >
                                        <Send size={14} />
                                    </button>
                                )}
                                {status !== 'expired' && (
                                    <ArrowUpRight size={16} className="text-gray-300" />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gift Modal */}
            {isGiftModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white rounded-3xl p-6 w-full max-w-xs shadow-2xl scale-100 animate-in zoom-in-95" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-900">Send Gift</h3>
                            <button onClick={() => setIsGiftModalOpen(false)} className="p-1 bg-gray-100 rounded-full"><X size={16} /></button>
                        </div>

                        <div className="flex items-center gap-3 mb-6 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className={`w-10 h-10 ${getGradient(asset.type)} rounded-full flex items-center justify-center text-white`}>
                                <Icon size={16} />
                            </div>
                            <div>
                                <p className="font-bold text-sm text-gray-900">{asset.storeName}</p>
                                <p className="text-xs text-gray-500">{asset.type === 'giftCard' ? `₪${asset.value}` : asset.terms}</p>
                            </div>
                        </div>

                        <div className="space-y-3 mb-6">
                            <div>
                                <label className="text-xs font-bold text-gray-500 ml-1">Friend's Name</label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    placeholder="e.g. Ron"
                                    value={friendName}
                                    onChange={(e) => setFriendName(e.target.value)}
                                    autoFocus
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 ml-1">Personal Note</label>
                                <textarea
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                                    placeholder="Add a message..."
                                    rows={2}
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            className="w-full bg-primary text-white font-bold py-3.5 rounded-xl shadow-lg shadow-purple-200 active:scale-95 transition-all"
                            onClick={handleSend}
                        >
                            Send Gift
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default AssetCard;
