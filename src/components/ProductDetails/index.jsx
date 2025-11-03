import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLikeStatus } from '../../redux/slices/productListSlice';
import styles from './ProductDetails.module.scss';

const ProductDetails = () => {
  const [id, setId] = useState(null);
  const items = useSelector((state) => state.productList.items)
  const dispatch = useDispatch()

  useEffect(() => {
    const parseId = () => {
      const hash = window.location.hash || '';
      const parts = hash.split('/');
      if (parts.length >= 3) setId(parts[2]);
      else setId(null);
    }
    parseId();
    window.addEventListener('hashchange', parseId);
    return () => window.removeEventListener('hashchange', parseId);
  },[])

  if (!id) return <div className={styles.container}>Продукт не найден</div>

  const product = items.find(i => String(i.id) === String(id));
  if (!product) return <div className={styles.container}>Продукт не найден</div>

  const onToggleLike = () => {
    dispatch(setLikeStatus(product.id))
  }

  return (
    <div className={styles.container}>
      <button className={styles.back} onClick={() => window.history.back()}>Назад</button>
      <div className={styles.product}>
        <img src={product.imgUrl} alt={product.name} />
        <div className={styles.headerRow}>
          <h2>{product.name}</h2>
          <button
            className={product.liked ? `${styles.likeButton} ${styles.liked}` : styles.likeButton}
            onClick={onToggleLike}
            aria-pressed={product.liked}
            aria-label={product.liked ? 'Убрать из избранного' : 'Добавить в избранное'}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M12,22c8-4,11-9,11-14A6,6,0,0,0,12,4.686,6,6,0,0,0,1,8C1,13,4,18,12,22Z"
                fill={product.liked ? '#f3007a' : 'none'}
                stroke={product.liked ? '#f3007a' : '#f3007a'}
                strokeWidth={1.2}
              />
            </svg>
          </button>
        </div>
        <p>ID: {product.id}</p>
      </div>
    </div>
  )
}

export default ProductDetails;
