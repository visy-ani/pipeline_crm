![Pipeline CRM](/public/name.png)

**Pipeline CRM** is an interactive, single-page Kanban-style CRM board built with Next.js 15 and React. It provides a visually appealing way to track sales deals across pipeline stages with drag-and-drop support, dynamic filtering, sorting, and celebratory confetti effects on deal wins. The app is fully client-side, requires no backend, and supports a clean light/dark theme with responsive design.

---

## Features

- **Drag and Drop Kanban Board:** Move deals between stages ("New", "Qualified", "Negotiation", "Won", "Lost") via drag-and-drop.
- **Confetti Animation:** Celebrate every deal marked as "Won" with a bright confetti burst.
- **Search & Filtering:** Search deals by title, company, or tags; filter by deal owner; sort by deal value, age, or probability.
- **Quick Add Modal:** Rapidly add new deals with important details including title, company, owner, value, stage, probability, and tags.
- **Detailed Deal View:** Click cards to bring up full deal info and change stages easily.
- **Responsive Layout:** Works beautifully on desktops, tablets, and mobile devices.
- **Light and Dark Themes:** Toggle between themes for comfortable viewing.
- **3D Tilt Effect:** Cards dynamically tilt according to mouse movement for a modern UI feel.
- **Pure React and Next.js:** No external dependencies besides React and Next.js; easy to customize.

---

## When to Use

- Personal or team sales pipeline visualization without the need for complex CRM software.
- Demoing animated Kanban boards in React or Next.js.
- Prototyping ideas for sales or project management pipelines.
- Tracking deal momentum visually with simple UI feedback.

---

## Getting Started

### Prerequisites

- Node.js v18+ and npm/yarn installed
- Familiarity with running Next.js apps

### Installation

1. Clone this repository or copy the provided files into a new Next.js 15 project folder.

2. Install dependencies:


3. Run the development server:


4. Open your browser at [http://localhost:3000](http://localhost:3000) to view the Kanban CRM.

---

## How to Use

1. **Adding Deals:**  
Click the "+ Quick Add" button in the header and fill out the form to create a new deal.

2. **Managing Deals:**  
Drag cards between pipeline columns to update stages. Dropping a deal into "Won" triggers a confetti burst.

3. **Searching & Filtering:**  
Use the search box to filter deals by keywords in titles, companies, or tags. Filter by owner with the dropdown. Sort deals by value, recency, or probability.

4. **Reviewing Details:**  
Click any card to view detailed information and change its stage from the detail modal.

5. **Theming:**  
Toggle between light and dark modes via the button in the header for your preferred UI look.

6. **Responsive Design:**  
The board adapts fluidly to your screen size from wide desktop layouts to single-column mobile views.

---

## Screenshots

![App Screenshot](/public/sample.png)

- **Kanban Board Overview:** Shows deals organized by stage with bright column accents.
- **Quick Add Modal:** Add new deals quickly with a clear form.
- **Deal Detail Modal:** View and update full deal details.
- **Confetti Celebration:** Confetti bursts on winning deals for extra motivation.
- **Dark and Light Themes:** Toggle UI modes with a delightful color scheme change.
- **Search and Filter Controls:** Easily find and sort your deals.

---

## Project Structure

- `app/layout.tsx` — Root layout importing global CSS.
- `app/page.tsx` — Main page importing the Board component.
- `app/components` — Reusable React components: Board, Card, Column, Header, KPIBar, Modal, QuickAddForm, DealDetail.
- `app/hooks/useConfetti.ts` — Custom hook to manage confetti animation.
- `app/styles` — Global and modular CSS for styling and animations.
- `app/types.ts` — TypeScript types for deals and stages.
- `app/seedDeals.ts` — Mock data for initial deals.
- `app/utils.ts` — Helper functions for currency formatting and date calculations.

---

## Customization

- Modify `app/seedDeals.ts` to change initial deals.
- Update CSS files in `app/styles/` to customize the theme, colors, or animations.
- Extend deal properties and form inputs to match your CRM needs.
- Add persistent storage layers if desired (localStorage, APIs, etc.).

---

## License

This project is provided as-is for educational and demo purposes.

---

Enjoy your beautiful, powerful Pipeline CRM app! Reach out if you need help extending or deploying it.
