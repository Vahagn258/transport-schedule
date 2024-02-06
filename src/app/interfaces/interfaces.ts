export interface IResponse {
  interval_segments: any[],
  pagination: {
    total: number,
    limit: number,
    offset: number
  },
  search: {
    date: string,
    from: IPlace,
    to: IPlace
  },
  segments: ISegment[]
}

export interface IPlace {
  code: string,
  popular_title: string,
  short_title: string,
  title: string,
  type: string
}

export interface ISegment {
  arrival: string,
  arrival_platform: string,
  arrival_terminal: string | null,
  departure: string,
  departure_platform: string,
  departure_terminal: string | null,
  duration: number,
  from: IStation,
  to: IStation,
  has_transfers: boolean,
  start_date: string,
  stops: string,
  tickets_info: {
    et_marker: boolean,
    places: any[]
  },
  thread: IThread,
  [key: string]: any
}

export interface IStation {
  code: string,
  type: string,
  popular_title: string,
  short_title: string,
  station_type: string,
  station_type_name: string,
  title: string,
  transport_type: 'plane' | 'train' | 'suburban' | 'bus' | 'water' | 'helicopter'
}

export interface IThread {
  carrier: ICarrier,
  express_type: any,
  number: string,
  short_title: string,
  thread_method_link: string,
  title: string,
  transport_subtype: {
    code: any,
    color: any,
    title: any
  },
  transport_type: 'plane' | 'train' | 'suburban' | 'bus' | 'water' | 'helicopter',
  uid: string,
  vehicle: any
}

export interface ICarrier {
  address: string,
  code: number,
  codes: {
    iata: any,
    icao: any,
    sirena: any
  },
  contacts: string,
  email: string,
  logo: string,
  logo_svg: string | null,
  phone: string,
  title: string,
  url: string
}
