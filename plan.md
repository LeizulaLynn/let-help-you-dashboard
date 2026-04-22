# Homepage Guest Flow & Authentication Update

## 1. Goal
Enhance the homepage with detailed guest preview sections and implement a professional split-layout authentication flow with OTP verification.

## 2. Changes
- **Mock Data**: Add data for guest preview sections.
- **Landing Page**:
    - Update Navbar with all required links.
    - Revamp Hero section with new imagery and content.
    - Add "Guest Preview Sections": Dashboard, Monitoring, Lifecycle, Analytics.
- **Authentication Flow**:
    - Implement a split layout: left side with branding/imagery/quotes, right side with forms.
    - Add Role selection to Signup.
    - Implement OTP verification page.
- **Role-Based Access**: Ensure redirection happens only after OTP verification.

## 3. Visuals
- Use generated agricultural imagery.
- Maintain earthy palette: Deep Soil Brown (#4E3B31), Leaf Green (#5C8D4E).
- Components: Cards with 16px radius, soft shadows, Poppins for headings.

## 4. Components to Create/Update
- `src/lib/mockData.ts`: Expand with preview data.
- `src/components/landing/Navbar.tsx`: Extracted for reuse.
- `src/components/landing/Hero.tsx`: Revamped hero.
- `src/components/landing/GuestPreviews.tsx`: The new preview sections.
- `src/components/auth/AuthLayout.tsx`: The split layout wrapper.
- `src/components/auth/LoginForm.tsx`: Cleaned up login.
- `src/components/auth/SignupForm.tsx`: Role-based signup.
- `src/components/auth/OTPVerification.tsx`: The 6-digit OTP screen.
- `src/App.tsx`: Main router/state orchestrator.
