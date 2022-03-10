export const DELETE_USER_PRODUCT = "DELETE_USER_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const deleteUserProduct = (productId) => {
  return {
    type: DELETE_USER_PRODUCT,
    productId,
  };
};

export const createProduct = (title, imageUrl, description, price) => {
  return {
    type: CREATE_PRODUCT,
    productData: {
      title,
      imageUrl,
      description,
      price,
    },
  };
};

export const updateProduct = (
  productId,
  title,
  imageUrl,
  description,
) => {
  return {
    type: UPDATE_PRODUCT,
    productId,
    productData: {
      title,
      imageUrl,
      description,
    },
  };
};
