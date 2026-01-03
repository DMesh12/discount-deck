import React from 'react';

const StatusBadge = ({ status }) => {
    const styles = {
        Completed: 'bg-green-500/20 text-green-400 border-green-500/50',
        Pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
        Disputed: 'bg-red-500/20 text-red-400 border-red-500/50'
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
            {status}
        </span>
    );
};

const TransactionsTable = ({ transactions }) => {
    return (
        <div className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                Recent Transactions <span className="text-gray-500 text-sm font-normal">(The Money Flow)</span>
            </h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-700 text-gray-400 text-sm uppercase tracking-wider">
                            <th className="pb-4 font-medium">ID</th>
                            <th className="pb-4 font-medium">Asset</th>
                            <th className="pb-4 font-medium">Seller > Buyer</th>
                            <th className="pb-4 font-medium">Values</th>
                            <th className="pb-4 font-medium">Fee</th>
                            <th className="pb-4 font-medium">Status</th>
                            <th className="pb-4 font-medium text-right">Time</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {transactions.map((tx) => (
                            <tr key={tx.id} className="text-gray-300 hover:bg-gray-700/30 transition-colors">
                                <td className="py-4 font-mono text-xs text-gray-500">{tx.id}</td>
                                <td className="py-4 font-medium text-white">{tx.asset}</td>
                                <td className="py-4 text-sm">
                                    <span className="text-blue-400">{tx.seller}</span>
                                    <span className="text-gray-600 mx-2">→</span>
                                    <span className="text-purple-400">{tx.buyer}</span>
                                </td>
                                <td className="py-4 text-sm">
                                    <span className="text-gray-400 line-through mr-2">{tx.faceValue}</span>
                                    <span className="text-white font-bold">{tx.soldFor}</span>
                                </td>
                                <td className="py-4 text-green-400 font-bold">{tx.fee}</td>
                                <td className="py-4"><StatusBadge status={tx.status} /></td>
                                <td className="py-4 text-right text-sm text-gray-500">{tx.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionsTable;
