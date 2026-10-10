export interface TeamMember {
  id: string;
  name: string;
  telegramUsername: string;
  telegramUrl?: string;
  position: string;
  roleType: 'founder' | 'admin' | 'staff';
  bio: string;
  badge: string;
  avatarSeed: string;
  favoriteQuote?: string;
  tags: string[];
}

export interface RuleItem {
  number: string;
  title: string;
  summary: string;
  details: string;
  iconName: string;
  badge?: string;
  category?: 'member' | 'admin';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Acara' | 'Obrolan' | 'Konsep' | 'Spanduk';
  image: string;
  description: string;
  date: string;
  tag: string;
}

export interface RegistrationFormData {
  fullName: string;
  telegramUsername: string;
  rpName: string;
  characterArchetype: string;
  referralSource: string;
  agreedToRules: boolean;
}

