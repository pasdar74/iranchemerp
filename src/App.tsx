import React from 'react';
import './App.css';
import AdminPreviewPage from './pages/AdminPreviewPage';
import CustomersPage from './pages/CustomersPage';

function useHashRoute() {
  const getHash = () => window.location.hash || '#dashboard';
  const [hash, setHash] = React.useState(getHash);

  React.useEffect(() => {
    const handleHashChange = () => setHash(getHash());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return hash;
}

function App() {
  const hash = useHashRoute();

  if (hash === '#customers') {
    return <CustomersPage />;
  }

  return <AdminPreviewPage />;
}

export default App;
