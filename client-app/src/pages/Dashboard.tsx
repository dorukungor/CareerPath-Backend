import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyProfessions, type UserProfessionDto } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const [professions, setProfessions] = useState<UserProfessionDto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyProfessions = async () => {
            try {
                const data = await getMyProfessions();
                setProfessions(data);
            } catch (error) {
                console.error('Kariyerler yüklenirken hata oluştu:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMyProfessions();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
                Kariyerlerim <span className="text-emerald-600">🚀</span>
            </h1>

            {professions.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="text-6xl mb-4">🌱</div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Henüz bir kariyer yoluna girmedin.</h3>
                    <p className="text-gray-500 mb-8">Yeni yetenekler kazanmak ve profesyonel kariyerini şekillendirmek için hemen keşfetmeye başla.</p>
                    <Link
                        to="/"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
                    >
                        Meslekleri Keşfet
                    </Link>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {professions.map((prof) => (
                        <div key={prof.professionId} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-gray-900 hover:text-emerald-600 transition-colors">
                                    <Link to={`/profession/${prof.slug}`}>{prof.title}</Link>
                                </h3>
                                {prof.isCompleted && (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        Tamamlandı
                                    </span>
                                )}
                            </div>

                            <div className="mb-4">
                                <div className="flex justify-between text-sm text-gray-500 mb-1">
                                    <span>İlerleme</span>
                                    <span className="font-medium text-gray-900">%{prof.progressPercentage}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div
                                        className="bg-emerald-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                                        style={{ width: `${prof.progressPercentage}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center text-sm text-gray-500 mt-4 pt-4 border-t border-gray-100">
                                <span>Başlangıç: {new Date(prof.startedAt).toLocaleDateString('tr-TR')}</span>
                                <Link
                                    to={`/profession/${prof.slug}`} // Assuming slug is available or verify if ID is needed. The DTO has slug.
                                    className="text-emerald-600 hover:text-emerald-700 font-medium"
                                >
                                    Devam Et →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
