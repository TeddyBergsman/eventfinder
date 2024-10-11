import axios from 'axios';
import { Event, SearchParams } from './types';

const API_TOKEN = 'apify_api_KeD1kG7awAgOSM9HCkZjvChruD3Rei3i2KJ8';
const API_URL = 'https://api.apify.com/v2/acts/apify~facebook-events-scraper/run-sync-get-dataset-items';

export const fetchEvents = async (params: SearchParams): Promise<Event[]> => {
  try {
    const { data } = await axios.post(API_URL, {
      token: API_TOKEN,
      location: params.location,
      latitude: params.latitude,
      longitude: params.longitude,
      startDate: params.dateRange.start,
      endDate: params.dateRange.end,
      timeFrom: params.timeRange.start,
      timeTo: params.timeRange.end,
      searchTerm: params.keyword,
      maxItems: params.limit,
    });

    if (!Array.isArray(data)) {
      console.error('Unexpected API response:', data);
      return [];
    }

    return data.map((event: any) => ({
      id: event.id || '',
      name: event.name || '',
      description: event.description || '',
      startTime: event.startTime || '',
      endTime: event.endTime || '',
      location: event.place?.name || 'Unknown location',
      image: event.coverImage || '',
      attendingCount: event.attendingCount || 0,
      interestedCount: event.interestedCount || 0,
      category: event.category || 'Uncategorized',
    }));
  } catch (error) {
    console.error('Error fetching events:', error);
    throw new Error('Failed to fetch events. Please try again.');
  }
};