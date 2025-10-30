
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getExperiences } from '../services/api';
import { Experience } from '../types';
import ExperienceCard from '../components/ExperienceCard';

const HomePage: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('search') || '';

  useEffect(() => {
    const fetchExperiences = async () => {
      setLoading(true);
      const data = await getExperiences(query);
      setExperiences(data);
      setLoading(false);
    };
    fetchExperiences();
  }, [query]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-gray-300"></div>
                <div className="p-4">
                    <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
                    <div className="flex justify-between items-center">
                        <div className="h-8 bg-gray-300 rounded w-1/4"></div>
                        <div className="h-10 bg-gray-300 rounded w-1/3"></div>
                    </div>
                </div>
            </div>
          ))}
        </div>
      ) : experiences.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {experiences.map(exp => (
            <ExperienceCard key={exp.id} experience={exp} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-700">No experiences found</h2>
            <p className="text-gray-500 mt-2">Try adjusting your search terms.</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
