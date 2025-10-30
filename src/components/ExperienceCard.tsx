import React from 'react';
import { Link } from 'react-router-dom';
import { Experience } from '../types';

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col">
      <img src={experience.image} alt={experience.title} className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800">{experience.title}</h3>
          <div className="flex space-x-1">
            {experience.tags.slice(1,2).map(tag => (
              <span key={tag} className="text-xs font-semibold text-brand-purple bg-purple-100 px-2 py-1 rounded-full whitespace-nowrap">{tag}</span>
            ))}
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4 flex-grow">{experience.description}</p>
        <div className="flex justify-between items-center mt-auto">
          <p className="text-lg font-bold text-gray-800">
            <span className="text-sm font-normal text-gray-500">From </span>
            ₹{experience.price}
          </p>
          <Link
            to={`/details/${experience.id}`}
            className="bg-brand-yellow text-black font-semibold px-4 py-2 rounded-md hover:bg-yellow-400 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
