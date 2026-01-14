import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustBadges from './components/TrustBadges';
import Services from './components/Services';
import Clients from './components/Clients';
import About from './components/About';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';
import SEOHead from './components/SEOHead';
import Snow from './components/Snow';
import { LanguageProvider } from './context/LanguageContext';
import { DarkModeProvider } from './context/DarkModeContext';

const HomePage = () => {
  return (
    <div className="App">
      <SEOHead />
      <Snow />
      <Header />
      <Hero />
      <TrustBadges />
      <Services />
      <Clients />
      <About />
      <Testimonials />
      <CTA />
      <Contact />
      <Footer />
    </div>
  );
};

const LanguageRoute = () => {
  const { lang } = useParams();
  
  // Validate language
  if (lang && !['uz', 'ru'].includes(lang)) {
    return <Navigate to="/ru" replace />;
  }
  
  return <HomePage />;
};

const BlogLayout = () => {
  return (
    <div className="App">
      <SEOHead />
      <Snow />
      <Header />
      <BlogList />
      <Footer />
    </div>
  );
};

const BlogPostLayout = () => {
  return (
    <div className="App">
      <SEOHead />
      <Snow />
      <Header />
      <BlogPost />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <DarkModeProvider>
      <Routes>
        {/* Default redirect to /ru */}
        <Route path="/" element={<Navigate to="/ru" replace />} />
        
        {/* Language routes */}
        <Route path="/:lang" element={
          <LanguageProvider>
            <LanguageRoute />
          </LanguageProvider>
        } />
        
        {/* Blog routes */}
        <Route path="/:lang/blog" element={
          <LanguageProvider>
            <BlogLayout />
          </LanguageProvider>
        } />
        
        <Route path="/:lang/blog/:slug" element={
          <LanguageProvider>
            <BlogPostLayout />
          </LanguageProvider>
        } />
        
        {/* Catch all - redirect to /ru */}
        <Route path="*" element={<Navigate to="/ru" replace />} />
      </Routes>
    </DarkModeProvider>
  );
}

export default App;
