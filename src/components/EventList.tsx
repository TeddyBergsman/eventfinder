import React from 'react';
import { Event } from '../types';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

interface EventListProps {
  events: Event[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="bg-white rounded-lg shadow-md p-4">
          <img src={event.image} alt={event.name} className="w-full h-48 object-cover rounded-t-lg mb-4" />
          <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
          <p className="text-gray-600 mb-2">{event.description.slice(0, 100)}...</p>
          <div className="flex items-center space-x-2 text-gray-500 mb-2">
            <Calendar className="w-4 h-4" />
            <span>{new Date(event.startTime).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-500 mb-2">
            <Clock className="w-4 h-4" />
            <span>{new Date(event.startTime).toLocaleTimeString()} - {new Date(event.endTime).toLocaleTimeString()}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-500 mb-2">
            <MapPin className="w-4 h-4" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-500">
            <Users className="w-4 h-4" />
            <span>{event.attendingCount} attending · {event.interestedCount} interested</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;