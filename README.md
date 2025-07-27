# 📊 CryptoInsight — Cryptocurrency Analysis Dashboard

CryptoInsight is a responsive web dashboard for real-time analysis of the top cryptocurrencies in the market. Built with a focus on performance, API integration, and data visualization.

---

## 🚀 Product Overview

### 🎯 Project Goals:

- Display real-time cryptocurrency data
- Enable visual analysis through interactive charts
- Offer dynamic filters and advanced search
- Demonstrate best practices in modern frontend development

### 👥 Target Audience

- **General Public:** Anyone curious about Bitcoin, Ethereum, and other coins
- **Investors:** For visual market tracking
- **Developers/Recruiters:** Showcase of technical proficiency and best practices in React

### 🧠 Project Motivation

The crypto market is constantly evolving — tracking these changes clearly and simply remains a challenge. CryptoInsight was born with the mission of democratizing crypto information in a visual, simple, and accessible way.

### 📱 User Flow

1. Access the dashboard (mobile, tablet, desktop)
2. The app connects to the CoinGecko API
3. Loads the top cryptocurrencies in real time
4. Displays data, charts, variations, and favorites
5. User interacts with filters and detailed views

### 🧑‍💻 Developer's Note

> "I created CryptoInsight with the desire to combine cutting-edge technology with real usefulness. I want anyone to be able to understand the world of cryptocurrencies — in a simple, beautiful, and efficient way." → **Merlin Fachetti 🧙🏼**

---

## 🔐 Data Consent Policy

CryptoInsight respects the user and **only activates additional features based on explicit consent**, such as enabling favorites or storing local preferences.

### 🧩 How it works:

1. **When entering the app**, the user sees a banner requesting consent.
2. Upon accepting or declining:

   - A record is saved in `localStorage` via Zustand persist middleware.
   - The banner is hidden and the `consentGiven` state is updated.

3. This state is used to **conditionally enable sensitive features**, like favorites or preference caching.

### ✅ Underlying Structure

- `store/cryptoStore.ts`: manages `consentGiven` with `{ accepted, at, version }`
- `components/ConsentBanner.tsx`: visually manages the consent flow
- `zustand/middleware/persist`: ensures session persistence

---

## 🛠️ Technologies Used

- **React + Vite** — Lightweight and fast framework
- **Zustand** — State management
- **Axios** — REST API consumption
- **Tailwind CSS** — Utility-first styling
- **Recharts** — Data visualization
- **CoinGecko API** — Primary data source

---

### 🧱 Folder Architecture

```bash
/src
 ├─ /assets
 ├─ /components
 ├─ /hooks
 ├─ /routes
 ├─ /pages
 ├─ /services
 ├─ /store
 ├─ /utils
 ├─ /types
 └─ main.tsx
```

## 🧭 Routing Strategy

### 🔄 Routing Layer

