import React from 'react';
import type { Profession } from '../types/profession';
import { Link } from 'react-router-dom';

interface ProfessionCardProps {
    profession: Profession;
    isEnrolled?: boolean;
    progress?: number;
}

const ProfessionCard: React.FC<ProfessionCardProps> = ({ profession, isEnrolled = false, progress = 0 }) => {
    const getDifficultyColor = (level: string) => {
        switch (level.toLowerCase()) {
            case 'easy': return 'bg-green-100 text-green-800 border-green-200';
            case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'hard': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    // Determine a gradient based on the title/slug for a visual placeholder since we don't have images yet
    const getGradient = (title: string) => {
        if (title.toLowerCase().includes('backend')) return 'from-slate-700 to-slate-900';
        if (title.toLowerCase().includes('frontend')) return 'from-indigo-500 to-purple-600';
        return 'from-blue-500 to-cyan-600';
    };

    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group flex flex-col h-full">
            {/* Header / Image Placeholder */}
            <div className={`h-32 bg-gradient-to-r ${getGradient(profession.title)} flex items-center justify-center relative p-6`}>
                <h3 className="text-white text-2xl font-bold tracking-tight text-center drop-shadow-md">
                    {profession.title}
                </h3>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(profession.difficultyLevel)}`}>
                        {profession.difficultyLevel}
                    </span>
                    <span className="text-gray-500 text-sm font-medium">
                        ${profession.avgSalary.toLocaleString()} / year
                    </span>
                </div>

                <div className="space-y-3">
                    <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-1 bg-blue-500 w-1/3"></div>
                    </div>
                    <p className="text-gray-500 text-sm">
                        Start your journey to become a {profession.title}.
                    </p>
                </div>

                <div className="mt-auto pt-6">
                    <div className="mt-auto pt-6">
                        {isEnrolled ? (
                            <Link to={`/profession/${profession.id}`} className="w-full py-2.5 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-lg transition border border-emerald-200 flex items-center justify-center gap-2 group-hover:shadow-md">
                                Devam Et (%{progress})
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                        ) : (
                            <Link to={`/profession/${profession.id}`} className="w-full py-2.5 px-4 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold rounded-lg transition border border-gray-200 group-hover:border-blue-300 group-hover:text-blue-600 flex items-center justify-center gap-2">
                                Yol Haritasını İncele
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfessionCard;
