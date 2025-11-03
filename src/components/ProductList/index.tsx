import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItems } from '../../redux/slices/productListSlice';
import { RootState, ProductItem } from '../../types';
import Product from '../Product';
import Favourites from '../Favourites';
import Loader from '../Product/Loader';
import styles from './ProductList.module.scss';

interface PokemonApiResponse {
  results: Array<{
    name: string;
    url: string;
  }>;
}

const ProductList: React.FC = () => {
  const { items, filterStatus } = useSelector((state: RootState) => state.productList);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (items && items.length > 0) {
      setIsLoading(false);
      if (!isInitialized) {
        window.scrollTo(0, 0);
        setIsInitialized(true);
      }
      return;
    }

    setIsLoading(true);
    fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then((res) => res.json())
      .then((obj: PokemonApiResponse) => {
        dispatch(addItems(obj.results));
        setIsLoading(false);
      });

    if (!isInitialized) {
      window.scrollTo(0, 0);
      setIsInitialized(true);
    }
  }, [items, dispatch, isInitialized]);

  // Отдельный useEffect для обработки изменения фильтра
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [filterStatus]);

  const loaders = [...new Array(6)].map((_, index) => <Loader key={index} />);
  const visibleProducts = filterStatus ? items.filter(product => product.liked === true) : items;
  const products = visibleProducts.map((product: ProductItem) => (
    <Product key={product.id} id={product.id} />
  ));

  return (
    <div className={styles.container}>
      <div className={styles.filter}>
        <Favourites />
      </div>
      <h1 className={styles.title}>Pokemon</h1>
      <div className={styles.items}>
        {isLoading ? loaders : products}
      </div>
    </div>
  );
};

export default ProductList;