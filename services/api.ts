
import { Experience, BookingDetails, PromoValidation } from '../types';

const experiences: Experience[] = [
  {
    id: '1',
    title: 'Kayaking',
    location: 'Udupi',
    tags: ['Kayaking', 'Udupi, Karnataka'],
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    price: 999,
    image: 'https://picsum.photos/seed/kayak-mangrove/280/312',
    about: 'Scenic routes, trained guides, and safety briefing. Minimum age 10. Helmet and Life jackets along with an expert will accompany in kayaking.',
    availability: [
      { date: '2025-10-22', slots: [{ time: '07:00 am', stock: 4 }, { time: '09:00 am', stock: 2 }, { time: '11:00 am', stock: 5 }, { time: '01:00 pm', stock: 0 }] },
      { date: '2025-10-23', slots: [{ time: '07:00 am', stock: 8 }, { time: '09:00 am', stock: 3 }, { time: '11:00 am', stock: 1 }, { time: '01:00 pm', stock: 0 }] },
      { date: '2025-10-24', slots: [{ time: '07:00 am', stock: 10 }, { time: '09:00 am', stock: 10 }, { time: '11:00 am', stock: 8 }, { time: '01:00 pm', stock: 2 }] },
      { date: '2025-10-25', slots: [{ time: '07:00 am', stock: 0 }, { time: '09:00 am', stock: 1 }, { time: '11:00 am', stock: 3 }, { time: '01:00 pm', stock: 5 }] },
    ]
  },
  {
    id: '2',
    title: 'Nandi Hills Sunrise',
    location: 'Bangalore',
    tags: ['Sunrise', 'Bangalore'],
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    price: 899,
    image: 'https://picsum.photos/seed/nandi-hills/280/312',
    about: 'Witness the breathtaking sunrise from the top of Nandi Hills. Includes transportation and a light breakfast.',
    availability: [
      { date: '2025-11-01', slots: [{ time: '04:00 am', stock: 15 }, { time: '04:30 am', stock: 10 }] },
      { date: '2025-11-02', slots: [{ time: '04:00 am', stock: 5 }, { time: '04:30 am', stock: 0 }] },
    ]
  },
  {
    id: '3',
    title: 'Coffee Trail',
    location: 'Coorg',
    tags: ['Trekking', 'Coorg'],
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    price: 1299,
    image: 'https://picsum.photos/seed/coffee-trail/280/312',
    about: 'Explore the lush coffee plantations of Coorg. Learn about coffee making process and enjoy a freshly brewed cup.',
    availability: [
       { date: '2025-10-22', slots: [{ time: '10:00 am', stock: 12 }, { time: '02:00 pm', stock: 8 }] },
       { date: '2025-10-23', slots: [{ time: '10:00 am', stock: 10 }, { time: '02:00 pm', stock: 5 }] },
    ]
  },
  {
    id: '4',
    title: 'Kayaking',
    location: 'Udupi, Karnataka',
    tags: ['Kayaking', 'Udupi, Karnataka'],
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    price: 999,
    image: 'https://picsum.photos/seed/kayak-woman/280/312',
    about: 'Scenic routes, trained guides, and safety briefing. Minimum age 10. Helmet and Life jackets along with an expert will accompany in kayaking.',
    availability: [
      { date: '2025-10-22', slots: [{ time: '07:00 am', stock: 4 }, { time: '09:00 am', stock: 2 }, { time: '11:00 am', stock: 5 }, { time: '01:00 pm', stock: 0 }] },
    ]
  },
    {
    id: '5',
    title: 'Boat Cruise',
    location: 'Sunderban',
    tags: ['Boating', 'Sunderban'],
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    price: 999,
    image: 'https://picsum.photos/seed/boat-cruise/280/312',
    about: 'Enjoy a serene boat cruise through the beautiful Sunderbans. Spot wildlife and enjoy the natural beauty.',
    availability: [
      { date: '2025-12-10', slots: [{ time: '09:00 am', stock: 20 }, { time: '01:00 pm', stock: 15 }] },
    ]
  },
  {
    id: '6',
    title: 'Bunjee Jumping',
    location: 'Manali',
    tags: ['Adventure', 'Manali'],
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    price: 2499,
    image: 'https://picsum.photos/seed/bunjee-jumping/280/312',
    about: 'Experience the thrill of bunjee jumping in the scenic mountains of Manali. All safety equipment provided.',
    availability: [
      { date: '2025-10-30', slots: [{ time: '10:00 am', stock: 5 }, { time: '12:00 pm', stock: 3 }, { time: '02:00 pm', stock: 1 }] },
    ]
  },
   {
    id: '7',
    title: 'Coffee Trail',
    location: 'Coorg',
    tags: ['Trekking', 'Coorg'],
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    price: 1299,
    image: 'https://picsum.photos/seed/forest-path/280/312',
    about: 'Explore the lush coffee plantations of Coorg. Learn about coffee making process and enjoy a freshly brewed cup.',
    availability: [
       { date: '2025-10-22', slots: [{ time: '10:00 am', stock: 12 }, { time: '02:00 pm', stock: 8 }] },
       { date: '2025-10-23', slots: [{ time: '10:00 am', stock: 10 }, { time: '02:00 pm', stock: 5 }] },
    ]
  },
];

export const getExperiences = (query: string): Promise<Experience[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!query) {
        resolve(experiences);
      } else {
        const lowerCaseQuery = query.toLowerCase();
        const filtered = experiences.filter(exp =>
          exp.title.toLowerCase().includes(lowerCaseQuery) ||
          exp.location.toLowerCase().includes(lowerCaseQuery) ||
          exp.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
        );
        resolve(filtered);
      }
    }, 500);
  });
};

export const getExperienceById = (id: string): Promise<Experience | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const experience = experiences.find(exp => exp.id === id);
      resolve(experience);
    }, 500);
  });
};

export const validatePromoCode = (code: string): Promise<PromoValidation> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (code.toUpperCase() === 'SAVE10') {
        resolve({ valid: true, discountType: 'PERCENT', value: 10 });
      } else if (code.toUpperCase() === 'FLAT100') {
        resolve({ valid: true, discountType: 'FLAT', value: 100 });
      } else {
        resolve({ valid: false });
      }
    }, 300);
  });
}

export const createBooking = (details: BookingDetails): Promise<{ success: boolean; refId?: string; message?: string }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // In a real app, you would check for double bookings here.
            const refId = `HUF${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
            resolve({ success: true, refId });
        }, 1000);
    });
};
