import { apiSlice } from './apiSlice';

// Helper function to create FormData from product object
const createProductFormData = (product) => {
  const formData = new FormData();
  
  
  // Add all text fields
  for (const key in product) {
    if (key !== 'mainImage' && key !== 'additionalImages') {
      if (typeof product[key] === 'object' && product[key] !== null) {
        formData.append(key, JSON.stringify(product[key]));
      } else {
        formData.append(key, product[key]);
      }
    }
  }
  
  // Add main image if it's a File object
  if (product.mainImage instanceof File) {
    formData.append('mainImage', product.mainImage);
  }
   else if (typeof product.mainImage === 'string' && !product.mainImage.startsWith('blob:')) {
      // If it's a URL string (not a blob URL), pass it as is
      formData.append('mainImage', product.mainImage);
  }
  
  // Add additional images
  if (product.additionalImages && product.additionalImages.length > 0) {
    product.additionalImages.forEach((image, index) => {
      if (image instanceof File) {
        formData.append('additionalImages', image);
      } 
      else if (typeof image === 'string' && !image.startsWith('blob:')) {
        // If it's a URL string (not a blob URL), add it to an array
        formData.append('additionalImages', image);
      }
    });
  }else{
    formData.append('additionalImages', product.additionalImages);
  }
  
  return formData;
};

// Extend the API slice with product-related endpoints
export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/product/get-products',
      providesTags: ['Products'],
    }),
    
    getProduct: builder.query({
      query: (id) => `/product/get-products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Products', id }],
    }),
    
    addProduct: builder.mutation({
      query: (product) => {
        
        const formData = createProductFormData(product);
        
        return {
          url: '/product/create-product',
          method: 'POST',
          body: formData,
          // Don't set Content-Type header, it will be set automatically with boundary for FormData
          formData: true,
        };
      },
      invalidatesTags: ['Products'],
    }),
    
    updateProduct: builder.mutation({
      query: ({ _id, ...product }) => {
        const formData = createProductFormData(product);
        
        return {
          url: `/product/update-product/${_id}`,
          method: 'PUT',
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: (result, error, { _id }) => [{ type: 'Products', _id }],
    }),
    
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/delete-product/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});

// Export the generated hooks
export const {
  useGetProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;