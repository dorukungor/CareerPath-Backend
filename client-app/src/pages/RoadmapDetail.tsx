import { useParams } from 'react-router-dom';

export default function RoadmapDetail() {
    const { id } = useParams<{ id: string }>();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h1 className="text-3xl font-bold text-slate-900 mb-4">Roadmap Detail</h1>
                <p className="text-gray-600 mb-8">Displaying details for Profession ID: <span className="font-mono bg-yellow-100 p-1 rounded">{id}</span></p>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                    <p className="text-blue-700">
                        🚧 Work in Progress: The detailed roadmap steps (Entity vs DTO mapping) will be implemented in the next step by the Backend team.
                    </p>
                </div>
            </div>
        </div>
    );
}
