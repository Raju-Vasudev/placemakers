# Placemakers

A modern React-based business website built with Vite, Material-UI, and Emotion for styling. This project showcases a responsive, multi-section website with features like service showcasing, gallery, client testimonials, and contact forms.

## 🚀 Features

- Modern and responsive design
- Theme customization using Context API
- Interactive sections including:
  - Hero landing section
  - About company information
  - Services showcase
  - Project gallery
  - Client testimonials
  - Contact form
  - FAQ section
- Material-UI components
- Emotion CSS-in-JS styling
- Optimized build with Vite

## 🛠️ Tech Stack

- React (^17.0.0 || ^18.0.0 || ^19.0.0)
- Vite v6.0.1
- Material-UI v6.2.0
- Emotion v11.14.0
- ESLint v9.15.0
- Prettier v3.4.2

## 📦 Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd placemakers
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run deploy` - Deploy to GitHub Pages

## 📁 Project Structure

```
placemakers/
├── src/
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Gallery.jsx
│   │   │   ├── Clients.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── FAQ.jsx
│   │   │   └── StyledComponents.jsx
│   │   ├── Headers.jsx
│   │   └── ContactFormContainer.jsx
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── hooks/
│   ├── utils/
│   ├── styles/
│   ├── config/
│   ├── assets/
│   ├── App.jsx
│   └── main.jsx
├── public/
├── .github/
├── .vscode/
├── vite.config.js
├── eslint.config.js
├── .prettierrc
└── package.json
```

## 🎨 Component Overview

### Main Sections

1. **Hero Section**
   - Landing page main content
   - Primary call-to-action elements

2. **About Section**
   - Company information
   - Mission and vision

3. **Services Section**
   - Service offerings
   - Feature highlights

4. **Gallery Section**
   - Project portfolio
   - Image showcase

5. **Clients Section**
   - Client testimonials
   - Success stories

6. **Contact Section**
   - Contact form
   - Contact information

7. **FAQ Section**
   - Frequently asked questions
   - Information resources

## 🔍 Code Quality

The project maintains high code quality standards through:

- ESLint configuration for code linting
- Prettier for consistent code formatting
- Component-specific styling with Emotion
- Modular component architecture
- Theme context for consistent styling

## 🚀 Deployment

The project is configured for deployment to GitHub Pages:

1. Build the project:
```bash
npm run build
```

2. Deploy to GitHub Pages:
```bash
npm run deploy
```

## 🧩 Development Guidelines

1. **Component Creation**
   - Place new components in appropriate directories
   - Follow existing naming conventions
   - Include proper TypeScript types/interfaces

2. **Styling**
   - Use Emotion for CSS-in-JS
   - Follow theme context guidelines
   - Maintain responsive design principles

3. **Code Quality**
   - Run linting before commits
   - Follow prettier formatting
   - Write meaningful commit messages


[Add Support Information]
