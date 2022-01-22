export interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  description: string;
  slug: string;
  released: string;
  short_screenshots: ScreenShots[];
  genres: {
    name: string;
    id: number;
  }[];
  parent_platforms: {
    platform: Platform;
  }[];
  developers: {
    id: number;
    image_background: string;
    name: string;
  }[];
  ratings: {
    percent: number;
    title: string;
    id: number;
  }[];
}
interface Platform {
  id: number;
  name: string;
}
export const initialGame: Game = {
  background_image: '',
  description: '',
  id: 0,
  name: '',
  parent_platforms: [],
  rating: 0,
  released: '',
  short_screenshots: [],
  slug: '',
  genres: [],
  developers: [],
  ratings: [],
};

export interface GamesResponse {
  count: number;
  results: Game[];
}

export interface ScreenShots {
  id: number;
  image: string;
}

export interface Genres {
  results: Genre[];
}
export interface Genre {
  id: number;
  name: string;
  games_count: number;
}

export interface Filters {
  search?: string;
  genre?: string;
  page?: number;
}
export const initialFilters: Filters = {
  search: '',
  genre: '',
  page: 1,
};
