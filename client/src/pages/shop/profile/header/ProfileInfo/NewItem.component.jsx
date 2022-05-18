import React, { useState } from 'react';

/* Styles */
import './NewItem.styles.scss';

/* Component Imports */
import ProductModal from 'pages/shop/profile/products/product-modal/ProductModal.component';

const NewItem = ({ product, name, slug }) => {
  /* Modal */
  const [modalStatus, setIsOpen] = useState(false);

  /* Handle product click */
  const toggleModal = () => {
    setIsOpen(!modalStatus);
  };

  return (
    <>
      <div className="new-product" onClick={toggleModal}>
        <p>{product.name}</p>
        <div className="new-product__img">
          <img src={`/uploads/${slug.toLowerCase()}/images/products/${product.photo}`} alt="" />
        </div>
        <p>
          € {product.price} - {product.unit}
        </p>
      </div>
      {modalStatus && (
        <ProductModal modalStatus={modalStatus} toggleModal={toggleModal} product={product} farmerName={name} slug={slug}/>
      )}
    </>
  );
};

export default NewItem;
