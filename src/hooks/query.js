import {
  fetchCategoryById,
  fetchCategoryImages,
} from "@/services/categoryService";
import {
  getOrders,
  getUserOrderById,
  getUserOrders,
} from "@/services/orderService";
import {
  fetchAllParentCategories,
  fetchCategoriesByParentId,
  fetchParentCategories,
} from "@/services/parentCategoryServive";
import {
  fetchAllCategories,
  fetchAllproducts,
  fetchNonFilteredProducts,
  fetchProductById,
  fetchProductImages,
  fetchProductsByParentCategory,
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

export const useFetchProductsByParentCategory = (params, options) => {
  return useQuery({
    ...options,
    queryFn: () => fetchProductsByParentCategory(params),
    queryKey: ["product_by_parent_category", params],
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

export const useFetchAllParentCategories = (options) => {
  return useQuery({
    ...options,
    queryKey: ["parent_categories"],
    queryFn: fetchAllParentCategories,
  });
};

export const useFetchCategoriesByParentId = (params, options) => {
  return useQuery({
    ...options,
    queryKey: ["categories_by_parent_id", params],
    queryFn: () => fetchCategoriesByParentId(params),
    enabled: Boolean(params),
  });
};

export const useFetchCategoryById = (params, options) => {
  return useQuery({
    ...options,
    queryKey: ["category", params],
    queryFn: () => fetchCategoryById(params),
  });
};

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
    queryKey: [
      "product_images",
      params.category,
      params.productName,
      params.parentCategory,
    ],
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
    queryKey: ["categoryImage", params],
    queryFn: () => fetchCategoryImages(params),
  });
};
