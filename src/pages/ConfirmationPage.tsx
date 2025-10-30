import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const ConfirmationPage: React.FC = () => {
    const location = useLocation();
    const { refId } = location.state || {};

    return (
        <div className="flex flex-col items-center justify-center text-center h-full pt-20">
            <div className="bg-green-500 rounded-full p-4 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Booking Confirmed</h1>
            {refId && (
                <p className="text-gray-600 mb-8">
                    Ref ID: <span className="font-mono bg-gray-200 px-2 py-1 rounded">{refId}</span>
                </p>
            )}
            <Link 
                to="/"
                className="bg-brand-gray-200 text-gray-800 font-semibold px-6 py-2 rounded-md hover:bg-brand-gray-300 transition-colors"
            >
                Back to Home
            </Link>
        </div>
    );
};

export default ConfirmationPage;
