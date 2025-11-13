
export enum Tone {
  Caustic = "Caustic",
  Poetic = "Poetic",
  DarkHumor = "Dark Humor",
  BrutallyHonest = "Brutally Honest",
  Academic = "Academic",
}

export enum PostType {
  Text = "text",
  Emoji = "emoji",
}

export enum ConfessionStatus {
  Pending = "pending",
  Approved = "approved",
  Flagged = "flagged",
  Rejected = "rejected",
}

export interface Comment {
  id: string;
  text: string;
  createdAt: Date;
}

export interface Confession {
  id: string;
  content: string;
  tone: Tone | null;
  postType: PostType;
  imageUrl?: string;
  createdAt: Date;
  isReadOnce: boolean;
  hasBeenRead: boolean;
  commentsLocked: boolean;
  comments: Comment[];
  upvotes: number;
  status: ConfessionStatus;
  moderationReason?: string;
}

export interface AdminSettings {
  retentionDays: number;
}
