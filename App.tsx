
import React, { useState, useEffect } from 'react';
import { StoreProvider } from './context/StoreContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import LivePage from './pages/LivePage';
import AdminPage from './pages/AdminPage';
import CartDrawer from './components/CartDrawer';

export type Page = 'home' | 'detail' | 'live' | 'admin';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Simple scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleNavigate = (page: Page, productId?: string) => {
    setCurrentPage(page);
    if (productId) {
      setSelectedProductId(productId);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'detail':
        return <ProductDetailPage onNavigate={handleNavigate} productId={selectedProductId} />;
      case 'live':
        return <LivePage onNavigate={handleNavigate} />;
      case 'admin':
        return <AdminPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <StoreProvider>
      <div className="min-h-screen flex flex-col">
        <Header 
          onNavigate={handleNavigate} 
          activePage={currentPage} 
          onOpenCart={() => setIsCartOpen(true)}
        />
        
        <main className="flex-grow">
          {renderPage()}
        </main>

        <Footer />
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </StoreProvider>
  );
};

export default App;
