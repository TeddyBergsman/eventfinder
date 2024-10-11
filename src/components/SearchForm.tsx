import React, { useState } from 'react';
import { SearchParams } from '../types';
import { Calendar, Clock, MapPin, Search, Sliders } from 'lucide-react';

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [params, setParams] = useState<SearchParams>({
    location: '',
    latitude: 0,
    longitude: 0,
    dateRange: {
      start: new Date().toISOString().split('T')[0],
      end: new Date().toISOString().split('T')[0],
    },
    timeRange: {
      start: new Date().toTimeString().slice(0, 5),
      end: new Date(Date.now() + 2 * 60 * 60 * 1000).toTimeString().slice(0, 5),
    },
    keyword: '',
    category: 'all',
    limit: 100,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(params);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParams((prevParams) => ({
      ...prevParams,
      dateRange: {
        ...prevParams.dateRange,
        [name]: value,
      },
    }));
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParams((prevParams) => ({
      ...prevParams,
      timeRange: {
        ...prevParams.timeRange,
        [name]: value,
      },
    }));
  };

  const handleUseGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setParams({
            ...params,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            location: `Lat: ${position.coords.latitude.toFixed(4)}, Lon: ${position.coords.longitude.toFixed(4)}`,
          });
        },
        (error) => {
          console.error('Error getting geolocation:', error);
          alert('Failed to get your location. Please enter it manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-2">
        <MapPin className="text-gray-400" />
        <input
          type="text"
          name="location"
          value={params.location}
          onChange={handleChange}
          placeholder="Enter location"
          className="flex-grow p-2 border rounded"
        />
        <button
          type="button"
          onClick={handleUseGeolocation}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Use My Location
        </button>
      </div>
      <div className="flex items-center space-x-2">
        <Calendar className="text-gray-400" />
        <input
          type="date"
          name="start"
          value={params.dateRange.start}
          onChange={handleDateChange}
          className="p-2 border rounded"
        />
        <span>to</span>
        <input
          type="date"
          name="end"
          value={params.dateRange.end}
          onChange={handleDateChange}
          className="p-2 border rounded"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Clock className="text-gray-400" />
        <input
          type="time"
          name="start"
          value={params.timeRange.start}
          onChange={handleTimeChange}
          className="p-2 border rounded"
        />
        <span>to</span>
        <input
          type="time"
          name="end"
          value={params.timeRange.end}
          onChange={handleTimeChange}
          className="p-2 border rounded"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Search className="text-gray-400" />
        <input
          type="text"
          name="keyword"
          value={params.keyword}
          onChange={handleChange}
          placeholder="Enter keyword"
          className="flex-grow p-2 border rounded"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Sliders className="text-gray-400" />
        <select
          name="category"
          value={params.category}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="all">All Categories</option>
          <option value="music">Music</option>
          <option value="food">Food</option>
          <option value="arts">Arts</option>
          <option value="sports">Sports</option>
        </select>
        <input
          type="number"
          name="limit"
          value={params.limit}
          onChange={handleChange}
          min="1"
          max="100"
          className="p-2 border rounded w-20"
        />
        <span>results</span>
      </div>
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
        Search Events
      </button>
    </form>
  );
};

export default SearchForm;