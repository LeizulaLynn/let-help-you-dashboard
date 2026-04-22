# SmartSeason Field Monitoring System - Implementation Plan

## 1. Project Overview
SmartSeason is a modern agri-tech platform for coordinating field operations. It features a dual-role system (Admin and Field Agent) with a focus on earthy, intelligent design and operational efficiency.

## 2. Design System
- **Colors:** Earthy palette (Soil Brown, Leaf Green, Soft Sage, Warm Sand, Off White).
- **Typography:** Poppins (Headings), Inter (Body).
- **UI Style:** Soft shadows, 16px rounded corners, nature-inspired icons.
- **Components:** Shadcn/ui for core components, Framer Motion for animations, Lucide React for icons.

## 3. Core Features
- **Public Flow:** Landing page with platform previews, high-quality agricultural imagery.
- **Auth Flow:** Split-screen auth, role selection, OTP verification simulator.
- **Admin Dashboard:** Control center with global stats, risk monitoring, agent tracking, and field creation.
- **Field Agent Dashboard:** Operational view for assigned fields, quick stage updates, and observation logging.
- **Field Management:** Detailed crop profiles with timeline visualization and automated "At Risk" detection.

## 4. Technical Stack
- React 19, Vite, Tailwind CSS (v4)
- Lucide React (Icons)
- Framer Motion (Animations)
- Recharts (Analytics)
- Sonner (Notifications)
- Lucide React (Icons)

## 5. Development Steps
### Phase 1: Foundations
- Generate high-quality agricultural images.
- Configure Tailwind colors and fonts in `src/index.css`.
- Set up project structure (`src/components`, `src/pages`, `src/hooks`, `src/lib`).

### Phase 2: Public Interface
- Build `LandingPage.tsx` with Hero, Features, and Preview sections.
- Build `AuthLayout.tsx` and `AuthPages` (Login, Signup, OTP).

### Phase 3: Dashboard Architecture
- Create `DashboardLayout.tsx` with role-based Sidebar and Header.
- Implement `AdminDashboard.tsx` (Charts, Risk Feed, Global Stats).
- Implement `AgentDashboard.tsx` (Assigned Fields, Quick Actions).

### Phase 4: Field Management
- Build `FieldDetails.tsx` with Stage Timeline and Observations history.
- Build `FieldCreation.tsx` for Admins.
- Implement "At Risk" logic (no update in X days or warning keywords).

### Phase 5: Final Polish
- Add Framer Motion transitions between routes and interactions.
- Ensure full mobile responsiveness (crucial for field agents).
- Final build validation.
