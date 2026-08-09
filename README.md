# Ecommerce Shop

Responsive React e-commerce UI scaffold and guided learning project. The interface and routing skeleton are complete, while key React, API, authentication, persistence, and business logic remain as Serbian learning tasks.

## Stack

React, Vite, JavaScript, React Router, Tailwind CSS, Supabase Auth, Supabase REST API, Fetch API, and Lucide React.

## Setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env`.
3. Add the Supabase URL and publishable key.
4. Start with `npm run dev`.

Do not add a service-role key to frontend environment files. Normal database access belongs in `apiClient` through Supabase REST; the Supabase JavaScript client is reserved for Auth.

See `TASKS.md` for the ordered implementation path.
