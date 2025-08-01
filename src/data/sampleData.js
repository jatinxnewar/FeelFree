// Sample data for FeelFree application
export const sampleDiscussions = [
  {
    id: 1,
    title: "Starting my mental health journey - feeling overwhelmed",
    content: "Hi everyone, I'm new to this community and recently decided to take my mental health seriously. I've been feeling overwhelmed with work and personal life. Does anyone have tips for managing stress and anxiety? I'd really appreciate any advice or support.",
    author: "Anonymous User",
    category: "anxiety",
    tags: ["beginner", "stress", "support"],
    createdAt: "2024-12-28T10:30:00Z",
    likes: 15,
    isLiked: false,
    replies: [
      {
        id: 101,
        content: "Welcome to the community! You're taking a brave first step. I found that starting with small daily practices like 5-minute meditation really helped me.",
        author: "Supporter123",
        createdAt: "2024-12-28T11:15:00Z",
        likes: 5,
        isLiked: false
      },
      {
        id: 102,
        content: "I understand how you're feeling. Breathing exercises and journaling have been game-changers for me. Take it one day at a time! 💙",
        author: "Mindful_Journey",
        createdAt: "2024-12-28T12:00:00Z",
        likes: 8,
        isLiked: false
      }
    ]
  },
  {
    id: 2,
    title: "Celebrating small wins - 30 days anxiety-free!",
    content: "I wanted to share that today marks 30 days since my last major anxiety attack! It's been a journey with therapy, medication, and lots of self-care. Thank you to this community for the support. To anyone struggling - it gets better! 🌟",
    author: "Progress_Warrior",
    category: "success",
    tags: ["milestone", "anxiety", "recovery"],
    createdAt: "2024-12-27T16:45:00Z",
    likes: 42,
    isLiked: true,
    replies: [
      {
        id: 201,
        content: "That's amazing! Congratulations on your progress! 🎉",
        author: "Cheerleader_Friend",
        createdAt: "2024-12-27T17:00:00Z",
        likes: 3,
        isLiked: false
      }
    ]
  },
  {
    id: 3,
    title: "How do you handle difficult family relationships?",
    content: "The holidays have been really tough with family dynamics. I love my family but being around them triggers my depression. How do you set boundaries while still maintaining relationships? Looking for practical advice.",
    author: "Family_Struggles",
    category: "relationships",
    tags: ["family", "boundaries", "holidays"],
    createdAt: "2024-12-26T14:20:00Z",
    likes: 23,
    isLiked: false,
    replies: []
  },
  {
    id: 4,
    title: "Work burnout is real - need coping strategies",
    content: "I've been working 60+ hour weeks for months and I'm completely burned out. My mental health is suffering but I can't afford to quit. What are some strategies for managing work stress and preventing burnout?",
    author: "Overworked_Person",
    category: "work",
    tags: ["burnout", "workplace", "stress"],
    createdAt: "2024-12-25T09:30:00Z",
    likes: 18,
    isLiked: false,
    replies: [
      {
        id: 301,
        content: "I feel you on this. Setting micro-boundaries helped me - like no emails after 7pm, taking actual lunch breaks. Small steps but they add up.",
        author: "Boundary_Setter",
        createdAt: "2024-12-25T10:15:00Z",
        likes: 7,
        isLiked: false
      }
    ]
  }
]

export const sampleMoodEntries = [
  {
    id: 1,
    mood: "happy",
    moodEmoji: "😊",
    moodLabel: "Happy",
    moodColor: "#68d391",
    intensity: 7,
    notes: "Had a great day at work and enjoyed dinner with friends. Feeling grateful!",
    activities: ["Work", "Social", "Food"],
    triggers: [],
    timestamp: "2024-12-28T18:30:00Z"
  },
  {
    id: 2,
    mood: "anxious",
    moodEmoji: "😰",
    moodLabel: "Anxious",
    moodColor: "#a78bfa",
    intensity: 6,
    notes: "Job interview tomorrow. Nervous but trying to stay positive.",
    activities: ["Learning"],
    triggers: ["Work pressure"],
    timestamp: "2024-12-27T20:15:00Z"
  },
  {
    id: 3,
    mood: "okay",
    moodEmoji: "😐",
    moodLabel: "Okay",
    moodColor: "#fbd38d",
    intensity: 5,
    notes: "Neutral day. Nothing particularly good or bad happened.",
    activities: ["Work", "Sleep"],
    triggers: [],
    timestamp: "2024-12-26T19:00:00Z"
  },
  {
    id: 4,
    mood: "sad",
    moodEmoji: "😢",
    moodLabel: "Sad",
    moodColor: "#f687b3",
    intensity: 4,
    notes: "Missing my family during the holidays. Feeling a bit lonely.",
    activities: ["Sleep"],
    triggers: ["Relationships"],
    timestamp: "2024-12-25T16:45:00Z"
  },
  {
    id: 5,
    mood: "very_happy",
    moodEmoji: "😄",
    moodLabel: "Very Happy",
    moodColor: "#4fd1c7",
    intensity: 9,
    notes: "Got promoted at work! Celebrating with loved ones tonight!",
    activities: ["Work", "Social", "Celebration"],
    triggers: [],
    timestamp: "2024-12-24T14:30:00Z"
  }
]

export const mentalHealthResources = [
  {
    id: 1,
    title: "Mindfulness and Meditation Guide",
    description: "A comprehensive guide to starting your mindfulness practice",
    category: "self-help",
    type: "article",
    url: "#",
    tags: ["mindfulness", "meditation", "beginner"]
  },
  {
    id: 2,
    title: "Anxiety Coping Strategies",
    description: "Practical techniques for managing anxiety in daily life",
    category: "anxiety",
    type: "guide",
    url: "#",
    tags: ["anxiety", "coping", "techniques"]
  },
  {
    id: 3,
    title: "Building Healthy Relationships",
    description: "Tips for maintaining healthy relationships and setting boundaries",
    category: "relationships",
    type: "article",
    url: "#",
    tags: ["relationships", "boundaries", "communication"]
  }
]

export const crisisHotlines = [
  {
    country: "United States",
    name: "National Suicide Prevention Lifeline",
    number: "988",
    available: "24/7",
    website: "suicidepreventionlifeline.org"
  },
  {
    country: "United Kingdom",
    name: "Samaritans",
    number: "116 123",
    available: "24/7",
    website: "samaritans.org"
  },
  {
    country: "Canada",
    name: "Talk Suicide Canada",
    number: "1-833-456-4566",
    available: "24/7",
    website: "talksuicide.ca"
  },
  {
    country: "Australia",
    name: "Lifeline",
    number: "13 11 14",
    available: "24/7",
    website: "lifeline.org.au"
  }
]

export const mentalHealthProfessionals = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Anxiety & Depression",
    type: "Psychologist",
    location: "Online & New York, NY",
    rating: 4.9,
    available: true,
    description: "Specializing in cognitive behavioral therapy for anxiety and depression."
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Trauma & PTSD",
    type: "Psychiatrist",
    location: "Los Angeles, CA",
    rating: 4.8,
    available: true,
    description: "Expert in trauma-informed care and EMDR therapy."
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Relationships & Family",
    type: "Marriage & Family Therapist",
    location: "Online",
    rating: 4.7,
    available: false,
    description: "Helping couples and families build stronger relationships."
  }
]
