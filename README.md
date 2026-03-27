# Investment Dashboard v2

A high-performance, mobile-responsive Investment Dashboard built with Next.js (React), Tailwind CSS, and Firebase.

## Features Added in v2

*   **CSV Template Download**: Users can easily download a pre-formatted CSV template from the `/upload` page to ensure bulk uploads conform to the expected transactions schema (`Date`, `Ticker`, `Type`, `Quantity`, `Price`, `Fees`).
*   **Performance Visualization**: The main dashboard now sports a responsive, interactive Line Chart utilizing `recharts`. It beautifully maps the total portfolio value over time using a signature "Google Blue" (`#8ab4f8`) color scheme with subtle gradient fills optimized for the OLED dark mode (`#0f172a`).
*   **Taiwan Market Formatting Logic**: Integrated smart ticker processing. If a ticker is purely numeric (e.g., `0050` or `2330`), the dashboard logic automatically appends `.TW` before API price-fetching or database saving rules apply.
*   **Firebase Database Integration**: Efficient batched writes sync uploaded CSV transaction data securely to the `transactions` sub-collection under the current user's UID in Firestore.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

**Note on Firebase Deployment:** Ensure you have `.env.local` configured with the appropriate `NEXT_PUBLIC_FIREBASE_API_KEY` and associated environment variables prior to running `npm run build`.

## Tech Stack
-   **Core**: Next.js 16 (App Router), React 19
-   **Styling**: Tailwind CSS
-   **Database/Auth**: Firebase Firestore & Firebase Auth
-   **CSV Processing**: PapaParse
-   **Charts**: Recharts
-   **Icons**: Lucide React
