import React from 'react';

interface ProgressBarProps {
    value: number;
    height?: string;
    showLabel?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, height = 'h-2', showLabel = false }) => {
    // Clamp value between 0 and 100
    const percentage = Math.min(Math.max(value, 0), 100);

    const getColorClass = (val: number) => {
        if (val === 100) return 'bg-green-500';
        if (val >= 71) return 'bg-emerald-500';
        if (val >= 21) return 'bg-blue-500'; // Sari/Mavi -> Picking Blue for progress
        return 'bg-orange-500'; // Kirmizi/Turuncu
    };

    const colorClass = getColorClass(percentage);

    return (
        <div className="w-full">
            {showLabel && (
                <div className="flex justify-between mb-1">
                    <span className="text-base font-medium text-slate-700">İlerleme</span>
                    <span className="text-sm font-medium text-slate-700">%{percentage}</span>
                </div>
            )}
            <div className={`w-full bg-gray-200 rounded-full ${height} overflow-hidden`}>
                <div
                    className={`${colorClass} ${height} rounded-full transition-all duration-700 ease-out flex items-center justify-end pr-1`}
                    style={{ width: `${percentage}%` }}
                >
                    {percentage === 100 && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                        </svg>
                    )}
                </div>
            </div>
            {percentage === 100 && !showLabel && (
                <div className="text-right mt-1">
                    <span className="text-xs font-bold text-green-600 flex items-center justify-end gap-1">
                        Tamamlandı <span className="text-lg">🎉</span>
                    </span>
                </div>
            )}
        </div>
    );
};

export default ProgressBar;
