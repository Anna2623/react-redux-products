import React, {useEffect, useState} from 'react';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import ThemeToggle from './components/ThemeToggle';
import './styles.scss';

const App = () => {
  const [route, setRoute] = useState(window.location.hash || '');

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash || '');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  },[])

  const isProductDetails = route.startsWith('#/product/');

  return (
    <>
      <ThemeToggle />
      <div className='wrapper'>
        { isProductDetails ? <ProductDetails /> : <ProductList /> }
      </div>
    </>
  );
}

export default App;
