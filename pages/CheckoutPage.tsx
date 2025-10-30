
import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BookingDetails, PromoValidation } from '../types';
import { validatePromoCode, createBooking } from '../services/api';
import ArrowLeftIcon from '../components/icons/ArrowLeftIcon';

const CheckoutPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { experience, date, time, quantity } = (location.state as BookingDetails) || {};
    
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [promoCode, setPromoCode] = useState('');
    const [promoStatus, setPromoStatus] = useState<PromoValidation | null>(null);
    const [termsAgreed, setTermsAgreed] = useState(false);
    const [isBooking, setIsBooking] = useState(false);
    const [error, setError] = useState('');

    const taxes = 59;
    
    const subtotal = useMemo(() => experience ? experience.price * quantity : 0, [experience, quantity]);
    
    const discount = useMemo(() => {
        if (!promoStatus?.valid) return 0;
        if (promoStatus.discountType === 'FLAT') return promoStatus.value || 0;
        if (promoStatus.discountType === 'PERCENT') return subtotal * ((promoStatus.value || 0) / 100);
        return 0;
    }, [promoStatus, subtotal]);

    const total = useMemo(() => Math.max(0, subtotal - discount + taxes), [subtotal, discount, taxes]);

    const handleApplyPromo = async () => {
        const result = await validatePromoCode(promoCode);
        setPromoStatus(result);
    };

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!fullName || !email || !termsAgreed) {
            setError('Please fill all fields and agree to the terms.');
            return;
        }
        setError('');
        setIsBooking(true);
        const result = await createBooking({ experience, date, time, quantity });
        setIsBooking(false);
        if (result.success && result.refId) {
            navigate('/confirmation', { state: { refId: result.refId } });
        } else {
            setError(result.message || 'Booking failed. Please try again.');
        }
    };
    
    if (!experience) {
        return (
            <div className="container mx-auto text-center py-20">
                <h2 className="text-2xl">Invalid checkout session.</h2>
                <button onClick={() => navigate('/')} className="mt-4 bg-brand-yellow px-4 py-2 rounded-md">Go to Home</button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <button onClick={() => navigate(-1)} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6">
                <ArrowLeftIcon />
                <span>Checkout</span>
            </button>
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                {/* Left Side - Form */}
                <div className="lg:w-2/3">
                    <form onSubmit={handleBooking} className="bg-brand-gray-100 p-6 sm:p-8 rounded-xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
                                <input type="text" id="fullName" value={fullName} onChange={e => setFullName(e.target.value)} className="w-full p-3 rounded-lg border border-brand-gray-300 bg-white" placeholder="Your name" required/>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 rounded-lg border border-brand-gray-300 bg-white" placeholder="Your email" required/>
                            </div>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="promoCode" className="block text-sm font-medium text-gray-700 mb-1">Promo code</label>
                            <div className="flex">
                                <input type="text" id="promoCode" value={promoCode} onChange={e => setPromoCode(e.target.value)} className="flex-grow p-3 rounded-l-lg border border-brand-gray-300 bg-white" placeholder="Promo code"/>
                                <button type="button" onClick={handleApplyPromo} className="bg-gray-800 text-white font-semibold px-6 rounded-r-lg hover:bg-gray-700">Apply</button>
                            </div>
                            {promoStatus && <p className={`mt-2 text-sm ${promoStatus.valid ? 'text-green-600' : 'text-red-600'}`}>{promoStatus.valid ? 'Promo code applied!' : 'Invalid promo code.'}</p>}
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" id="terms" checked={termsAgreed} onChange={e => setTermsAgreed(e.target.checked)} className="h-4 w-4 text-brand-purple border-gray-300 rounded focus:ring-brand-purple" required/>
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">I agree to the terms and safety policy</label>
                        </div>
                    </form>
                </div>
                {/* Right Side - Summary */}
                <div className="lg:w-1/3">
                    <div className="bg-brand-gray-200 p-6 rounded-xl">
                        <div className="space-y-3 text-sm text-gray-800 pb-4 border-b border-gray-300">
                             <div className="flex justify-between"><span className="text-gray-600">Experience</span> <span className="font-semibold">{experience.title}</span></div>
                             <div className="flex justify-between"><span className="text-gray-600">Date</span> <span className="font-semibold">{new Date(date).toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })}</span></div>
                             <div className="flex justify-between"><span className="text-gray-600">Time</span> <span className="font-semibold">{time}</span></div>
                             <div className="flex justify-between"><span className="text-gray-600">Qty</span> <span className="font-semibold">{quantity}</span></div>
                        </div>
                        <div className="space-y-3 py-4 text-sm">
                            <div className="flex justify-between"><span className="text-gray-600">Subtotal</span> <span className="font-semibold">₹{subtotal}</span></div>
                           {discount > 0 && <div className="flex justify-between text-green-600"><span className="text-gray-600">Discount</span> <span className="font-semibold">- ₹{discount.toFixed(2)}</span></div>}
                           <div className="flex justify-between"><span className="text-gray-600">Taxes</span> <span className="font-semibold">₹{taxes}</span></div>
                        </div>
                        <div className="bg-white p-4 -mx-2 my-2 rounded-lg flex justify-between items-center">
                            <span className="text-lg font-bold">Total</span>
                            <span className="font-bold text-2xl">₹{total.toFixed(2)}</span>
                        </div>
                        <button
                            onClick={handleBooking}
                            disabled={isBooking || !termsAgreed || !fullName || !email}
                            className="w-full mt-4 bg-brand-yellow text-black font-bold py-3 rounded-lg text-lg hover:bg-yellow-400 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                        >
                            {isBooking ? 'Processing...' : 'Pay and Confirm'}
                        </button>
                        {error && <p className="mt-4 text-center text-red-600">{error}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
