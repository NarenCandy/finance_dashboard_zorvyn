# CashFlow — Finance Dashboard

A clean and interactive personal finance dashboard built with React, Tailwind CSS v4, and Recharts.

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser at `http://localhost:5173`

## Tech Stack

- **React 19** — UI framework
- **Tailwind CSS v4** — Styling via `@theme` CSS variables
- **Recharts** — Charts (line chart, donut chart)
- **Framer Motion** — Sidebar and nav item animations
- **Hamburger React** — Animated hamburger menu icon
- **Vite** — Build tool

## Features

### Dashboard Overview
- Summary cards showing Total Balance, Total Income, Total Expenses — all calculated dynamically from transaction data
- Line chart showing monthly income vs expenses trend
- Donut chart showing spending breakdown by category
- Recent transactions table with a "View All" link

### Transactions
- Full transactions list with Date, Description, Category, Type, Amount
- Search by description
- Filter by category and type (income/expense)
- Sort by date (newest/oldest) and amount (high/low)
- Export filtered transactions as CSV

### Insights
- Top spending category
- Monthly expense change vs previous month
- Monthly income change vs previous month
- Savings rate (% of income saved)
- Monthly breakdown table with income, expenses, and net per month

### Role Based UI
- Two roles: **Admin** and **Viewer**
- Switch roles using the dropdown in the header
- **Admin** — can add, edit, and delete transactions
- **Viewer** — read only, no add/edit/delete buttons shown
- Role badge displayed in header

### Optional Enhancements
- **Dark/Light mode** — toggle button in header, defaults to dark
- **Local storage persistence** — transaction data persists across page refreshes
- **Animated sidebar** — slide in/out animation using Framer Motion, inspired by [this FreeCodeCamp article](https://www.freecodecamp.org/news/create-a-fully-animated-sidebar/)
- **Animated hamburger icon** — using Hamburger React (Squash variant) that animates into an X when sidebar is open
- **CSV export** — exports currently filtered transactions

## Project Structure

```
src/
  components/
    chart/
      BalanceTrack.jsx     # Line chart
      Spending.jsx         # Donut chart
    AddTransactionModal.jsx
    EditTransactionModal.jsx
    Header.jsx
    Sidebar.jsx
    SummaryCard.jsx
  context/
    AppContext.jsx          # Global state (React Context + useMemo)
  data/
    mockData.js            # Mock transactions data
  page/
    Dashboard.jsx
    Transactions.jsx
    Insights.jsx
  App.jsx
  main.jsx
  index.css               # Tailwind v4 theme variables
```

## State Management

All application state is managed via **React Context** (`AppContext`):

- `data` — transactions array (initialized from mock data, persisted to localStorage)
- `summaryData` — derived via `useMemo` from transactions (auto updates on data change)
- `categoryData` — derived via `useMemo`, groups expenses by category
- `monthlyData` — derived via `useMemo`, groups transactions by month sorted in calendar order
- `filters` — search, category, type filter state
- `role` — current user role (admin/viewer)
- `page` — current active page
- `sidebarOpen` — sidebar open/close state
- `darkMode` — dark/light mode state

## Design

- Inspired by a dark institutional finance dashboard design from Google Stitch
- Color palette based on Material Design 3 dark theme tokens
- Fonts: Manrope (headings) + Inter (body)
- Material Symbols icons via Google Fonts
