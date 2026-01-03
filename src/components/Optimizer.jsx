import React, { useMemo, useState } from 'react';
import { X, CheckCircle, ArrowDown } from 'lucide-react';

const Optimizer = ({ store, userAssets, onClose }) => {
    const [completedSteps, setCompletedSteps] = useState([]);

    // LOGIC: Sort assets based on priority
    // 1. Expiring < 48h (Mocked as not urgent for now unless date check)
    // 2. Gift Cards (Cash)
    // 3. Coupons (%)
    // 4. Membership
    const strategy = useMemo(() => {
        const storeAssets = userAssets.filter(a => a.storeId === store.id);

        return storeAssets.sort((a, b) => {
            const typePriority = { giftCard: 1, coupon: 2, membership: 3 };
            return (typePriority[a.type] || 99) - (typePriority[b.type] || 99);
        }).map((asset, index) => ({
            ...asset,
            stepIndex: index + 1,
            instruction: index === 0 ? 'Scan First' : (asset.type === 'giftCard' ? 'Use Balance' : 'Apply Discount')
        }));
    }, [store, userAssets]);

    const toggleStep = (id) => {
        if (completedSteps.includes(id)) {
            setCompletedSteps(completedSteps.filter(s => s !== id));
        } else {
            setCompletedSteps([...completedSteps, id]);
        }
    };

    const totalValue = strategy.reduce((sum, item) => sum + (item.type === 'giftCard' ? item.value : 0), 0);

    return (
        <div className="absolute inset-0 bg-gray-50 z-50 flex flex-col">
            {/* Header */}
            <div className="bg-white p-4 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img src={store.logo} alt={store.name} className="w-10 h-10 rounded-full bg-gray-100 object-contain p-1" />
                    <div>
                        <h2 className="font-bold text-gray-900">{store.name}</h2>
                        <p className="text-xs text-primary font-medium">Best Deal Strategy Active</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-2 bg-gray-100 rounded-full">
                    <X size={20} />
                </button>
            </div>

            {/* Steps */}
            <div className="flex-1 overflow-y-auto p-6">
                {strategy.map((step, index) => (
                    <div key={step.id} className="mb-6 relative">
                        {/* Connector Line */}
                        {index < strategy.length - 1 && (
                            <div className="absolute left-[19px] top-12 bottom-[-24px] w-0.5 bg-gray-200 -z-10"></div>
                        )}

                        <div className={`transition-all duration-500 ${completedSteps.includes(step.id) ? 'opacity-50 grayscale' : ''}`}>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-purple-200">
                                    {step.stepIndex}
                                </div>
                                <div className="font-bold text-gray-800 text-lg">{step.instruction}</div>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-l-primary ml-5">
                                <div className="text-center">
                                    <p className="text-sm text-gray-500 mb-2">{step.terms || 'Store Credit'}</p>
                                    <div className="bg-black text-white py-4 px-2 font-mono text-xl tracking-[0.2em] rounded-lg mb-4">
                                        {step.barcode}
                                    </div>
                                    {step.value > 0 && (
                                        <p className="font-bold text-green-600">Value: ₪{step.value}</p>
                                    )}
                                    <button
                                        onClick={() => toggleStep(step.id)}
                                        className={`mt-4 w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 ${completedSteps.includes(step.id) ? 'bg-gray-100 text-gray-500' : 'bg-black text-white'
                                            }`}
                                    >
                                        {completedSteps.includes(step.id) ? (
                                            <>Used <CheckCircle size={18} /></>
                                        ) : 'Mark as Used'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="bg-white p-6 border-t border-gray-100">
                <div className="flex justify-between items-center">
                    <span className="text-gray-500">Total Savings</span>
                    <span className="text-3xl font-bold text-green-600">₪{totalValue}</span>
                </div>
            </div>
        </div>
    );
};

export default Optimizer;
