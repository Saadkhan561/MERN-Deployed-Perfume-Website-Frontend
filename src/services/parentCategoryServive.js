import axiosInstance from "../../axiosConfig";

export const fetchParentCategories = async() => {
    try {
        const res = await axiosInstance.get('/fetchParentCategories')
        return res.data
    } catch(error) {
        throw new Error(error.message)
    }
}