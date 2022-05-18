import React from 'react';

/* Component Imports */
import HeaderFarmerProfile from 'pages/shop/profile/header/HeaderFarmerProfile.component';
import ProfileInfo from 'pages/shop/profile/header/ProfileInfo/ProfileInfo.component';
import PhotosGallery from 'pages/shop/profile/gallery/PhotosGallery.component';
import FarmerProducts from 'pages/shop/profile/products/FarmerProducts.component';
import Recipes from 'pages/shop/profile/recipes/Recipes.component';

const OpenStore = ({ farmer }) => {
  const { recipes, gallery, products } = farmer.config;

  return (
    <div className="public-profile__wrapper__store-open">
      <HeaderFarmerProfile {...farmer} />
      <ProfileInfo {...farmer} />
      {gallery && <PhotosGallery {...farmer} />}
      {products && <FarmerProducts farmer={farmer} />}
      {recipes && <Recipes farmer={farmer} />}
    </div>
  );
};

export default OpenStore;
