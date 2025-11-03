import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItems } from '../../redux/slices/productListSlice';
import Product from '../Product/index';
import Favourites from '../Favourites/index';
import Loader from '../Product/Loader';
import styles from './ProductList.module.scss';


const ProductList = () => {
  const { items, filterStatus } = useSelector((state) => state.productList)
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=> {
    if (items && items.length > 0) {
      setIsLoading(false);
      window.scrollTo(0,0);
      return;
    }

    setIsLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=20`)
      .then((res) => res.json())
      .then((obj) => {
        dispatch(addItems(obj.results))
        setIsLoading(false);
      }); 

    window.scrollTo(0,0);
  }, [items, dispatch])

  const loaders = [...new Array(6)].map((_, index) => <Loader key={index} />)
  const visibleProducts = filterStatus ? items.filter(product => product.liked === true): items;
  const products = visibleProducts.map((product) =>
    <Product key = {product.id} id={product.id} />
  )

  return (
    <div className={styles.container}>
      <div className={styles.filter}>
        <Favourites />
      </div>
      <h1 className={styles.title}>Pokemon</h1>
      <div className={styles.items}>
      { isLoading ? loaders
        : products
      }
      </div>
    </div>
  );
};

export default ProductList;