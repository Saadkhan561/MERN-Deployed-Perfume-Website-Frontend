import axiosInstance from "../../axiosConfig";

export const fetchAllParentCategories = async () => {
  try {
    const res = await axiosInstance.get("/fetchAllParentCategories");
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateParentCategory = async (data) => {
  try {
    const res = await axiosInstance.put("/updateParentCategory", data);
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
