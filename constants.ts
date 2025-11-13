
import { Tone, Confession, PostType, ConfessionStatus } from './types';

export const TONES: Tone[] = [
  Tone.Caustic,
  Tone.Poetic,
  Tone.DarkHumor,
  Tone.BrutallyHonest,
  Tone.Academic,
];

export const INITIAL_CONFESSIONS: Confession[] = [
  {
    id: '1',
    content: 'I still check my university email hoping for a notification, even though I graduated 5 years ago.',
    tone: null,
    postType: PostType.Text,
    createdAt: new Date(Date.now() - 3600 * 1000 * 4), // 4 hours ago
    isReadOnce: false,
    hasBeenRead: false,
    commentsLocked: false,
    comments: [{ id: 'c1', text: 'Same here!', createdAt: new Date() }],
    upvotes: 12,
    status: ConfessionStatus.Approved,
  },
  {
    id: '2',
    content: 'Sometimes I pretend to be on an important call to avoid talking to people in the hallway.',
    tone: Tone.DarkHumor,
    postType: PostType.Text,
    createdAt: new Date(Date.now() - 3600 * 1000 * 12), // 12 hours ago
    isReadOnce: true,
    hasBeenRead: false,
    commentsLocked: false,
    comments: [],
    upvotes: 45,
    status: ConfessionStatus.Approved,
  },
  {
    id: '3',
    content: '🤫🤫🤫',
    tone: null,
    postType: PostType.Emoji,
    createdAt: new Date(Date.now() - 3600 * 1000 * 22), // 22 hours ago
    isReadOnce: false,
    hasBeenRead: false,
    commentsLocked: true,
    comments: [],
    upvotes: 8,
    status: ConfessionStatus.Approved,
  },
    {
    id: '4',
    content: 'This confession needs a human to look at it. It is not harmful, but it is borderline.',
    tone: null,
    postType: PostType.Text,
    createdAt: new Date(),
    isReadOnce: false,
    hasBeenRead: false,
    commentsLocked: false,
    comments: [],
    upvotes: 0,
    status: ConfessionStatus.Pending,
    moderationReason: "Potentially sensitive content."
  },
  {
    id: '5',
    content: 'This confession is very concerning and might violate policies about user safety.',
    tone: null,
    postType: PostType.Text,
    createdAt: new Date(),
    isReadOnce: false,
    hasBeenRead: false,
    commentsLocked: false,
    comments: [],
    upvotes: 0,
    status: ConfessionStatus.Flagged,
    moderationReason: "High-risk content related to self-harm."
  }
];
