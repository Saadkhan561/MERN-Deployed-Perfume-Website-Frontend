import axiosInstance from "../../axiosConfig";

export const fetchAllParentCategories = async () => {
  try {
    const res = await axiosInstance.get("/fetchAllParentCategories");
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addParentCategory = async (data) => {
  try {
    const res = await axiosInstance.post("/addParentCategory", data);
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

export const fetchCategoriesByParentId = async (data) => {
  try {
    const res = await axiosInstance.get(`/getCategoriesByParentId/${data}`);
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteParentCategory = async (data) => {
  try {
    const res = await axiosInstance.post(
      `/deleteParentCategory/${data.id}`,
      data
    );
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
