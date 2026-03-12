# CryptoInsight

> Real-time cryptocurrency market data dashboard with educational focus.

Built by **Alden Merlin** as an open-source portfolio project demonstrating modern frontend engineering practices.

---

## What it is

CryptoInsight is a web platform that visualizes live cryptocurrency market data and helps beginners understand the crypto ecosystem through clean charts, real numbers, and straightforward information.

**It is not** a crypto exchange, wallet, trading platform, or financial advisory service.

---

## Features

- **Live market data** — Top 10 cryptocurrencies by market cap, updated on every load
- **7-day price chart** — Interactive line chart for the selected coin
- **Multi-currency support** — USD, EUR and BRL
- **Favorites** — Save coins to a personal list (requires local storage consent)
- **Sort & filter** — Sort by performance, price or name
- **Dark / light theme** — Persisted across sessions
- **Responsive** — Works on mobile, tablet and desktop
- **Internationalization** — EN and PT-BR support via i18next

---

## Tech stack

| Layer | Technology |
|---|---|
| UI | React 19 + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS (dark mode via class strategy) |
| State | Zustand (with persist middleware) |
| Routing | TanStack Router |
| Charts | Recharts |
| HTTP | Axios |
| i18n | i18next + react-i18next |
| Testing | Vitest + Testing Library |
| Linting | ESLint + typescript-eslint |
| Commits | Commitlint + Husky |

---

## Data source

All market data is fetched from the [CoinGecko public API](https://www.coingecko.com/en/api) (free tier). No API key required.

> **Note:** The free tier has rate limits (~30 req/min). If data fails to load, the app will retry automatically after 10 seconds.

---

## Architecture

```
src/
├── components/         # Reusable UI components
│   └── ui/             # Primitive UI elements (skeleton, theme toggle)
├── pages/              # Route-level page components
│   ├── Home.tsx        # Dashboard
│   ├── Favorites.tsx   # Saved coins
│   └── About.tsx       # Project info
├── routes/             # TanStack Router config
├── services/           # API layer (CoinGecko)
├── store/              # Zustand stores (crypto, theme)
├── types/              # Shared TypeScript types
└── utils/              # Pure utility functions
```

**Key architectural decisions:**

- `cryptoStore` is the single source of truth for all market data — no parallel fetching
- Business logic stays in `services/` and `store/` — UI components are dumb consumers
- `persist` middleware in Zustand handles localStorage — no manual storage utilities needed
- Router root route owns the `ConsentBanner` — renders on all pages without prop drilling

---

## Local setup

```bash
# Clone
git clone https://github.com/merlinfachetti/crypto-insight.git
cd crypto-insight

# Install
npm install

# Dev server
npm run dev

# Run tests
npm run test

# Build
npm run build
```

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run test` | Run all tests (Vitest) |
| `npm run test:watch` | Watch mode |

---

## Privacy

CryptoInsight stores three things in your browser's local storage:

- Your favorited coins
- Your selected currency
- Your theme preference

No personal data is collected. No analytics. Nothing is sent to any server. Consent can be revoked at any time from the dashboard.

---

## License

MIT © [Alden Merlin](https://github.com/merlinfachetti)
