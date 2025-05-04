
export interface Topic {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const generalTopic: Topic = {
  id: "general",
  name: "General Discussion",
  description: "Chat about anything and everything",
  icon: "💬",
};

export const gamesTopic: Topic = {
  id: "games",
  name: "Gaming",
  description: "Discuss your favorite games and gaming news",
  icon: "🎮",
};

export const moviesTopic: Topic = {
  id: "movies",
  name: "Movies & TV",
  description: "Talk about the latest films and shows",
  icon: "🎬",
};

export const sportsTopic: Topic = {
  id: "sports",
  name: "Sports",
  description: "Discuss sports events and teams",
  icon: "⚽",
};

export const technologyTopic: Topic = {
  id: "technology",
  name: "Technology",
  description: "Chat about tech news and gadgets",
  icon: "💻",
};
