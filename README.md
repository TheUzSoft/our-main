# TheUzSoft Landing Page

Modern, production-ready, premium-grade bilingual (Uzbek/Russian) landing page for TheUzSoft IT company.

## ✨ Features

- 🌐 **Bilingual Support with URL Routing** - Language-based routes (`/uz/` and `/ru/`) with seamless switching
- 📱 **Fully Responsive** - Mobile-first design that looks perfect on all devices
- ✨ **Premium Animations** - Smooth Framer Motion animations throughout
- 🎨 **Modern Minimalist Design** - Clean, professional aesthetic with blue (#1476FF) accent
- ⚡ **Performance Optimized** - Fast load times with lazy loading and optimized assets
- ♿ **Accessibility First** - WCAG compliant with proper ARIA labels and keyboard navigation
- 🔍 **SEO Optimized** - Comprehensive meta tags, structured data, and keyword optimization per language
- 🛣️ **React Router v6** - Clean URL structure with language prefixes for better SEO

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🌐 Routing Structure

The application uses React Router v6 with language-based routing:

- `/` → Automatically redirects to `/uz/`
- `/uz/` → Uzbek version of the site
- `/ru/` → Russian version of the site
- `/*` → Any invalid route redirects to `/uz/`

All internal navigation (menu items, buttons, links) automatically includes the language prefix. The language switcher updates the URL path while preserving the current section.

### SEO Benefits

- Each language has its own URL path for better search engine indexing
- Language-specific meta tags and structured data
- Proper `hreflang` tags for international SEO
- Canonical URLs for each language version

## 📁 Project Structure

```
src/
  components/
    Header.jsx          # Navigation with active states & smooth scroll
    Hero.jsx            # Hero section with scroll indicator
    TrustBadges.jsx     # Trust indicators
    Services.jsx        # Service cards with modal details
    ServiceModal.jsx    # Service detail modal
    SEOHead.jsx         # Dynamic SEO meta tags per language
    Clients.jsx         # Client logos carousel
    About.jsx           # Company info with stats
    Testimonials.jsx    # Client testimonials
    CTA.jsx             # Call-to-action section
    Contact.jsx         # Contact form with validation
    Footer.jsx          # Footer with social links
  context/
    LanguageContext.jsx # Language management
  i18n/
    uz.json             # Uzbek translations
    ru.json             # Russian translations
  utils/
    smoothScroll.js     # Smooth scroll utilities
  App.jsx
  main.jsx
  index.css
```

## 🎨 Design System

### Colors
- **Primary**: `#1476FF` (Blue)
- **Black**: `#000000`
- **White**: `#FFFFFF`
- **Gray Scale**: Tailwind default grays

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800, 900
- **Scale**: Responsive typography from mobile to desktop

### Spacing
- Consistent spacing system using Tailwind's scale
- Section padding: `py-32` (128px)
- Container max-width with proper padding

## 🔍 SEO Features

- ✅ Comprehensive meta tags (title, description, keywords)
- ✅ Open Graph tags for social media sharing
- ✅ Twitter Card support
- ✅ Structured Data (JSON-LD) for Organization and WebSite
- ✅ Semantic HTML5 structure
- ✅ Optimized images with descriptive alt tags and lazy loading
- ✅ Sitemap.xml and robots.txt
- ✅ Canonical URLs
- ✅ Dynamic HTML lang attribute based on selected language
- ✅ Keyword optimization for Uzbek and Russian markets

## 💼 Conversion Optimization

- ✅ Multiple strategic CTAs throughout the page
- ✅ Trust badges and social proof elements
- ✅ Client testimonials with ratings
- ✅ Clear value propositions
- ✅ Mobile-optimized contact forms
- ✅ Smooth scroll navigation
- ✅ Active navigation states
- ✅ Service detail modals for deeper engagement

## 🎯 Key Improvements

### Header
- Active section highlighting
- Smooth scroll navigation
- Responsive mobile menu with animations
- Language switcher with visual feedback
- Logo optimization

### Hero
- Large, bold typography
- Subtle background pattern
- Scroll indicator animation
- Multiple CTA buttons
- Optimized spacing

### Services
- Interactive cards with hover effects
- Detailed service modals
- Icon animations
- Clear call-to-action buttons

### Clients
- Auto-sliding carousel of brand logos
- Smooth continuous animation
- Gradient fade effects
- Responsive logo sizing

### Contact
- Form validation with error messages
- Loading states
- Accessible form fields
- Google Maps integration
- Contact information cards

### Footer
- Social media links
- Organized information architecture
- Responsive grid layout
- Logo integration

## 🌐 Internationalization

All content is fully translatable with URL-based routing. The language system includes:

- **URL-based routing**: Each language has its own path (`/uz/`, `/ru/`)
- **Dynamic translations**: All UI text switches based on URL
- **HTML lang attribute**: Automatically updates based on current route
- **SEO meta tags**: Language-specific titles, descriptions, and Open Graph tags
- **Language switcher**: Updates URL path while preserving current section
- **Translation files**: Stored in `/i18n/uz.json` and `/i18n/ru.json`

## 📱 Responsive Breakpoints

- Mobile: `< 640px`
- Tablet: `640px - 1024px`
- Desktop: `> 1024px`

## ⚡ Performance

- Lazy loading for images
- Optimized animations
- Code splitting ready
- Minimal bundle size
- Fast initial load

## ♿ Accessibility

- Semantic HTML5
- ARIA labels where needed
- Keyboard navigation support
- Focus indicators
- Screen reader friendly
- Proper heading hierarchy

## 🛠️ Technologies

- **React 18** - Latest React features
- **React Router v6** - Client-side routing with language support
- **Vite** - Fast build tool
- **TailwindCSS** - Utility-first CSS
- **Framer Motion** - Animation library
- **Inter Font** - Google Fonts

## 📝 Notes

- Logo should be placed in `public/logo.png`
- Update Google Maps embed URL with actual location
- Replace placeholder contact information
- Connect contact form to backend API
- Update social media links in Footer

## 📄 License

© 2024 TheUzSoft. All rights reserved.
