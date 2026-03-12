// src/types/coinDetail.ts
// Shape of the relevant fields from GET /coins/{id}

export type CoinDetail = {
  id: string;
  name: string;
  symbol: string;
  image: { large: string };
  genesis_date: string | null;           // "2009-01-03"
  categories: string[];                  // ["Cryptocurrency", "Proof of Work"]
  description: { en: string };           // HTML-ish text from CoinGecko
  links: {
    homepage: string[];                  // [0] = official website
    twitter_screen_name: string;         // "bitcoin"
    subreddit_url: string;               // "https://www.reddit.com/r/Bitcoin/"
    repos_url: { github: string[] };     // [0] = github repo
  };
};
