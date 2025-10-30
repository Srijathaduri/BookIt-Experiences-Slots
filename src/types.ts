export interface TimeSlot {
  time: string;
  stock: number;
}

export interface DateSlots {
  date: string;
  slots: TimeSlot[];
}

export interface Experience {
  id: string;
  title: string;
  location: string;
  tags: string[];
  description: string;
  price: number;
  image: string;
  about: string;
  availability: DateSlots[];
}

export interface BookingDetails {
  experience: Experience;
  date: string;
  time: string;
  quantity: number;
}

export interface PromoValidation {
  valid: boolean;
  discountType?: 'FLAT' | 'PERCENT';
  value?: number;
}
