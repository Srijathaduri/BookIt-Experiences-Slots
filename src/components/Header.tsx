import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const Header: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (location.pathname !== '/') {
            navigate(`/?search=${encodeURIComponent(searchTerm)}`);
        } else {
            // Logic to update search on HomePage is handled within HomePage itself
            // This is a simplified approach. For a more robust app, use a global state.
            const searchParams = new URLSearchParams(location.search);
            searchParams.set('search', searchTerm);
            navigate(`/?${searchParams.toString()}`);
        }
    };

    return (
        <header className="sticky top-0 bg-white shadow-md z-10 border-b border-brand-gray-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link to="/" className="flex items-center">
                        <img src="https://drive.google.com/uc?export=view&id=1bwdWKbfPjdzDTlfxSK38ZmO6lPRmx1df" alt="highway delite logo" className="h-12" />
                    </Link>
                    <div className="flex-1 flex justify-center px-8">
                        <form onSubmit={handleSearch} className="w-full max-w-lg">
                            <div className="relative">
                                <input
                                    type="search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search experiences"
                                    className="w-full py-2 pl-4 pr-20 rounded-lg border border-brand-gray-300 bg-brand-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-purple"
                                />
                                <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 bg-brand-yellow text-black font-semibold px-4 py-1 rounded-md hover:bg-yellow-400 transition-colors">
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="h-1 bg-gradient-to-r from-brand-purple to-pink-500"></div>
        </header>
    );
};

export default Header;
