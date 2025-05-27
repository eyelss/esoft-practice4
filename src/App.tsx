import { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navigation from './pages/shared/NavComponent';
import pagesExport from './pages';
import { selectTheme } from './features/theme/themeSelectors';
import { useAppSelector } from './store';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

function App() {
  const theme = useAppSelector(selectTheme); 

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.setAttribute('data-bs-theme', theme);
  }, [theme]);

  return (
    <Router>
      <div className='all'>
        <Navigation />
        <div className='page-container'>
        <Routes>
          {pagesExport.map(pageExport => 
            <Route 
              path={pageExport.path} 
              element={<pageExport.component/>}
            />
          )}
        </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App

// algo: all books -> searchQuery -> authorFilter -> yearFilter