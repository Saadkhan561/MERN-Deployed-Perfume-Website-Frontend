// import axiosInstance from "axiosInstance";
// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
import axiosInstance from "../../axiosConfig";

export const fetchAllproducts = async (params) => {
  try {
    const products = await axiosInstance.get(
      `/getProducts?categoryId=${params.categoryId}&skip=${params.skip}`
    );
    return products.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const fetchNonFilteredProducts = async (params) => {
  try {
    if (params) {
      const products = await axiosInstance.get(
        `/getAllProducts?category=${params.filter || ""}&skip=${
          params.skip
        }&searchTerm=${params.searchTerm}`
      );
      return products.data;
    } else {
      const products = await axiosInstance.get("/getAllProducts");
      return products.data;
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export const fetchProductsByParentCategory = async (params) => {
  try {
    const products = await axiosInstance(
      `/getProductsByParentCategory/${params.id}`
    );
    return products.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const addProduct = async (data) => {
  try {
    const res = await axiosInstance.post("/addProduct", data);
    return res.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const fetchAllCategories = async () => {
  try {
    const categories = await axiosInstance.get("/getCategories");
    return categories.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const fetchProductById = async (id) => {
  if (id) {
    try {
      const product = await axiosInstance.get(`/getProductById/${id}`);
      return product.data;
    } catch (err) {
      console.log(err.response);
      throw new Error(err);
    }
  }
};

export const paymenyHook = async (data) => {
  try {
    const res = await axiosInstance.post("/create-checkout-session", data);
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const placeOrder = async (data) => {
  console.log(data);
  try {
    const res = await axiosInstance.post("/placeOrder", data);
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const fetchTrendingProducts = async () => {
  try {
    const res = await axiosInstance.get("/trendingProducts");
    return res.data;
  } catch (err) {
    throw new Error(err.msg);
  }
};

// SINGLE FUNCTION FOR EDITING PRODUCT FIELDS
export const editProduct = async (data) => {
  try {
    const res = await axiosInstance.put("/editProduct", data);
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const fetchProductImages = async (data) => {
  if (data) {
    try {
      const res = await axiosInstance.get(
        `/images/${data.parentCategory}/${data.category}/${data.productName}`
      );
      return res.data;
    } catch (err) {
      throw new Error(err.msg);
    }
  }
};

export const searchResults = async (param) => {
  const query = param.query;
  try {
    const res = await axiosInstance.get(`/search?q=${query}`);
    if (res.status == 404) {
      throw new Error("No results found");
    }
    return res.data;
  } catch (err) {
    throw new Error(err.msg);
  }
};
