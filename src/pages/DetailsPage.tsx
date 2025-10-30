import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getExperienceById } from '../services/api';
import { Experience, TimeSlot } from '../types';
import ArrowLeftIcon from '../components/icons/ArrowLeftIcon';

const DetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const taxes = 59;

  useEffect(() => {
    const fetchExperience = async () => {
      if (!id) return;
      setLoading(true);
      const data = await getExperienceById(id);
      if (data) {
        setExperience(data);
        if (data.availability.length > 0) {
            setSelectedDate(data.availability[0].date);
        }
      }
      setLoading(false);
    };
    fetchExperience();
  }, [id]);

  if (loading) {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
            <div className="h-8 w-48 bg-gray-300 rounded mb-8"></div>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3">
                    <div className="w-full h-96 bg-gray-300 rounded-lg"></div>
                    <div className="h-8 w-1/3 bg-gray-300 rounded mt-8 mb-4"></div>
                    <div className="h-20 bg-gray-300 rounded"></div>
                </div>
                <div className="lg:w-1/3 h-96 bg-gray-300 rounded-lg"></div>
            </div>
        </div>
    );
  }

  if (!experience) {
    return <div className="text-center py-20 text-2xl">Experience not found.</div>;
  }

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setSelectedTime('');
  }

  const handleTimeSelect = (time: string, stock: number) => {
    if (stock > 0) {
      setSelectedTime(time);
    }
  }

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, Math.min(10, prev + amount)));
  };

  const subtotal = experience.price * quantity;
  const total = subtotal + taxes;
  
  const availableSlotsForDate = experience.availability.find(d => d.date === selectedDate)?.slots || [];

  const handleConfirm = () => {
    if (selectedDate && selectedTime && experience) {
      navigate('/checkout', { state: { experience, date: selectedDate, time: selectedTime, quantity } });
    }
  }

  const getSlotLabel = (slot: TimeSlot) => {
    if (slot.stock === 0) return 'Sold out';
    if (slot.stock <= 5) return `${slot.stock} left`;
    return null;
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    return `${month} ${day}`;
  };


  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button onClick={() => navigate(-1)} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6">
            <ArrowLeftIcon />
            <span>Details</span>
        </button>
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left Side */}
        <div className="lg:w-2/3">
          <img src={experience.image} alt={experience.title} className="w-full h-auto max-h-[500px] object-cover rounded-xl shadow-lg mb-8" />
          <h1 className="text-3xl font-bold mb-4">{experience.title}</h1>
          <p className="text-gray-600 mb-8">{experience.description}</p>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Choose date</h2>
            <div className="flex flex-wrap gap-3">
              {experience.availability.map(d => (
                <button key={d.date} onClick={() => handleDateChange(d.date)} className={`px-4 py-2 rounded-lg border ${selectedDate === d.date ? 'bg-brand-purple text-white border-brand-purple' : 'bg-white text-gray-700 border-gray-300 hover:border-gray-500'}`}>
                  {formatDate(d.date)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Choose time</h2>
            <div className="flex flex-wrap gap-3">
              {availableSlotsForDate.map(slot => (
                  <button key={slot.time} onClick={() => handleTimeSelect(slot.time, slot.stock)} 
                    disabled={slot.stock === 0}
                    className={`relative px-4 py-2 rounded-lg border ${selectedTime === slot.time ? 'bg-brand-purple text-white border-brand-purple' : 'bg-white text-gray-700 border-gray-300'} 
                    ${slot.stock === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:border-gray-500'}`}
                  >
                      {slot.time}
                      {getSlotLabel(slot) && <span className={`absolute -top-2 -right-2 text-xs px-1.5 py-0.5 rounded-full ${slot.stock === 0 ? 'bg-gray-400' : 'bg-red-500'} text-white`}>{getSlotLabel(slot)}</span>}
                  </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">All times are in IST (GMT +5:30)</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">About</h2>
            <div className="bg-brand-gray-100 p-4 rounded-lg">
                <p className="text-gray-700">{experience.about}</p>
            </div>
          </div>
        </div>

        {/* Right Side - Booking Summary */}
        <div className="lg:w-1/3">
            <div className="sticky top-28 bg-brand-gray-200 p-6 rounded-xl shadow-md">
                <div className="flex justify-between items-center pb-4 border-b border-gray-300">
                    <span className="text-gray-600">Starts at</span>
                    <span className="font-bold text-lg">₹{experience.price}</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-gray-300">
                    <span className="text-gray-600">Quantity</span>
                    <div className="flex items-center space-x-4">
                        <button onClick={() => handleQuantityChange(-1)} className="w-8 h-8 rounded-full border border-gray-400 text-lg font-bold flex items-center justify-center hover:bg-gray-300">-</button>
                        <span>{quantity}</span>
                        <button onClick={() => handleQuantityChange(1)} className="w-8 h-8 rounded-full border border-gray-400 text-lg font-bold flex items-center justify-center hover:bg-gray-300">+</button>
                    </div>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-gray-300">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-bold text-lg">₹{subtotal}</span>
                </div>
                <div className="flex justify-between items-center py-4">
                    <span className="text-gray-600">Taxes</span>
                    <span className="font-bold text-lg">₹{taxes}</span>
                </div>
                <div className="bg-white p-4 -mx-2 my-2 rounded-lg flex justify-between items-center">
                    <span className="text-lg font-bold">Total</span>
                    <span className="font-bold text-2xl">₹{total}</span>
                </div>
                <button
                    onClick={handleConfirm}
                    disabled={!selectedTime}
                    className="w-full mt-4 bg-brand-yellow text-black font-bold py-3 rounded-lg text-lg hover:bg-yellow-400 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                    Confirm
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
