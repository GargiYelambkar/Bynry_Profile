export interface Profile {
  id: string;
  name: string;
  description: string;
  photoUrl: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  email?: string;
  phone?: string;
  interests?: string[];
  isAdmin?: boolean;
}

export interface SearchProps {
  onSearch: (query: string) => void;
}

export interface FilterOptions {
  name?: string;
  location?: string;
  interests?: string[];
}