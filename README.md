# Temu Rasa Restaurant Management Frontend

The frontend dashboard for the **Temu Rasa** Restaurant Management System. This application is built using **React 19** + **Vite 8**, featuring a Role-Based Access Control (RBAC) architecture to ensure each operational division has its own dedicated workspace: Admin, Waiter, Kitchen, Cashier, and Warehouse.

This project is engineered as a robust, production-ready operational dashboard rather than a simple landing page. Routing is strictly decoupled by role, the UI shell is highly reusable, and the CRUD logic is cleanly isolated within the `api` and `hooks` layers.

---

## Tech Stack

- **Core:** React 19, Vite 8, TypeScript (API & Type Layer), JavaScript/JSX (UI Components)
- **Routing:** React Router DOM 7
- **Styling:** Tailwind CSS 4
- **HTTP Client:** Axios
- **Icons:** Lucide React

---

## Key Features

- **Authentication & Session:** 
  - Token-based authentication (JWT) with `accessToken` persisted in `localStorage`.
  - Automatic session validation via the `/auth/me` endpoint upon application reload.
- **Role-Based Routing:** 
  - Secured routes enforced by user roles.
  - Automatic redirection to the respective dashboard immediately after a successful login.
- **Dynamic UI Shell:** A dashboard layout featuring a dynamic sidebar that automatically updates its menu navigation based on the user's role.
- **Admin Management Modules:**
  - Categories & Menus (Menu Book)
  - Ingredients Management
  - Orders & Payments (Integrated with Midtrans on the backend)
  - Users Management
  - Shifts & Attendance Tracking
- **Divisional Dashboards:** Initial operational workspaces for Waiters, Kitchen staff, Cashiers, and Warehouse Managers.
- **Reusable UI Components:** Standardized components including data tables, modals, page headers, stat cards, and reusable filter bars.
- **Soft-Delete Workflow:** Implements a soft-delete style user flow, allowing data deletion and restoration capabilities for specific resources.

---

## Roles and Route Mapping

| Role | Default Route | Workspace |
| --- | --- | --- |
| `SUPER_ADMIN` | `/admin/dashboard` | Admin Dashboard & Full System Control |
| `ADMIN` | `/admin/dashboard` | Admin Dashboard |
| `WAITER` | `/waiter/dashboard` | Order Entry & Table Management |
| `CASHIER` | `/cashier/dashboard` | Payment Handling & Daily Cashier Operations |
| `KITCHEN` | `/kitchen/dashboard` | Order Queue & Kitchen Display System (KDS) |
| `WAREHOUSE_MANAGER` | `/warehouse/dashboard` | Inventory Control & Ingredients Stock |

> **Note:** The primary routes are defined in `src/App.jsx`, which then delegates routing to role-specific sub-routers inside the `src/app` directory.

---

## Project Structure

```text
src/
├── app/                  # Sub-routers per role (Admin, Waiter, etc.)
├── assets/               # Local static assets (images, logos, etc.)
├── components/
│   ├── layout/           # Dashboard shell, Navbar, Sidebar
│   └── ui/               # Reusable components (Table, Modal, Page Header)
├── config/               # Sidebar menu configuration per role
├── context/              # Auth context and Session Provider
├── features/
│   ├── admin/            # Admin-specific modules (Category, Menu, Shift, etc.)
│   ├── cashier/          # Cashier-specific modules
│   ├── kitchen/          # Kitchen-specific modules
│   ├── shared/           # Shared features (e.g., Auth/Login Form)
│   ├── waiter/           # Waiter-specific modules
│   └── warehouse/        # Warehouse-specific modules
├── pages/                # Generic / Public fallback pages
├── routes/               # PublicRoute and ProtectedRoute wrappers
├── services/             # Axios API client setup
├── theme/                # Color tokens and theme customization
└── utils/                # Helper utilities (Role-to-menu matching)

```

---

## Architecture & Code Patterns

Every domain feature inside the `features/` directory follows a strict separation of concerns pattern:

```text
features/admin/<module>/
├── api/                  # Direct API requests to the backend
├── components/           # Module-specific UI (Tables, Modals, Forms)
├── hooks/                # Local state management + data fetching/refresh logic
├── type.ts               # TypeScript definitions for payloads & response shapes
└── <Page>.jsx            # Page container / Entry point

```

### CRUD Data Flow:

1. The **Page Component** consumes a custom hook (e.g., `useCategory`).
2. The **Hook** executes the underlying asynchronous request via the API layer (`categoryApi`) using Axios.
3. Upon a successful data mutation (`create`/`update`/`delete`/`restore`), the hook automatically triggers a re-fetch to update the local state.
4. The **UI Components** (Table/Modal) receive clean data arrays and action callbacks passed down from the container page.

---

## Backend API Integration

This frontend is designed to consume the **Temu Rasa Restaurant Management Backend (Spring Boot)**.

* **Local Base URL:** `http://localhost:8080/api`
* **Client Configuration:** `src/services/apiClient.ts`

### Authentication Endpoints

| Method | Endpoint | Function |
| --- | --- | --- |
| `POST` | `/auth/login` | Submits credentials and returns a JWT Access Token |
| `GET` | `/auth/me` | Validates the current token and fetches user profile details + role |

### Implemented Admin Module Endpoints

* Categories: `/categories`
* Menus: `/menus`
* Menu Categories: `/menu-categories`
* Ingredients: `/ingredients`
* Users: `/users`
* Shifts: `/shifts`
* Attendance: `/attendances`

---

## Developer Notes

* **Path Aliasing:** This project uses the `@` path alias pointing directly to the `src/` directory to avoid messy relative imports.
* **Branding & Theming:** Custom brand color tokens prefixed with `temu-*` are defined within the Tailwind configuration to ensure visual consistency across dashboards.
* **Data Normalization:** Due to naming convention mismatches in the backend responses (e.g., mixing `isActive`, `is_active`, or `is_Active`), data is normalized manually within the API/Hook layers before being served to the UI.
* **Code Migration Notice:** The codebase currently contains a mix of `.jsx` and `.ts` files. It is highly recommended to gradually migrate toward full TypeScript implementation (`.tsx`), particularly for components interacting directly with data layers to catch bugs at compile-time.
* **Known Issues / Pending Fixes:**
* Double-check the filename `postcss.congig.js`, which appears to be a typo for `postcss.config.js`. If Tailwind styles fail to compile in certain environments, this is your primary culprit.
* The `localStorage` keys for persisting the sidebar state are currently inconsistent: it reads from `sidebar-collapsed` but writes to `sidebarCollapsed`. This needs synchronization so the sidebar collapse state correctly persists across page reloads.

---

## Getting Started

### 1. Install Dependencies

Ensure you have Node.js installed in your environment, then run:

```bash
npm install

```

### 2. Run the Development Server

```bash
npm run dev

```

### 3. Build & Preview Production

To compile a production-ready build:

```bash
npm run build

```

To preview the compiled production build locally:

```bash
npm run preview

```

### 4. Code Linting

```bash
npm run lint

```

---

## Author

**Andhyka Hendra Kurniawan**

GitHub: [@andhykakurniawan](https://github.com/andhykakurniawan)

```</Page>

```