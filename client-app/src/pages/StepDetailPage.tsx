```javascript
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Profession, RoadmapStep } from '../types/profession';
import { getProfessionById, toggleStepProgress, getMyProfessions } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function StepDetailPage() {
    const { professionId, stepId } = useParams<{ professionId: string; stepId: string }>();
    const { user } = useAuth();
    const [profession, setProfession] = useState<Profession | null>(null);
    const [step, setStep] = useState<RoadmapStep | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isCompleted, setIsCompleted] = useState(false); // New state
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        if (professionId && stepId) {
            const fetchData = async () => {
                try {
                    // Fetch Profession & Step
                    const professionData = await getProfessionById(professionId);
                    setProfession(professionData);
                    
                    const foundStep = professionData.roadmapSteps.find(s => s.id === stepId);
                    if (foundStep) {
                        setStep(foundStep);
                        setIsCompleted(foundStep.isCompleted);
                    } else {
                        setError('Step not found in this profession.');
                    }

                    // Check if user is following this profession
                    if (user) {
                        try {
                            const myProfs = await getMyProfessions();
                            const following = myProfs.some(p => p.professionId === professionId);
                            setIsFollowing(following);
                        } catch (err) {
                            console.error('Failed to check following status', err);
                        }
                    }

                } catch (err) {
                    console.error('Failed to fetch details:', err);
                    setError('Failed to load details.');
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        }
    }, [professionId, stepId, user]);

    const handleToggle = async () => {
        if (!step || !user || !isFollowing) return;

        // Optimistic Update
        const previousState = isCompleted;
        setIsCompleted(!previousState);

        try {
            await toggleStepProgress(step.id);
        } catch (error) {
            console.error('Failed to toggle progress:', error);
            // Rollback on error
            setIsCompleted(previousState);
            alert('İlerleme kaydedilemedi. Lütfen tekrar deneyin.');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800"></div>
            </div>
        );
    }

    if (error || !step || !profession) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-20 text-center">
                <p className="text-rose-500 text-lg mb-6">{error || 'Content not found'}</p>
                <Link to={`/ profession / ${ professionId } `} className="text-slate-800 hover:underline">
                    ← Back to Roadmap
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header / Breadcrumb */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
                <Link
                    to={`/ profession / ${ professionId } `}
                    className="group inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors mb-8"
                >
                    <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to {profession?.title} Roadmap
                </Link>

                <main>
                    {/* Header Section */}
                    <div className="mb-12 border-b border-gray-100 pb-8">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-3">
                                <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    Step {step?.orderIndex}
                                </span>
                                {step?.mustKnow && (
                                    <span className="bg-rose-50 text-rose-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                        Must Know
                                    </span>
                                )}
                            </div>

                            {user ? (
                                isFollowing ? (
                                    <label className="flex items-center gap-3 cursor-pointer group select-none">
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                className="peer sr-only"
                                                checked={isCompleted}
                                                onChange={handleToggle}
                                            />
                                            <div className={`w - 8 h - 8 rounded - lg border - 2 transition - all flex items - center justify - center ${
    isCompleted
        ? 'bg-emerald-500 border-emerald-500'
        : 'border-slate-300 hover:border-emerald-400'
} `}>
                                                <svg className={`w - 5 h - 5 text - white transform transition - transform ${ isCompleted ? 'scale-100' : 'scale-0' } `} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        </div>
                                        <span className={`text - sm font - medium transition - colors ${ isCompleted ? 'text-emerald-600' : 'text-slate-500 group-hover:text-slate-800' } `}>
                                            {isCompleted ? 'Tamamlandı!' : 'Tamamlandı Olarak İşaretle'}
                                        </span>
                                    </label>
                                ) : (
                                    <span className="text-xs text-slate-400 italic bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                                        İlerlemeyi kaydetmek için takip etmelisin
                                    </span>
                                )
                            ) : null}
                        </div>

                        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
                            {step.title}
                        </h1>

                        {step.summary && (
                            <p className="text-xl sm:text-2xl text-slate-500 leading-relaxed font-serif italic">
                                {step.summary}
                            </p>
                        )}
                    </div>

                    {/* Content Section */}
                    <article className="prose prose-lg sm:prose-xl prose-slate max-w-none text-slate-800 leading-8 sm:leading-9">
                        <div className="whitespace-pre-line font-serif">
                            {step.description}
                        </div>
                    </article>

                    {/* Footer / Resources Section */}
                    {step.resources && step.resources.length > 0 && (
                        <div className="mt-20 pt-10 border-t border-gray-100">
                            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-widest mb-8 flex items-center gap-3">
                                <span className="text-2xl">📚</span> Learning Resources
                            </h2>

                            <div className="grid gap-4 sm:grid-cols-2">
                                {step.resources.map(res => (
                                    <a
                                        key={res.id}
                                        href={res.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex flex-col p-6 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:border-indigo-200 hover:shadow-lg transition-all duration-300 group"
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <span className="text-3xl">
                                                {res.type === 'Video' ? '🎥' :
                                                    res.type === 'Article' ? '📄' :
                                                        res.type === 'Course' ? '🎓' :
                                                            res.type === 'Documentation' ? '📖' : '🔗'}
                                            </span>
                                            {res.isAffiliate && (
                                                <span className="text-[10px] bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide border border-yellow-200">
                                                    Promoted
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                                            {res.title || "External Resource"}
                                        </h3>
                                        <p className="text-sm text-slate-400 font-mono truncate">
                                            {new URL(res.url).hostname}
                                        </p>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
