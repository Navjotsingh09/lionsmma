// Page content. Facts come from lionsmma.net. Anything marked CONFIRM was added
// in the design and needs the club's sign-off before launch (see README).

export const nav = [
  { href: '/classes', label: 'Classes' },
  { href: '/clubs', label: 'Clubs' },
  { href: '/punjab-projects', label: 'Punjab projects' },
  { href: '/about', label: 'About' },
  { href: '/faqs', label: 'FAQs' },
];

export const socials = [
  { label: 'Facebook', href: 'http://www.facebook.com/lionsmmaofficial', handle: 'lionsmmaofficial' },
  { label: 'Instagram', href: 'http://instagram.com/lionsmmaofficial', handle: '@lionsmmaofficial' },
];

export const goals = [
  {
    n: '01',
    title: 'Sikhi',
    heading: 'Train where you feel at home',
    body: 'Every Lions MMA club runs from Gurdwara premises — the Gurdwara itself, its gym or its community centre. Young Sikhs learn self-defence in a relaxed, family setting, and keep coming back to the Gurdwara.',
    // Real Lions MMA training hall with its Sikh-warrior mural (from lionsmma.net).
    photo: 'https://images.squarespace-cdn.com/content/v1/5a04ac00be42d68a3d61ca75/1524861797601-20W9YOHFOYBOQTOWGYAZ/Lions+%286%29.jpg?format=2500w',
    faqs: [
      { q: 'Why do we train at the Gurdwara?', a: 'It gives Sikh youth a place to train among fellow Sikh brothers and sisters, somewhere they feel comfortable — and it encourages them to visit the Gurdwara.' },
      { q: 'Is it right for complete beginners?', a: 'Yes. Learning martial arts is something everyone can do. Classes are split by age and level.' },
    ],
  },
  {
    n: '02',
    title: 'Martial arts',
    heading: 'Self-defence is part of Sikh history',
    body: 'From the wrestling introduced by Guru Angad Dev Ji and the emergence of Shastar Vidya, to the Saint Soldier of Guru Hargobind Sahib Ji and the Khalsa Panth of Guru Gobind Singh Ji.',
    photo: 'https://images.pexels.com/photos/13808098/pexels-photo-13808098.jpeg?auto=compress&cs=tinysrgb&w=1600',
    faqs: [
      { q: 'Which martial arts do you teach?', a: 'Muay Thai, Jiu-Jitsu, boxing and MMA, plus CrossFit at Huddersfield. Each club runs its own timetable.' },
      { q: 'Do I have to compete?', a: 'No. Train to whatever level suits you — to compete as a fighter, for fitness or for personal self-defence.' },
    ],
  },
  {
    n: '03',
    title: 'Healthy lifestyle',
    heading: 'Confidence, discipline and self-esteem',
    body: 'A good workout, traditional training and a family atmosphere. Students follow five values: spirit, dedication, loyalty, an open mind and a willingness to train.',
    photo: '/photos/goal-confidence.jpg',
    faqs: [
      { q: 'Is there a class for women?', a: 'Yes — women’s Muay Thai runs on Thursdays at Willenhall, 6:00–7:00pm.' },
      { q: 'Can parents and children both train?', a: 'Yes. Many clubs run kids and adults classes on the same evening.' },
    ],
  },
  {
    n: '04',
    title: 'Charity work',
    heading: 'Inspiring the youth of Punjab',
    body: 'After two successful years of the Fun Run/Walk, the Lions MMA team ran Sikhi, MMA and drug & alcohol awareness camps at schools in Punjab, reaching thousands of students.',
    photo: '/photos/goal-youth.jpg',
    faqs: [
      { q: 'How can I help?', a: 'Volunteer your time or skills, or donate. Every bit helps us reach more children.' },
      { q: 'What happens next?', a: 'We plan to reach over 5,000 children next year, with full-time support for children dealing with substance abuse.' },
    ],
  },
];

