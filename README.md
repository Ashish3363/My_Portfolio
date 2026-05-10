# Ashish Kumar — Enter My Mind

A cinematic, scroll-driven portfolio. A 3D brain rotates and "opens" as you
scroll, revealing a holographic dashboard, project cards as memories, a
neural-network of skills, and finally a contact portal.

- **Frontend:** React + Vite + Tailwind + Framer Motion + react-three-fiber
- **Backend:** FastAPI (contact form endpoint, CORS, optional SMTP relay)

---

## Project structure

```
portfolio/
├── frontend/                  React + Vite app (the cinematic UI)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Brain/         3D brain (react-three-fiber)
│   │   │   ├── layout/        Nav, Footer, BrainBackdrop
│   │   │   ├── sections/      Hero, About, CurrentWork, Projects, …
│   │   │   └── ui/            Shared UI bits (SectionHeader)
│   │   ├── data/portfolio.js  Single source of truth for content
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js         Proxies /api → FastAPI on :8000
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── backend/                   FastAPI service
│   ├── app/
│   │   ├── main.py            App + CORS + router wiring
│   │   ├── config.py          Settings (env-driven)
│   │   ├── schemas.py         Pydantic models
│   │   └── routers/
│   │       └── contact.py     POST /api/contact
│   ├── requirements.txt
│   └── .env.example
│
├── .gitignore
└── README.md
```

---

## Running locally

### 1. Frontend

```powershell
cd frontend
npm install
copy .env.example .env
# edit .env and paste your Web3Forms key (see "Contact form" below)
npm run dev
```

Vite serves on http://localhost:5173.

### 2. Contact form (Web3Forms — no backend required)

The contact form delivers email straight to **ashishsingh3363@gmail.com**
via [Web3Forms](https://web3forms.com), so the site can be deployed as a
pure static build.

1. Visit https://web3forms.com.
2. Enter `ashishsingh3363@gmail.com` and click **Create Access Key**.
3. Confirm the email Web3Forms sends you.
4. Paste the key into `frontend/.env`:

   ```env
   VITE_WEB3FORMS_KEY=your-access-key-here
   ```

5. Restart `npm run dev` so Vite picks up the new env var.

If `VITE_WEB3FORMS_KEY` is missing, the form shows a friendly error
asking the visitor to email directly.

### 3. Backend (optional)

A FastAPI service is included if you ever want to handle submissions
yourself (logging, rate-limiting, your own SMTP, etc.). It is **not
required** for the contact form — Web3Forms covers that.

```powershell
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env
uvicorn app.main:app --reload --port 8000
```

---

## Editing content

All copy lives in `frontend/src/data/portfolio.js` — profile, education,
projects, experience, skills, achievements. Edit that one file and every
section updates.

---

## Production build

```powershell
cd frontend
npm run build
```

Outputs static assets to `frontend/dist/`. Deploy that folder anywhere
(Netlify, Vercel, GitHub Pages, S3+CloudFront). Set the
`VITE_WEB3FORMS_KEY` env var in your hosting provider's dashboard so
the contact form works in production — no separate backend needed.

---

## Notes on the 3D brain

The brain is procedurally generated — a noisy icosahedron rendered as a
glowing inner shell + cyan wireframe + a particle field of "neurons."
There's no GLB model to ship, so the bundle stays small and the page
renders fast everywhere.

The global scroll progress drives:

- **openness** — the wireframe scales outward, the emissive intensity
  climbs, and the particles get more energetic.
- **hue** — shifts from cyan toward violet as you descend the page.

If a visitor has `prefers-reduced-motion` set, animations are reduced
automatically (see `index.css`).
