// UK clubs and timetables, taken from lionsmma.net/uk-clubs (October 2026).
// Every club runs from Gurdwara premises.

export type Group = 'Kids' | 'Adults' | 'Women';
export type Discipline = 'Muay Thai' | 'Jiu-Jitsu' | 'Boxing' | 'MMA' | 'CrossFit';
export type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export type Session = {
  day: Day;
  start: string; // 24h "HH:MM"
  end: string;
  name: string;
  detail?: string; // level or age band
  group: Group;
  discipline: Discipline;
  instructor?: string;
};

export type Club = {
  slug: string;
  name: string;
  venue: string;
  venueDetail?: string;
  street: string;
  town: string;
  postcode: string;
  phone: string;
  contact?: string;
  photo: string;
  lat: number;
  lng: number;
  sessions: Session[];
};

export const EMAIL = 'info@lionsmma.net';
export const MAIN_PHONE = '07816 824618';

export const clubs: Club[] = [
  {
    slug: 'bradford',
    name: 'Bradford',
    venue: 'Gurdwara Singh Sabha',
    street: 'Grant Street',
    town: 'Bradford',
    postcode: 'BD3 9HD',
    phone: '07858 607577',
    contact: 'Charandeep Singh',
    photo: 'https://images.pexels.com/photos/31403621/pexels-photo-31403621.jpeg?auto=compress&cs=tinysrgb&w=1600',
    lat: 53.79,
    lng: -1.735,
    sessions: [{ day: 'Thursday', start: '18:30', end: '19:30', name: 'Kids Muay Thai', group: 'Kids', discipline: 'Muay Thai' }],
  },
  {
    slug: 'capehill-smethwick',
    name: 'Capehill Smethwick',
    venue: 'Nanaksar Gurdwara',
    street: 'Waterloo Road, Cape Hill',
    town: 'Smethwick',
    postcode: 'B66 4JS',
    phone: '07720 078697',
    photo: 'https://images.pexels.com/photos/5424668/pexels-photo-5424668.jpeg?auto=compress&cs=tinysrgb&w=1600',
    lat: 52.488,
    lng: -1.968,
    sessions: [
      { day: 'Wednesday', start: '18:00', end: '19:00', name: 'Kids Muay Thai', group: 'Kids', discipline: 'Muay Thai' },
      { day: 'Wednesday', start: '19:00', end: '20:30', name: 'Adults Jiu-Jitsu', group: 'Adults', discipline: 'Jiu-Jitsu' },
      { day: 'Saturday', start: '11:30', end: '12:30', name: 'Adults Muay Thai', group: 'Adults', discipline: 'Muay Thai' },
      { day: 'Saturday', start: '12:30', end: '13:30', name: 'Kids Muay Thai', group: 'Kids', discipline: 'Muay Thai' },
    ],
  },
  {
    slug: 'gravesend',
    name: 'Gravesend',
    venue: 'Guru Nanak Darbar Gurdwara',
    street: 'Saddington Street',
    town: 'Gravesend',
    postcode: 'DA12 1AG',
    phone: '07415 734681',
    photo: 'https://images.pexels.com/photos/5750886/pexels-photo-5750886.jpeg?auto=compress&cs=tinysrgb&w=1600',
    lat: 51.441,
    lng: 0.371,
    sessions: [],
  },
  {
    slug: 'hitchin',
    name: 'Hitchin',
    venue: 'Sri Guru Singh Sabha Gurdwara',
    street: '50 Wilbury Way',
    town: 'Hitchin',
    postcode: 'SG4 0TP',
    phone: '07742 772238',
    photo: 'https://images.pexels.com/photos/8611942/pexels-photo-8611942.jpeg?auto=compress&cs=tinysrgb&w=1600',
    lat: 51.96,
    lng: -0.27,
    sessions: [
      { day: 'Friday', start: '20:00', end: '21:30', name: 'Adults Muay Thai', group: 'Adults', discipline: 'Muay Thai' },
      { day: 'Saturday', start: '09:00', end: '10:15', name: 'Kids Muay Thai', detail: 'Ages 6–15', group: 'Kids', discipline: 'Muay Thai' },
    ],
  },
  {
    slug: 'huddersfield',
    name: 'Huddersfield',
    venue: 'Sri Guru Singh Sabha Sikh Temple',
    street: '34 Hillhouse Lane, Fartown',
    town: 'Huddersfield',
    postcode: 'HD1 6JT',
    phone: '07908 550413',
    photo: 'https://images.pexels.com/photos/31403621/pexels-photo-31403621.jpeg?auto=compress&cs=tinysrgb&w=1600',
    lat: 53.659,
    lng: -1.786,
    sessions: [
      { day: 'Thursday', start: '17:30', end: '18:15', name: 'Kids Muay Thai', group: 'Kids', discipline: 'Muay Thai' },
      { day: 'Thursday', start: '18:30', end: '19:30', name: 'Adults CrossFit', group: 'Adults', discipline: 'CrossFit' },
    ],
  },
  {
    slug: 'leicester',
    name: 'Leicester',
    venue: 'Gurdwara Sri Dasmesh Sahib',
    street: '49 Gipsy Lane',
    town: 'Leicester',
    postcode: 'LE4 6RB',
    phone: '07403 009096',
    photo: 'https://images.pexels.com/photos/16552870/pexels-photo-16552870.jpeg?auto=compress&cs=tinysrgb&w=1600',
    lat: 52.65,
    lng: -1.11,
    sessions: [
      { day: 'Wednesday', start: '18:00', end: '19:30', name: 'Boxing', detail: 'All levels', group: 'Adults', discipline: 'Boxing', instructor: 'Amarjit Singh' },
      { day: 'Saturday', start: '14:00', end: '15:30', name: 'Kids MMA', group: 'Kids', discipline: 'MMA', instructor: 'Sandeep Singh' },
    ],
  },
  {
    slug: 'willenhall',
    name: 'Willenhall',
    venue: 'Guru Nanak Gurdwara Willenhall',
    venueDetail: 'Baba Deep Singh Gym',
    street: 'Walsall Road',
    town: 'Willenhall',
    postcode: 'WV13 2RD',
    phone: '07816 824618',
    photo: 'https://images.pexels.com/photos/8612065/pexels-photo-8612065.jpeg?auto=compress&cs=tinysrgb&w=1600',
    lat: 52.585,
    lng: -2.04,
    sessions: [
      { day: 'Monday', start: '17:30', end: '18:30', name: 'Kids Muay Thai', detail: 'Beginners', group: 'Kids', discipline: 'Muay Thai' },
      { day: 'Monday', start: '18:15', end: '19:15', name: 'Kids Muay Thai', detail: 'Intermediate', group: 'Kids', discipline: 'Muay Thai' },
      { day: 'Tuesday', start: '18:00', end: '19:15', name: 'Kids Muay Thai', detail: 'Advanced', group: 'Kids', discipline: 'Muay Thai' },
      { day: 'Thursday', start: '18:00', end: '19:00', name: 'Women’s Muay Thai', detail: 'All levels', group: 'Women', discipline: 'Muay Thai' },
      { day: 'Thursday', start: '18:15', end: '19:15', name: 'Adults Muay Thai', detail: 'All levels', group: 'Adults', discipline: 'Muay Thai' },
      { day: 'Thursday', start: '18:30', end: '19:30', name: 'Kids Muay Thai', detail: 'Advanced', group: 'Kids', discipline: 'Muay Thai' },
    ],
  },
  {
    slug: 'wolverhampton',
    name: 'Wolverhampton',
    venue: 'Guru Nanak Gurdwara',
    venueDetail: 'Sarbloh Gym',
    street: 'Duncan Street (off Sedgley Street)',
    town: 'Wolverhampton',
    postcode: 'WV2 4AJ',
    phone: '07967 205496',
    photo: 'https://images.pexels.com/photos/5999191/pexels-photo-5999191.jpeg?auto=compress&cs=tinysrgb&w=1600',
    lat: 52.576,
    lng: -2.13,
    sessions: [
      { day: 'Monday', start: '17:30', end: '18:45', name: 'Kids Muay Thai', detail: 'Beginners', group: 'Kids', discipline: 'Muay Thai' },
      { day: 'Monday', start: '18:45', end: '19:45', name: 'Kids Muay Thai', detail: 'Intermediate', group: 'Kids', discipline: 'Muay Thai' },
    ],
  },
  {
    slug: 'tividale',
    name: 'Tividale',
    venue: 'Gurdwara Guru Hargobind Sahib',
    street: 'Dudley Road West',
    town: 'Tividale',
    postcode: 'B69 2PJ',
    phone: '07832 264728',
    photo: 'https://images.pexels.com/photos/17474771/pexels-photo-17474771.jpeg?auto=compress&cs=tinysrgb&w=1600',
    lat: 52.51,
    lng: -2.05,
    sessions: [
      { day: 'Wednesday', start: '17:00', end: '18:00', name: 'Kids Muay Thai', detail: 'Ages 5–10', group: 'Kids', discipline: 'Muay Thai' },
      { day: 'Wednesday', start: '18:00', end: '19:30', name: 'Kids Muay Thai', detail: 'Ages 10+', group: 'Kids', discipline: 'Muay Thai' },
    ],
  },
];

