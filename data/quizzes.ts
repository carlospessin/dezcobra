export type QuizCategory = "personality" | "fun" | "future" | "relationship";

export type QuizId =
  | "worth"
  | "rare"
  | "mental_age"
  | "future"
  | "soulmate"
  | "animal"
  | "orkut";

export type QuizBase = {
  id: QuizId;
  href: string;
  emoji: string;
  color: string;
  category: QuizCategory;
};

export type Quiz = QuizBase & {
  title: string;
  description: string;
};

export const quizCatalog: QuizBase[] = [
  {
    id: "worth",
    href: "/worth",
    emoji: "\u{1F4B0}",
    color: "from-yellow-400 to-orange-500",
    category: "personality",
  },
  {
    id: "rare",
    href: "/rare",
    emoji: "\u{1F48E}",
    color: "from-purple-400 to-pink-500",
    category: "personality",
  },
  {
    id: "mental_age",
    href: "/mental-age",
    emoji: "\u{1F9E0}",
    color: "from-blue-400 to-cyan-500",
    category: "personality",
  },
  {
    id: "future",
    href: "/future",
    emoji: "\u{1F52E}",
    color: "from-indigo-400 to-purple-600",
    category: "future",
  },
  {
    id: "soulmate",
    href: "/soulmate",
    emoji: "\u{2764}\u{FE0F}",
    color: "from-pink-400 to-red-500",
    category: "relationship",
  },
  {
    id: "animal",
    href: "/animal",
    emoji: "\u{1F43A}",
    color: "from-green-400 to-emerald-600",
    category: "fun",
  },
  {
    id: "orkut",
    href: "/orkut",
    emoji: "\u{1F464}",
    color: "from-blue-400 to-indigo-600",
    category: "personality",
  },
  
];

