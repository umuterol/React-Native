export const DELETE_USER_PRODUCT = "DELETE_USER_PRODUCT";

export const deleteUserProduct = (productId) => {
    return {
        type: DELETE_USER_PRODUCT,
        productId,
    }
} 