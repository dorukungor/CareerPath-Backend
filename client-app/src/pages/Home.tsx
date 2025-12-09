import { useEffect, useState } from 'react';
import { getProfessions } from '../services/api';
import type { Profession } from '../types/profession';
import ProfessionCard from '../components/ProfessionCard';

export default function Home() {
    const [professions, setProfessions] = useState<Profession[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfessions = async () => {
            try {
                const data = await getProfessions();
                setProfessions(data);
            } catch (err) {
                console.error("Failed to fetch professions:", err);
                setError("Could not connect to the API. Is Backend running?");
            } finally {
                setLoading(false);
            }
        };

        fetchProfessions();
    }, []);

    return (
        <>
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6">
                    Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Dream Career</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                    Clear roadmaps, curated resources, and a step-by-step guide to mastering the tech industry.
                </p>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 text-red-700 p-4 rounded-lg text-center border border-red-200">
                        {error}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {professions.map((prof) => (
                            <ProfessionCard key={prof.id} profession={prof} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
