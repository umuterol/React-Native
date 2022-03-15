import Product from '../../models/product'

export const DELETE_USER_PRODUCT = "DELETE_USER_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async dispatch => {
    const response = await fetch("https://shop-app-5f9ab-default-rtdb.firebaseio.com/product.json");
    const resData = await response.json();
    const loadedProducts = []

    for (key in resData) {
      loadedProducts.push(new Product(key, 'u1', resData[key].title, resData[key].imageUrl, resData[key].description, +resData[key].price));
    }
    dispatch({ type: SET_PRODUCTS, products: loadedProducts })
  }
}

export const deleteUserProduct = (productId) => {
  return {
    type: DELETE_USER_PRODUCT,
    productId,
  };
};

export const createProduct = (title, imageUrl, description, price) => {
  return async (dispatch) => {
    const response = await fetch("https://shop-app-5f9ab-default-rtdb.firebaseio.com/product.json", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        imageUrl,
        description,
        price
      })
    })
    const data = await response.json();
    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        title,
        imageUrl,
        description,
        price,
      },
    });
  };
};

export const updateProduct = (productId, title, imageUrl, description) => {
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
