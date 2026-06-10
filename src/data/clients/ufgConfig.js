/** Ultimate Fitness Gym — client-specific configuration */
export const ufgConfig = {
  brandName: 'Ultimate Fitness Gym',
  shortName: 'UFG',
  tagline: 'Strength · Coaching · Transformation',
  logo: null,

  colors: {
    black: '#050505',
    yellow: '#ffe500',
    white: '#f5f5f5',
    gray: '#8a8a8a',
    surface: '#121212',
    border: 'rgba(255, 255, 255, 0.08)',
  },

  seo: {
    title: 'Ultimate Fitness Gym | Mtayleb & Awkar Lebanon',
    description:
      'Serious strength, coaching, and transformation training at Ultimate Fitness Gym — Mtayleb & Awkar, Lebanon. Join now on WhatsApp.',
  },

  phone: '+961 3 081 084',
  whatsapp: '9613081084',
  whatsappMessage: 'Hi, I want to join Ultimate Fitness Gym. Please share membership details.',

  location: {
    address: 'Mtayleb center, Cotton Mall building, Mtayleb, Lebanon',
    shortAddress: 'Cotton Mall, Mtayleb',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Ultimate+Fitness+Gym+Mtayleb+Lebanon',
    embedUrl: null,
  },

  social: {
    instagram: 'https://www.instagram.com/ufglebanon?igsh=Ym9zbGRnM2RpbGs4',
    facebook:
      'https://www.facebook.com/ufglebanon?mibextid=wwXIfr&mibextid=wwXIfr',
    instagramHandle: 'ufglebanon',
    facebookHandle: 'ufglebanon',
  },

  googleRating: {
    score: 3.8,
    count: 48,
    reviewUrl:
      'https://www.google.com/maps/search/?api=1&query=Ultimate+Fitness+Gym+Mtayleb+Lebanon',
  },

  openingHours: [
    { day: 'Monday – Friday', hours: '7:00 AM – 10:00 PM' },
    { day: 'Saturday', hours: '8:00 AM – 8:00 PM' },
    { day: 'Sunday', hours: '9:00 AM – 6:00 PM' },
  ],
  opensAt: '7 AM',
  opensDisplay: '7AM',

  hero: {
    badge: 'Mtayleb & Awkar',
    headline: 'BUILT FOR STRENGTH',
    subheadline:
      'Lebanon\'s serious training club — elite coaching, premium equipment, and a culture built for fitness and transformation.',
    backgroundImage: null,
    primaryCta: 'Join Now on WhatsApp',
    secondaryCta: 'Visit a Branch',
  },

  whyUfg: {
    eyebrow: 'Why UFG',
    title: 'Train With Purpose',
    subtitle:
      'Not just a gym — a disciplined environment for strength, conditioning, and real body transformation.',
    pillars: [
      {
        id: 'coaching',
        title: 'Elite Coaching',
        description:
          'Expert trainers who push form, progression, and accountability — every session counts.',
        icon: 'dumbbell',
      },
      {
        id: 'transformation',
        title: 'Real Transformation',
        description:
          'Structured programs for fat loss, muscle gain, and total body change — built around your goals.',
        icon: 'target',
      },
      {
        id: 'equipment',
        title: 'Premium Equipment',
        description:
          'Heavy racks, free weights, cardio zones, and functional areas — everything you need to perform.',
        icon: 'shield',
      },
      {
        id: 'community',
        title: 'Two Branches',
        description:
          'Train at Mtayleb or Awkar — same elite standard, same serious training culture.',
        icon: 'users',
      },
    ],
  },

  offer: {
    title: 'Welcome 2026',
    subtitle: 'New membership launch',
    price: '$50',
    priceNote: 'Starting membership',
    urgency: 'Limited time · Limited spots',
    description:
      'Start your transformation with elite coaching, premium equipment, and a disciplined training culture.',
    cta: 'Claim Offer on WhatsApp',
  },

  sections: {
    offer: { eyebrow: 'Launch Offer' },
    services: {
      eyebrow: 'Training Types',
      title: 'Services & Programs',
      subtitle:
        'Strength, conditioning, personal training, and transformation — built for members who show up.',
    },
    memberships: {
      eyebrow: 'Memberships',
      title: 'Choose Your Level',
      subtitle: 'Flexible plans. Serious training. Upgrade when you are ready.',
    },
    transformations: { eyebrow: 'Transformation' },
    trainers: {
      eyebrow: 'Coaching Team',
      title: 'Elite Trainers',
      subtitle:
        'Disciplined coaches. Direct feedback. Results-driven programming.',
    },
    gallery: {
      eyebrow: 'Inside The Club',
      title: 'The Training Floor',
      subtitle:
        'Dark luxury atmosphere. Premium equipment. Built for serious work.',
      itemLabel: 'Club Gallery',
    },
    reviews: { eyebrow: 'Google Reviews' },
    location: {
      eyebrow: 'Contact',
      title: 'Get In Touch',
      locationCardTitle: 'Location',
      hoursCardTitle: 'Opening Hours',
      opensFromLabel: 'Opens from',
      followTitle: 'Follow Us',
      followHint: 'Daily updates and membership offers',
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Quick Answers',
      subtitle: 'Everything you need before you walk in.',
    },
  },

  services: [
    {
      id: 'personal-training',
      title: 'Personal Training',
      description: 'One-on-one coaching built around your goals, form, and progression.',
      icon: 'dumbbell',
    },
    {
      id: 'strength',
      title: 'Strength Area',
      description: 'Heavy racks, free weights, and serious lifting zones for real strength.',
      icon: 'flame',
    },
    {
      id: 'functional',
      title: 'Functional Training',
      description: 'Athletic movement, conditioning, and performance-based workouts.',
      icon: 'zap',
    },
    {
      id: 'cardio',
      title: 'Cardio Zone',
      description: 'Treadmills, bikes, and endurance stations for peak conditioning.',
      icon: 'heart-pulse',
    },
    {
      id: 'nutrition',
      title: 'Nutrition Advice',
      description: 'Practical guidance to fuel performance and accelerate results.',
      icon: 'apple',
    },
    {
      id: 'bodybuilding',
      title: 'Bodybuilding',
      description: 'Hypertrophy-focused training for size, symmetry, and definition.',
      icon: 'trophy',
    },
    {
      id: 'transformation',
      title: 'Transformation Programs',
      description: 'Structured plans for fat loss, muscle gain, and total body change.',
      icon: 'target',
    },
    {
      id: 'smoothie-bar',
      title: 'Smoothie Bar',
      description: 'Post-workout shakes and supplements to recover and perform.',
      icon: 'cup-soda',
    },
  ],

  memberships: [
    {
      id: 'basic',
      name: 'Basic',
      price: '$45',
      period: '/ month',
      description: 'Full gym access and essential training freedom.',
      features: ['Gym floor access', 'Cardio & strength zones', 'Locker access', 'Member community'],
      popular: false,
      cta: 'Join Basic',
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$65',
      period: '/ month',
      description: 'More structure, more coaching, more results.',
      features: [
        'Everything in Basic',
        '2 PT sessions / month',
        'Program check-ins',
        'Priority booking',
      ],
      popular: true,
      cta: 'Join Premium',
    },
    {
      id: 'transformation',
      name: 'Transformation',
      price: '$120',
      period: '/ month',
      description: 'Maximum accountability for serious body change.',
      features: [
        'Everything in Premium',
        'Weekly coaching',
        'Nutrition plan',
        'Progress tracking',
      ],
      popular: false,
      cta: 'Start Transformation',
    },
  ],

  transformations: {
    headline: 'Real Results. Real Discipline.',
    subheadline:
      'Every transformation starts with a decision. We build the system. You execute.',
    cta: 'Book Consultation',
    items: [
      { id: 1, label: '12-Week Cut', caption: 'Fat loss · Strength retained' },
      { id: 2, label: 'Muscle Build', caption: 'Size · Power · Confidence' },
      { id: 3, label: 'Athletic Reset', caption: 'Mobility · Conditioning · Performance' },
    ],
  },

  trainers: [
    {
      id: 'trainer-1',
      name: 'Coach Karim',
      specialty: 'Strength & Hypertrophy',
      bio: 'Built for lifters who want size, power, and clean technique under heavy load.',
      image: null,
    },
    {
      id: 'trainer-2',
      name: 'Coach Maya',
      specialty: 'Fat Loss & Conditioning',
      bio: 'High-intensity programming with precision coaching for visible transformation.',
      image: null,
    },
    {
      id: 'trainer-3',
      name: 'Coach Elias',
      specialty: 'Functional Performance',
      bio: 'Athletic movement, mobility, and performance for members who train like athletes.',
      image: null,
    },
  ],

  gallery: [
    { id: 'g1', alt: 'Strength floor at Ultimate Fitness Gym', caption: 'Strength Floor' },
    { id: 'g2', alt: 'Cardio zone at Ultimate Fitness Gym', caption: 'Cardio Zone' },
    { id: 'g3', alt: 'Free weights area at Ultimate Fitness Gym', caption: 'Free Weights' },
    { id: 'g4', alt: 'Functional training zone at Ultimate Fitness Gym', caption: 'Functional Zone' },
    { id: 'g5', alt: 'Training session at Ultimate Fitness Gym', caption: 'Training Session' },
    { id: 'g6', alt: 'Club atmosphere at Ultimate Fitness Gym', caption: 'Club Atmosphere' },
  ],

  reviews: {
    headline: 'Trusted by the Community',
    subheadline: 'Rated on Google by members who train with us every week.',
    items: [
      {
        id: 'r1',
        name: 'Member Review',
        rating: 5,
        text: 'Serious gym energy. Good equipment and motivating atmosphere for consistent training.',
        date: 'Recent',
      },
      {
        id: 'r2',
        name: 'Member Review',
        rating: 4,
        text: 'Strong community feel. Trainers push you and the vibe keeps you accountable.',
        date: 'Recent',
      },
      {
        id: 'r3',
        name: 'Member Review',
        rating: 4,
        text: 'Great location in Mtayleb. Clean space and solid value for membership.',
        date: 'Recent',
      },
    ],
  },

  faqs: [
    {
      question: 'What time do you open?',
      answer: 'We open at 7 AM on weekdays. See opening hours in the location section.',
    },
    {
      question: 'Is the $50 offer still available?',
      answer:
        'The Welcome 2026 offer is limited-time. Message us on WhatsApp for current availability.',
    },
    {
      question: 'Do you offer personal training?',
      answer:
        'Yes. Personal training and transformation programs are available with our coaching team.',
    },
    {
      question: 'Where are you located?',
      answer: 'Mtayleb center, Cotton Mall building, Mtayleb, Lebanon.',
    },
  ],

  finalCta: {
    headline: 'Start Your Transformation Today',
    subheadline: 'Join on WhatsApp, call us, or walk in at Mtayleb or Awkar.',
    cta: 'Join Now on WhatsApp',
  },

  footer: {
    tagline: 'Strength · Fitness · Transformation',
    copyrightSuffix: 'All rights reserved.',
  },

  nav: [
    { label: 'Why UFG', href: '#why-ufg' },
    { label: 'Services', href: '#services' },
    { label: 'Branches', href: '#branches' },
    { label: 'Offer', href: '#offer' },
    { label: 'Contact', href: '#contact' },
  ],

  copy: {
    builtFor: 'Built for strength.',
    trainWithPurpose: 'Coaching · Fitness · Transformation',
    startToday: 'Limited spots — message us today.',
    opensDailyLabel: 'Opens Daily',
    branchesLabel: 'Branches',
    trainLocalLabel: 'Lebanon',
    viewOfferLabel: 'View launch offer',
    googleRatingLabel: 'Google Rating',
    headerJoinCta: 'Join Now',
    callCta: 'Call Now',
    whatsappCta: 'WhatsApp',
    visitBranchCta: 'Visit Branch',
    reviewOnGoogleCta: 'Review on Google',
    seeLocationCta: 'See Location',
    openMapsCta: 'Open in Google Maps',
    mobileFollowLabel: 'Follow',
  },
}
