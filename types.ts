
export interface TVChannel {
  id: string;
  name: string;
  logoUrl?: string;
  streamUrl: string; // Placeholder for stream URL
  category: string; 
}

export interface TVCategory {
  name: string;
  channels: TVChannel[];
}
