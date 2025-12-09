import React, { useEffect } from 'react';
import type { RoadmapStep } from '../types/profession';

interface StepDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    step: RoadmapStep | null;
}

const StepDetailModal: React.FC<StepDetailModalProps> = ({ isOpen, onClose, step }) => {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen || !step) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            {/* Backdrop with blur */}
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                    className="fixed inset-0 bg-slate-900 bg-opacity-75 transition-opacity backdrop-blur-sm"
                    aria-hidden="true"
                    onClick={onClose}
                ></div>

                {/* Modal Positioning */}
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                {/* Modal Content */}
                <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full border border-gray-100">

                    {/* Header */}
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-b border-gray-100 relative">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 transition-colors focus:outline-none"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                                        Step {step.orderIndex}
                                    </span>
                                    {step.mustKnow && (
                                        <span className="bg-rose-100 text-rose-800 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                                            Important
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-3xl leading-tight font-extrabold text-slate-900" id="modal-title">
                                    {step.title}
                                </h3>
                            </div>
                        </div>
                    </div>

                    {/* Content (Description) */}
                    <div className="px-4 py-6 sm:p-8">
                        {/* Debugging styling */}
                        <div className="text-gray-800 text-lg leading-relaxed">
                            <p className="whitespace-pre-line border border-red-500 p-2">
                                {step.description ? step.description : "No description (fallback)"}
                            </p>
                        </div>
                    </div>

                    {/* Footer (Resources) */}
                    {step.resources && step.resources.length > 0 && (
                        <div className="bg-slate-50 px-4 py-5 sm:px-8 border-t border-slate-100">
                            <h4 className="text-sm font-bold text-slate-700 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <span className="text-xl">📚</span> Recommended Resources
                            </h4>
                            <div className="grid gap-3">
                                {step.resources.map(res => (
                                    <a
                                        key={res.id}
                                        href={res.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">
                                                {res.type === 'Video' ? '🎥' :
                                                    res.type === 'Article' ? '📄' :
                                                        res.type === 'Course' ? '🎓' : '🔗'}
                                            </span>
                                            <div>
                                                <p className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
                                                    {res.title || res.url}
                                                </p>
                                                <p className="text-xs text-gray-400 font-mono truncate max-w-xs">{res.url}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            {res.isAffiliate && (
                                                <span className="text-xs bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded border border-yellow-200 font-medium">
                                                    Ad
                                                </span>
                                            )}
                                            <svg className="h-5 w-5 text-gray-300 group-hover:text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StepDetailModal;
