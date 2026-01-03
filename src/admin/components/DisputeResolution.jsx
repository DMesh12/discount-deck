import React from 'react';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const DisputeResolution = ({ disputes }) => {
    return (
        <div className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700 h-full">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                Dispute Resolution <span className="text-red-400 text-sm font-normal">(Action Required)</span>
            </h2>

            <div className="space-y-4">
                {disputes.map((dispute) => (
                    <div key={dispute.id} className="bg-gray-900/50 rounded-xl p-5 border border-red-500/30">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex gap-3">
                                <div className="p-2 bg-red-500/10 rounded-lg text-red-500 h-fit">
                                    <AlertCircle size={20} />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium">{dispute.issue}</h4>
                                    <p className="text-gray-400 text-sm">Case: {dispute.id} • User: <span className="text-blue-400">{dispute.user}</span></p>
                                </div>
                            </div>
                            <span className="text-white font-bold text-lg">{dispute.amount}</span>
                        </div>

                        <div className="flex gap-3 mt-4">
                            <button className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-500 py-2 rounded-lg text-sm font-medium border border-red-500/50 transition-colors flex items-center justify-center gap-2">
                                <XCircle size={16} /> Refund Buyer
                            </button>
                            <button className="flex-1 bg-green-500/10 hover:bg-green-500/20 text-green-500 py-2 rounded-lg text-sm font-medium border border-green-500/50 transition-colors flex items-center justify-center gap-2">
                                <CheckCircle size={16} /> Release Funds
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DisputeResolution;