export const steps = [
  { photo: '/photos/step-find-club.jpg', title: 'Find your club', body: 'Nine clubs, all on Gurdwara premises. Pick the one nearest you.' },
  { photo: '/photos/step-free-class.jpg', title: 'Try a free class', body: 'Book online in a minute. No kit and no contract — just come as you are.' }, // CONFIRM: free first class
  { photo: '/photos/step-train-weekly.jpg', title: 'Train every week', body: 'Muay Thai, Jiu-Jitsu, boxing and MMA, split by age and level.' },
  { photo: '/photos/step-grade-grow.jpg', title: 'Grade and grow', body: 'Gradings mark every step. Confidence and discipline follow.' }, // CONFIRM: gradings
];

// CONFIRM: rows marked * were added in the design.
export const included = [
  ['Free first class*', 'No kit, no contract'],
  ['Weekly classes', 'Muay Thai, Jiu-Jitsu, boxing, MMA'],
  ['Split by age and level', 'Kids, adults and advanced groups'],
  ['Women’s classes', 'Thursdays at Willenhall'],
  ['Gradings*', 'Clear steps as you improve'],
  ['Family atmosphere', 'Train alongside your family'],
  ['Nine clubs', 'All on Gurdwara premises'],
  ['Sikh heritage', 'The martial history of the Gurus'],
  ['Community', 'Fun runs, camps, Punjab projects'],
] as const;

export const coaches = [
  { photo: 'https://images.pexels.com/photos/16552870/pexels-photo-16552870.jpeg?auto=compress&cs=tinysrgb&w=1600', club: 'Leicester · Boxing', name: 'Amarjit Singh', role: 'Boxing coach, all levels', body: 'Runs boxing on Wednesdays, 6:00–7:30pm at Gurdwara Sri Dasmesh Sahib.', href: '/clubs/leicester' },
  { photo: 'https://images.pexels.com/photos/17474771/pexels-photo-17474771.jpeg?auto=compress&cs=tinysrgb&w=1600', club: 'Leicester · Kids MMA', name: 'Sandeep Singh', role: 'Kids MMA coach', body: 'Runs Kids MMA on Saturdays, 2:00–3:30pm at Gurdwara Sri Dasmesh Sahib.', href: '/clubs/leicester' },
  { photo: 'https://images.pexels.com/photos/16552800/pexels-photo-16552800.jpeg?auto=compress&cs=tinysrgb&w=1600', club: 'Bradford · Kids Muay Thai', name: 'Charandeep Singh', role: 'Club contact, Bradford', body: 'Kids Muay Thai on Thursdays, 6:30–7:30pm at Gurdwara Singh Sabha.', href: '/clubs/bradford' },
];

export const punjabStories = [
  { photo: 'https://images.pexels.com/photos/8745178/pexels-photo-8745178.jpeg?auto=compress&cs=tinysrgb&w=1600', title: '1,000+ students reached', body: 'Sikhi, MMA and drug & alcohol awareness camps at schools across Punjab.' },
  { photo: 'https://images.pexels.com/photos/16552800/pexels-photo-16552800.jpeg?auto=compress&cs=tinysrgb&w=1600', title: 'Our first gym in Punjab', body: 'Lions MMA opened its very first gym, and runs free martial arts sessions in schools.' },
  { photo: 'https://images.pexels.com/photos/13808098/pexels-photo-13808098.jpeg?auto=compress&cs=tinysrgb&w=1600', title: 'Two years of fun runs', body: 'Families in the UK ran and walked to fund the first camps.' },
  { photo: 'https://images.pexels.com/photos/16552800/pexels-photo-16552800.jpeg?auto=compress&cs=tinysrgb&w=1600', title: '52 schools', body: 'Drugs education camps for children from 52 schools.' },
];

export const punjabDone = [
  'Reached out to over a thousand students',
  'Offered substance abuse awareness to children',
  'Run drugs education camps for children from 52 schools',
  'Opened our very first Lions MMA gym',
  'Run free martial arts sessions in schools',
];

export const punjabNext = [
  'Recruit full-time social workers',
  'Enrol a drugs education programme in schools',
  'Offer more free martial arts for children',
  'Enrol a Gurbani educational course in schools',
];

export const helpText =
  'We’re looking for volunteers who can help us reach and support thousands of children in Punjab. Whatever your field of work or skills, there is something we can all do. Your donations help us work with more children and run more camps.';

