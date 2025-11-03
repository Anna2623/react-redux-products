import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, setLikeStatus } from '../../redux/slices/productListSlice';
import cx from 'classnames';
import styles from './Product.module.scss';

interface ProductItem {
  id: string;
  imgUrl: string;
  name: string;
  liked: boolean;
}

interface RootState {
  productList: {
    items: ProductItem[];
  };
}

interface Props {
  id: string;
}

const Product: React.FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const product = useSelector((state: RootState) => state.productList.items.find(item => item.id === id));

  const onClickDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(removeItem(id));
  }
  const onChangeLikeStatus = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(setLikeStatus(id))
  }

  const onOpenProduct = () => {
    window.location.hash = `#/product/${id}`;
  }

  if (!product) return null;

  const likeStyle = product.liked ? styles.liked : '';

  return (
    <div className={styles.container} onClick={onOpenProduct}>

      <svg
        onClick={onClickDelete}
        className={styles.clearIcon}
        viewBox="0 0 24 24"
        height="36"
        width="36"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M5.3,18.7C5.5,18.9,5.7,19,6,19s0.5-0.1,0.7-0.3l5.3-5.3l5.3,5.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3   c0.4-0.4,0.4-1,0-1.4L13.4,12l5.3-5.3c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0L12,10.6L6.7,5.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4   l5.3,5.3l-5.3,5.3C4.9,17.7,4.9,18.3,5.3,18.7z" />
      </svg>

      <img className={styles.image} src={product.imgUrl} alt={product.name} />
      <span className={styles.character}>{product.name}</span>

      <div className={styles.functions}>
        <button 
          className={cx(styles.button, likeStyle)}
          onClick={onChangeLikeStatus}
        >
          <svg
            id="Icons"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12,22c8-4,11-9,11-14A6,6,0,0,0,12,4.686,6,6,0,0,0,1,8C1,13,4,18,12,22Z"
              fill="#f10065"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Product;