export const DAYS: Day[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function getClub(slug: string) {
  return clubs.find((c) => c.slug === slug);
}

export function formatTime(t: string) {
  const [h, m] = t.split(':').map(Number);
  const suffix = h >= 12 ? 'pm' : 'am';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, '0')}${suffix}`;
}

export function formatRange(s: Pick<Session, 'start' | 'end'>) {
  return `${formatTime(s.start)}–${formatTime(s.end)}`;
}

export function sortedSessions(club: Club) {
  return [...club.sessions].sort((a, b) => DAYS.indexOf(a.day) - DAYS.indexOf(b.day) || a.start.localeCompare(b.start));
}

/** Class names shown as tags on a club card, e.g. "Kids Muay Thai", "Adults Jiu-Jitsu". */
export function classTags(club: Club) {
  return [...new Set(club.sessions.map((s) => s.name))];
}

export function firstSession(club: Club) {
  const s = sortedSessions(club)[0];
  return s ? `${s.day.slice(0, 3)} ${formatTime(s.start)}` : null;
}

export function directionsUrl(club: Club) {
  const q = encodeURIComponent(`${club.venue}, ${club.street}, ${club.town} ${club.postcode}`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

export function telHref(phone: string) {
  return `tel:+44${phone.replace(/\s/g, '').replace(/^0/, '')}`;
}

export const nearby: Record<string, string[]> = {
  bradford: ['huddersfield', 'leicester', 'wolverhampton'],
  huddersfield: ['bradford', 'leicester', 'wolverhampton'],
  'capehill-smethwick': ['tividale', 'willenhall', 'wolverhampton'],
  tividale: ['capehill-smethwick', 'willenhall', 'wolverhampton'],
  willenhall: ['wolverhampton', 'tividale', 'capehill-smethwick'],
  wolverhampton: ['willenhall', 'tividale', 'capehill-smethwick'],
  leicester: ['capehill-smethwick', 'tividale', 'hitchin'],
  hitchin: ['gravesend', 'leicester', 'capehill-smethwick'],
  gravesend: ['hitchin', 'leicester', 'capehill-smethwick'],
};