export const tiles = [
  { photo: 'https://images.pexels.com/photos/7991709/pexels-photo-7991709.jpeg?auto=compress&cs=tinysrgb&w=1600', title: 'Women’s Muay Thai', place: 'Willenhall', href: '/clubs/willenhall' },
  { photo: 'https://images.pexels.com/photos/16552870/pexels-photo-16552870.jpeg?auto=compress&cs=tinysrgb&w=1600', title: 'Kids Muay Thai', place: 'Tividale', href: '/clubs/tividale' },
  { photo: 'https://images.pexels.com/photos/6720455/pexels-photo-6720455.jpeg?auto=compress&cs=tinysrgb&w=1600', title: 'Kids Muay Thai', place: 'Wolverhampton', href: '/clubs/wolverhampton' },
  { photo: 'https://images.pexels.com/photos/16552870/pexels-photo-16552870.jpeg?auto=compress&cs=tinysrgb&w=1600', title: 'Boxing, all levels', place: 'Leicester', href: '/clubs/leicester' },
  { photo: 'https://images.pexels.com/photos/13808098/pexels-photo-13808098.jpeg?auto=compress&cs=tinysrgb&w=1600', title: 'Adults Muay Thai', place: 'Hitchin', href: '/clubs/hitchin' },
  { photo: 'https://images.pexels.com/photos/5750886/pexels-photo-5750886.jpeg?auto=compress&cs=tinysrgb&w=1600', title: 'Kids Muay Thai', place: 'Bradford', href: '/clubs/bradford' },
  { photo: 'https://images.pexels.com/photos/5424668/pexels-photo-5424668.jpeg?auto=compress&cs=tinysrgb&w=1600', title: 'Adults Jiu-Jitsu', place: 'Capehill Smethwick', href: '/clubs/capehill-smethwick' },
  { photo: 'https://images.pexels.com/photos/16552800/pexels-photo-16552800.jpeg?auto=compress&cs=tinysrgb&w=1600', title: 'Free classes', place: 'Punjab', href: '/punjab-projects' },
];

export const disciplines = [
  {
    photo: 'https://images.pexels.com/photos/13808098/pexels-photo-13808098.jpeg?auto=compress&cs=tinysrgb&w=1600',
    name: 'Muay Thai',
    who: 'Kids and adults · Beginner to advanced',
    body: 'The art of eight limbs — punches, kicks, knees and elbows. Our most taught class, from first-timers to advanced students.',
    groups: ['Kids', 'Adults'],
    clubs: ['bradford', 'capehill-smethwick', 'hitchin', 'huddersfield', 'willenhall', 'wolverhampton', 'tividale'],
  },
  {
    photo: 'https://images.pexels.com/photos/7991709/pexels-photo-7991709.jpeg?auto=compress&cs=tinysrgb&w=1600',
    name: 'Women’s Muay Thai',
    who: 'Women · All levels',
    body: 'A welcoming women-only class to learn Muay Thai, build fitness and feel confident defending yourself.',
    groups: ['Women'],
    clubs: ['willenhall'],
  },
  {
    photo: 'https://images.pexels.com/photos/5424668/pexels-photo-5424668.jpeg?auto=compress&cs=tinysrgb&w=1600',
    name: 'Jiu-Jitsu',
    who: 'Adults · All levels',
    body: 'Ground-based grappling: control, escapes and submissions. Brilliant for self-defence and fitness.',
    groups: ['Adults'],
    clubs: ['capehill-smethwick'],
  },
  {
    photo: 'https://images.pexels.com/photos/16552870/pexels-photo-16552870.jpeg?auto=compress&cs=tinysrgb&w=1600',
    name: 'Boxing',
    who: 'All levels',
    body: 'Footwork, combinations and pad work, coached step by step in a friendly, disciplined room.',
    groups: ['Adults'],
    clubs: ['leicester'],
  },
  {
    photo: 'https://images.pexels.com/photos/11391876/pexels-photo-11391876.jpeg?auto=compress&cs=tinysrgb&w=1600',
    name: 'Kids MMA',
    who: 'Kids',
    body: 'Striking and grappling for children, with games, discipline and plenty of confidence-building.',
    groups: ['Kids'],
    clubs: ['leicester'],
  },
  {
    photo: 'https://images.pexels.com/photos/5424668/pexels-photo-5424668.jpeg?auto=compress&cs=tinysrgb&w=1600',
    name: 'CrossFit',
    who: 'Adults · All levels',
    body: 'A tough, scalable workout to build strength and stamina alongside your martial arts.',
    groups: ['Adults'],
    clubs: ['huddersfield'],
  },
] as const;

