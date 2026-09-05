import { useState, useCallback, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import BusinessUnitPage from '@/pages/BusinessUnitPage';

type Route =
  | { page: 'home' }
  | { page: 'unit'; unitId: number };

function parseHash(): Route {
  const hash = window.location.hash;
  if (hash.startsWith('#/unidad/')) {
    const id = parseInt(hash.replace('#/unidad/', ''));
    if (id >= 1 && id <= 6) {
      return { page: 'unit', unitId: id };
    }
  }
  return { page: 'home' };
}

export default function App() {
  const [route, setRoute] = useState<Route>(parseHash());

  useEffect(() => {
    const handleHashChange = () => setRoute(parseHash());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateHome = useCallback((page: 'home', section?: string) => {
    if (section) {
      window.location.hash = section;
      setRoute({ page: 'home' });
      setTimeout(() => {
        const el = document.querySelector(section);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.location.hash = '';
      setRoute({ page: 'home' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const navigateUnit = useCallback((unitId: number) => {
    window.location.hash = `/unidad/${unitId}`;
    setRoute({ page: 'unit', unitId });
  }, []);

  const navigateHomeFromUnit = useCallback(() => {
    window.location.hash = '';
    setRoute({ page: 'home' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header onNavigate={navigateHome} />
      <div className="flex-1">
        {route.page === 'home' ? (
          <HomePage
            onNavigate={navigateHome}
            onNavigateUnit={navigateUnit}
          />
        ) : (
          <BusinessUnitPage
            unitId={route.unitId}
            onNavigateHome={navigateHomeFromUnit}
          />
        )}
      </div>
      <Footer onNavigate={navigateHome} />
    </div>
  );
}
