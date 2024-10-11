export interface Event {
  id: string;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  image: string;
  attendingCount: number;
  interestedCount: number;
  category: string;
}

export interface SearchParams {
  location: string;
  latitude: number;
  longitude: number;
  dateRange: {
    start: string;
    end: string;
  };
  timeRange: {
    start: string;
    end: string;
  };
  keyword: string;
  category: string;
  limit: number;
}