export const heritage = [
  { name: 'Guru Angad Dev Ji', body: 'Introduced wrestling, keeping body and mind strong.' },
  { name: 'Shastar Vidya', body: 'The traditional Sikh science of arms and self-defence.' },
  { name: 'Guru Hargobind Sahib Ji', body: 'The rise of the Saint Soldier — spiritual and temporal strength.' },
  { name: 'Guru Gobind Singh Ji', body: 'Fighting for truth, irrespective of faith — the Khalsa Panth.' },
];

export const values = ['Spirit', 'Dedication', 'Loyalty', 'Open mind', 'Willingness to train'];

export const story = [
  'Lions MMA opened its first door in December 2010. Since then we have grown and worked closely with Sevadaars across the UK and Punjab.',
  'Unlike other clubs, every Lions MMA club runs from Gurdwara premises — the Gurdwara itself, Gurdwara gyms or community centres. Sikh youth can train in a relaxed, family environment, among fellow Sikh brothers and sisters, and it encourages them to visit the Gurdwara.',
  'We as Sikhs need to take steps to defend ourselves, our Gurdwaras, our families and the rest of the community. Whether you want to compete, get fit or learn self-defence, we’ll help you train to whatever level suits you.',
];

export const stats = [
  { value: '2010', label: 'First club opened' },
  { value: '9', label: 'UK clubs on Gurdwara premises' },
  { value: '1,000+', label: 'Students reached in Punjab' },
  { value: '52', label: 'Schools visited for awareness camps' },
];

// CONFIRM: FAQ answers with * were written for the site.
export const faqs: { category: string; items: { q: string; a: string }[] }[] = [
  {
    category: 'Getting started',
    items: [
      { q: 'Do I need any experience?', a: 'No. Learning martial arts is something everyone can do, and classes are split by age and level. Your coach will help you settle in.' },
      { q: 'How do I book a free class?', a: 'Choose your club and class on our booking page and leave your details. The club will confirm your place.' },
      { q: 'What should I wear to my first class?', a: 'Comfortable sportswear — a T-shirt and shorts or leggings — and bring a water bottle. Arrive 10 minutes early to meet the coach.' },
      { q: 'Can anyone join?', a: 'Learning martial arts is something everyone can do. Our clubs are rooted in Sikhi and run from Gurdwara premises — get in touch with your nearest club.' },
    ],
  },
  {
    category: 'Kids and parents',
    items: [
      { q: 'What age can my child start?', a: 'Kids classes start from age 5 at some clubs (for example Tividale’s 5–10s class). Check your club’s timetable for its age groups.' },
      { q: 'Can I watch my child’s class?', a: 'Ask your club — most are happy for parents to watch from the side, especially for a first class.' },
      { q: 'How do you keep children safe?', a: 'Classes are run by our coaches and split by age and level. We ask for emergency contact details when you join.' },
    ],
  },
  {
    category: 'Membership',
    items: [
      { q: 'How much does it cost?', a: 'Prices are set by each club. Your club will talk you through the options at your first class.' },
      { q: 'Can I cancel anytime?', a: 'Speak to your club — they’ll explain how membership works.' },
      { q: 'Can I train at more than one club?', a: 'Ask the clubs you’d like to train at. Many members train at their nearest club.' },
    ],
  },
  {
    category: 'Punjab projects',
    items: [
      { q: 'How can I help in Punjab?', a: 'Volunteer your time or skills, or make a donation. Whatever your field of work, there is something you can do.' },
      { q: 'What do donations pay for?', a: 'They help us work with more children and run more drugs education camps in schools.' },
    ],
  },
];
