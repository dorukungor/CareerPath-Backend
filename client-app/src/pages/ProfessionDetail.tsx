import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Profession, RoadmapStep } from '../types/profession';
import { getProfessionById } from '../services/api';
import StepDetailModal from '../components/StepDetailModal';

export default function ProfessionDetail() {
    const { id } = useParams<{ id: string }>();
    const [profession, setProfession] = useState<Profession | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Modal State
    const [selectedStep, setSelectedStep] = useState<RoadmapStep | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (id) {
            getProfessionById(id)
                .then(data => {
                    setProfession(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Failed to fetch profession:', err);
                    setError('Failed to load profession details.');
                    setLoading(false);
                });
        }
    }, [id]);

    const openStepDetail = (step: RoadmapStep) => {
        setSelectedStep(step);
        setIsModalOpen(true);
    };

    const closeStepDetail = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedStep(null), 300); // Clear after animation roughly
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error || !profession) {
        return (
            <div className="text-center py-20">
                <p className="text-red-500 text-lg">{error || 'Profession not found'}</p>
                <Link to="/" className="text-indigo-600 hover:text-indigo-800 underline mt-4 inline-block">
                    Return Home
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">{profession.title}</h1>
                    <p className="text-slate-500 text-lg">Detailed step-by-step roadmap to master this career path.</p>
                </div>
                <div className="flex gap-3">
                    <span className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
                        💰 ${profession.avgSalary.toLocaleString()}/yr
                    </span>
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold shadow-sm ${profession.difficultyLevel === 'Hard' ? 'bg-rose-100 text-rose-800' :
                        profession.difficultyLevel === 'Medium' ? 'bg-amber-100 text-amber-800' :
                            'bg-sky-100 text-sky-800'
                        }`}>
                        🏋️ {profession.difficultyLevel}
                    </span>
                </div>
            </div>

            {/* Timeline */}
            <div className="relative border-l-4 border-indigo-200 ml-4 md:ml-8 space-y-12">
                {profession.roadmapSteps?.map((step, index) => (
                    <div key={step.id} className="relative pl-8 md:pl-12 group">
                        {/* Step Marker */}
                        <div className="absolute -left-[22px] bg-white rounded-full border-4 border-indigo-600 h-10 w-10 flex items-center justify-center font-bold text-indigo-600 shadow-md group-hover:scale-110 transition-transform duration-300 z-10">
                            {index + 1}
                        </div>

                        {/* Content Card */}
                        <div
                            className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                            onClick={() => openStepDetail(step)}
                        >
                            {/* Step Header */}
                            <div className="bg-gradient-to-r from-indigo-50 to-white px-6 py-4 border-b border-indigo-50 flex justify-between items-center">
                                <h3 className="text-xl font-bold text-slate-800">{step.title}</h3>
                                {step.mustKnow && (
                                    <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-md uppercase tracking-wider font-bold">
                                        Must Know
                                    </span>
                                )}
                            </div>

                            <div className="p-6">
                                {/* Summary instead of full Description */}
                                <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                                    {step.summary || step.description?.substring(0, 150) + "..."}
                                </p>

                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                                    <span className="text-sm text-gray-400 font-medium">
                                        ⏱️ 5 min read
                                    </span>
                                    <button
                                        className="text-indigo-600 hover:text-indigo-800 font-semibold text-sm flex items-center gap-1 group/btn"
                                    >
                                        Read Details
                                        <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 text-center">
                <Link to="/" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10 transition-colors">
                    ← Browse More Careers
                </Link>
            </div>

            {/* Step Detail Modal */}
            <StepDetailModal
                isOpen={isModalOpen}
                onClose={closeStepDetail}
                step={selectedStep}
            />
        </div>
    );
}
