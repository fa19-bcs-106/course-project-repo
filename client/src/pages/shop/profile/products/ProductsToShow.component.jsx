import React from 'react';

/* Styles */
import './ProductsToShow.styles.scss';

/* Component Imports */
import ProductItem from './ProductItem.component';

const ProductsToShow = ({ products, farmerName, slug }) => {
  return (
    <div className="farmer-profile__section-products-farmer__has-products__list">
      {products.map((product) => (
        <ProductItem key={product._id} product={product} slug={slug} farmerName={farmerName} />
      ))}
    </div>
  );
};

export default ProductsToShow;
