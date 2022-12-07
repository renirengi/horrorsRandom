export interface IFilterConfig {
  name: TFilterName;
  title: string;
  type: 'list' | 'range';
  options?: IFilterConfigOption[];
  range?: IFilterConfigRange[];
}

export interface IFilterConfigOption {
  value: string;
  text: string;
}

export interface IFilterConfigRange {
  value: number;
  placeholder: string;
  label: string;
}

export type TFilterName = 'year' | 'genres' | 'countries' | 'rating' | 'director';
