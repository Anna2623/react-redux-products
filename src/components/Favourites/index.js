import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterStatus } from '../../redux/slices/productListSlice';
import styles from './Favourites.module.scss';
import cx from 'classnames';


const Favourites = () => {
  const filterStatus = useSelector((state) => state.productList.filterStatus);
  const items = useSelector((state) => state.productList.items);
  const dispatch = useDispatch();
  const filterStyle = filterStatus ? styles.active : '';
  
  const favouritesCount = items.filter(item => item.liked).length;
  
  return (
    <div className={styles.container}>
      <button
        onClick = {() => dispatch(setFilterStatus())}
        className={cx(styles.button, filterStyle)}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
        Избранное
        {favouritesCount > 0 && (
          <span className={styles.counter}>{favouritesCount}</span>
        )}
      </button>
    </div>
  );
};

export default Favourites;
