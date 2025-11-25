# Jointwell Design Guidelines

## Design Approach
**Material Design System** - Healthcare/medical applications require proven, accessible patterns. Material Design provides the clarity, hierarchy, and touch-optimized components essential for post-operative patient care.

**Key Principles:**
- Clinical clarity over decoration
- Reassuring professionalism (NHS-inspired)
- Large, accessible touch targets for post-surgery users
- Calm, trustworthy visual language

---

## Typography
**Font Family:** Roboto (Material Design standard, highly legible for medical content)

**Hierarchy:**
- Page Titles: text-2xl font-medium (24px)
- Section Headers: text-lg font-medium (18px)
- Body Text: text-base (16px) - never smaller for medical information
- Labels/Meta: text-sm font-medium (14px)
- Button Text: text-base font-medium

**Reading Comfort:** max-w-2xl for text blocks, line-height relaxed (1.625) for medical content

---

## Layout System
**Spacing Scale:** Tailwind units of **4, 6, 8, 12** (p-4, m-6, h-8, gap-12)
- Mobile padding: p-4 to p-6
- Section spacing: space-y-6 to space-y-8
- Card internal padding: p-6

**Grid Structure:**
- Mobile-first single column
- Desktop: max-w-4xl centered container
- Tab content area: Full width with consistent px-4 padding

---

## Component Library

### Navigation
**Bottom Tab Bar** (Material Design mobile pattern):
- 4 fixed tabs: Home | Pre-Op | Post-Op | Milestones
- Icon + label for each tab
- Active state: filled icon with underline or background tint
- Height: 64px with safe area padding
- Icons from Material Icons CDN

### Cards (Primary Content Container)
- Rounded corners: rounded-lg
- Elevation: shadow-md
- Padding: p-6
- Background: white on light tint
- Dividers between content sections within cards

### Step Counter (Featured Component)
**Circular Progress Ring:**
- Large visual (200px diameter on mobile)
- Animated SVG stroke showing daily progress
- Center: Large step count (text-4xl font-bold)
- Below: "of 3,000 steps" target in text-sm
- Card elevation with p-8

### Buttons
**Primary Action:** Full-width on mobile, min-h-12, rounded-lg, font-medium
**Secondary Action:** Outlined variant, same sizing
**Icon Buttons:** 48x48px minimum touch target

### Notification Toggle Cards
- Each reminder type in its own card
- Left: Icon + Title + Description
- Right: Toggle switch (Material Design)
- Tappable entire card surface

### Medical Evidence Sections
- Collapsible accordions for detailed content
- "NICE Guidelines" and "BOA Recommendations" badges
- Quote-style formatting for evidence citations
- Clear visual separation between hip and knee content

### Disclaimer Banner
- Fixed position or persistent footer
- Light background with subtle border-top
- Icon (info circle) + concise text
- text-sm, padding p-4

---

## Content Patterns

### Home Tab
- Welcome message card
- Step counter (hero component)
- Quick tip cards (2-3 daily tips)
- Reminder status summary

### Pre-Op / Post-Op / Milestones Tabs
- Hip/Knee selector toggle at top
- Scrollable content cards
- Checklist items with checkboxes
- Timeline visualizations for milestones
- Driving eligibility calculator/checklist

---

## Micro-interactions
**Minimal and Purposeful:**
- Gentle scale on button press (scale-95)
- Smooth tab transitions (duration-200)
- Step counter animates on data update
- Success states for completed checklists (subtle green check)

NO complex animations - patients need stability and clarity.

---

## Accessibility
- Minimum 16px body text (post-surgery users may have vision issues)
- 48px minimum touch targets throughout
- High contrast text (WCAG AA minimum)
- Focus indicators on all interactive elements
- Semantic HTML for screen readers
- aria-labels for icon-only buttons

---

## PWA Elements
- Install prompt card on first visit
- Offline indicator when disconnected
- App-like full-screen experience (no browser chrome)
- iOS-style safe area handling (pb-safe)