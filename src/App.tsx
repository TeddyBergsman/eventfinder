import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchEvents } from './api';
import { Event, SearchParams } from './types';
import SearchForm from './components/SearchForm';
import EventList from './components/EventList';
import { Calendar } from 'lucide-react';

function App() {
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);

  const { data: events, isLoading, error } = useQuery<Event[], Error>(
    ['events', searchParams],
    () => fetchEvents(searchParams!),
    { 
      enabled: !!searchParams,
      retry: false,
      onError: (error) => {
        console.error('Query error:', error);
      }
    }
  );

  const handleSearch = (params: SearchParams) => {
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-600 flex items-center justify-center">
          <Calendar className="mr-2" />
          Facebook Events Finder
        </h1>
      </header>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <SearchForm onSearch={handleSearch} />
        </div>
        {isLoading && <p className="text-center">Loading events...</p>}
        {error && <p className="text-center text-red-500">Error: {error.message}</p>}
        {events && events.length > 0 ? (
          <EventList events={events} />
        ) : (
          searchParams && <p className="text-center">No events found. Try adjusting your search parameters.</p>
        )}
      </div>
    </div>
  );
}

export default App;