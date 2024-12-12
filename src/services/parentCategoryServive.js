import axiosInstance from "../../axiosConfig";

export const fetchAllParentCategories = async () => {
  try {
    const res = await axiosInstance.get("/fetchAllParentCategories");
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