We are using [TanStack Router v1](https://tanstack.com/router/v1) instead of React Router DOM.

- ✅ Fully typed routing.
- ✅ Nested route trees using file-based structure.
- ✅ Compatible with strict TypeScript usage.

### 📌 Why We Use TanStack Router Instead of React Router

While React Router has historically been the go-to library for routing in React applications, it has recently undergone a significant transformation due to its merger with Remix.

These changes introduced architectural complexity that many developers — including us — find unnecessarily heavy for client-side apps. Its new concepts like `loaders`, `actions`, and deep nested routing are tightly coupled with server-style rendering, which doesn't align with the lightweight and interactive nature of this dashboard.

### 🔄 What's Going On with React Router?

React Router v6+ has:

- Integrated features and paradigms from Remix (like route loaders and actions).
- Adopted a file-based routing mental model, without full tooling support unless you use Remix.
- Fragmented its documentation — some parts are still Remix-specific, while others are outdated.
- Begun delegating some updates to the community, reducing the coherence of the project.

This created friction for many developers — especially those who preferred the previous declarative and predictable approach.

### ✅ Why TanStack Router?

We chose **TanStack Router** (from the creator of React Query) because it is:

| Feature                 | TanStack Router                  | React Router (v6+/Remix)        |
| ----------------------- | -------------------------------- | ------------------------------- |
| **Performance**         | Lightweight, zero dependencies   | Medium-heavy, Remix-like model  |
| **API Style**           | Code-first, modern, intuitive    | Hybrid, verbose and fragmented  |
| **Type Safety**         | Excellent TypeScript inference   | Manual typing or weak inference |
| **Flexibility**         | Works with any data-fetching lib | Tightly coupled to Remix model  |
| **Community Direction** | Actively growing and maintained  | Slowing down, less independent  |
| **Use Case Fit**        | Ideal for SPAs and dashboards    | More server-oriented via Remix  |

> 🚀 **Conclusion:** TanStack Router aligns better with our project's goals — performance, clarity, maintainability, and future extensibility — especially in a React + Zustand-based SPA architecture.

---

### 🧪 Routing Setup (Developer Note)

````ts
// Example in `router.tsx`
const router = createRouter({
  routeConfig: rootRoute.addChildren([
    {
      path: "/",
      component: HomePage,
    },
  ]),
});


**Main files:**

- `src/routes/router.tsx`: defines the route tree.
- `src/main.tsx`: wraps app with `<RouterProvider />`.
- `src/components/Layout.tsx`: shared layout with header.
- `src/pages/Home.tsx`: root page component.

You can define additional routes using `createRoute` and attach them to the `routeTree`.

---

### ⚙️ Test Structure

```bash
/src
 ├─ /components
 │    ├─ CryptoList.tsx
 │    ├─ CryptoFilter.tsx
 │    ├─ ...
 │    └─ __tests__/
 │         ├─ CryptoList.test.tsx
 │         └─ CryptoFilter.test.tsx
 ├─ /services
 │    └─ __tests__/
 │         └─ coingecko.test.ts
 ├─ /utils
 │    ├─ getBadgeLabel.ts
 │    └─ __tests__/
 │         └─ getBadgeLabel.test.ts
````

---

## ✅ Testing Strategy

CryptoInsight follows a clear strategy of **testing by domain responsibility**, helping to keep the project modular, scalable, and well documented.

### 📌 Why are there `__tests__` in both `components/` and `utils/`?

| Location                   | What is tested                                  | Type of test                   |
| -------------------------- | ----------------------------------------------- | ------------------------------ |
| `src/components/__tests__` | React components, UI and DOM/state interactions | 🖥️ Component (unit + UI) tests |
| `src/services/__tests__`   | API integration functions (mocked or real)      | 🔌 Service integration tests   |
| `src/utils/__tests__`      | Pure functions, no JSX or visual state          | 🧠 Unit tests                  |

### ✅ Benefits of this separation

- Logical organization by responsibility
- Isolation of logic vs UI vs API concerns
- Easy scalability and maintenance
- CI/CD support by domain scope

### 🧠 Simple Analogy

| Folder                 | Equivalent Example                  |
| ---------------------- | ----------------------------------- |
| `components/__tests__` | Visual and behavioral tests         |
| `services/__tests__`   | API behavior, data fetching, errors |
| `utils/__tests__`      | Mathematical and logical tests      |

---

## 🧪 Running the Tests

Install the dependencies:

```bash
npm install
```

### 🔁 Run all tests

```bash
npm run test
```

### 🔍 Watch mode (dev)

```bash
npm run test:watch
```

---

## 🌍 Community Contribution

CryptoInsight aims to:

- Inspire and educate beginner investors
- Serve as a didactic repository for other developers
- Evolve with alerts, favorites, and history based on feedback

---

## 📜 License

This project is licensed under the MIT license — see the [LICENSE](https://opensource.org/licenses/MIT) file for details.

**Legal Notice:**
🚀 Project developed **solely for educational and study purposes**.
**Commercial use is not authorized** 🔒 For any use beyond study/portfolio, please contact for prior authorization.
