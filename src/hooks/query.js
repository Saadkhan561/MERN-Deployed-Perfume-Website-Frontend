import { fetchCategoryById, fetchCategoryImages } from "@/services/categoryService";
import {
  getOrders,
  getUserOrderById,
  getUserOrders,
} from "@/services/orderService";
import {
  fetchAllCategories,
  fetchAllproducts,
  fetchNonFilteredProducts,
  fetchProductById,
  fetchProductImages,
  fetchTrendingProducts,
  searchResults,
} from "@/services/productService";
import { fetchUser } from "@/services/userService";
import { useQuery } from "@tanstack/react-query";

// FOR USERS
// export const useFetchUser = (options) => {
//   return useQuery({
//     ...options,
//     queryKey: ["user"],
//     queryFn: fetchUser,
//   });
// };

export const useFetchAllProducts = (params, options) => {
  return useQuery({
    ...options,
    queryKey: ["products", params],
    queryFn: () => fetchAllproducts(params),
  });
};

export const useFetchNonFilteredProducts = (params, options) => {
  return useQuery({
    ...options,
    queryFn: () => fetchNonFilteredProducts(params),
    queryKey: ["Non filtered products", params],
  });
};

export const useFetchTrendingProducts = (options) => {
  return useQuery({
    ...options,
    queryKey: ["trendingProducts"],
    queryFn: fetchTrendingProducts,
  });
};

export const useFetchAllCategories = (options) => {
  return useQuery({
    ...options,
    queryKey: ["categories"],
    queryFn: fetchAllCategories,
  });
};

export const useFetchCategoryById = (params, options) => {
  return useQuery({
    ...options,
    queryKey: ["category", params],
    queryFn:() => fetchCategoryById(params)
  })
}

export const useFetchProductById = (id, options) => {
  return useQuery({
    ...options,
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
  });
};

export const useFetchProductImages = (params, options) => {
  return useQuery({
    ...options,
    queryKey: ["product_images", params.category, params.productName],
    queryFn: () => fetchProductImages(params),
  });
};

export const useFetchSearchResults = (param, options) => {
  return useQuery({
    ...options,
    queryKey: ["searchResults", param],
    queryFn: () => searchResults(param),
  });
};

export const useFetchOrders = (params, options) => {
  return useQuery({
    ...options,
    queryKey: ["orders", params],
    queryFn: () => getOrders(params),
  });
};

export const useGetUserOrders = (params, options) => {
  return useQuery({
    ...options,
    queryKey: ["user_orders", params],
    queryFn: () => getUserOrders(params),
  });
};

export const useGetUserOrderById = (params, options) => {
  return useQuery({
    ...options,
    queryKey: ["user_single_order", params],
    queryFn: () => getUserOrderById(params),
  });
};

export const useFetchCategoryImages = (params, options) => {
  return useQuery({
    ...options,
    queryKey: ['categoryImage', params],
    queryFn: () => fetchCategoryImages(params)
  })
}
