import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyProfessions, type UserProfessionDto } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const [professions, setProfessions] = useState<UserProfessionDto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            setLoading(false);
            return;
        }

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
    }, [isAuthenticated]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
        );
    }

    // Guest Mode (Teaser)
    if (!isAuthenticated) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-800 rounded-3xl shadow-2xl overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-8 items-center p-8 md:p-16">
                        <div className="space-y-8">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                                Kariyer Yolculuğunu <br />
                                <span className="text-emerald-400">Kayıt Altına Al</span>
                            </h1>
                            <p className="text-lg text-slate-300 leading-relaxed">
                                Hangi mesleği takip ettiğini unutma, öğrendiğin konuları işaretle ve
                                ilerlemeni anlık olarak takip et. Kariyer hedeflerine ulaşmak artık daha sistemli.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    to="/login"
                                    className="inline-flex justify-center items-center px-8 py-4 border border-transparent text-base font-bold rounded-xl text-indigo-900 bg-white hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                >
                                    Giriş Yap
                                </Link>
                                <Link
                                    to="/register"
                                    className="inline-flex justify-center items-center px-8 py-4 border-2 border-slate-600 text-base font-bold rounded-xl text-white hover:bg-slate-800 hover:border-slate-500 transition-all"
                                >
                                    Hesap Oluştur
                                </Link>
                            </div>

                            <div className="pt-8 border-t border-slate-700/50 flex gap-8 text-slate-400 text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="text-emerald-400 text-xl">✓</span>
                                    <span>İlerleme Takibi</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-emerald-400 text-xl">✓</span>
                                    <span>Özel Notlar</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-emerald-400 text-xl">✓</span>
                                    <span>Sertifikalar</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative hidden md:block">
                            {/* Decorative Elements */}
                            <div className="absolute -top-10 -right-10 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl"></div>
                            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>

                            <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                                {/* Mockup Content */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center text-2xl">🚀</div>
                                    <div>
                                        <div className="h-4 w-32 bg-slate-600 rounded mb-2"></div>
                                        <div className="h-3 w-20 bg-slate-700 rounded"></div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                                        <div className="h-full w-3/4 bg-emerald-500 rounded-full"></div>
                                    </div>
                                    <div className="flex justify-between text-xs text-slate-400">
                                        <span>%75 Tamamlandı</span>
                                        <span>Backend Developer</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
                                    <Link to={`/profession/${prof.professionId}`}>{prof.title}</Link>
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
                                    to={`/profession/${prof.professionId}`}
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
