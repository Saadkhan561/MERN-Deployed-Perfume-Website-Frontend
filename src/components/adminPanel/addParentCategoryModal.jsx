import { useAddParentCategory } from "@/hooks/mutation";
import useUserStore from "@/store/user";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const AddParentCategoryModal = ({ refetchParentCategories }) => {
  const [category, setCategory] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const { currentUser } = useUserStore();
  const role = currentUser?.user.role;

  const { mutate: addParentCategory, isPending: isParentCategoryPending } =
    useAddParentCategory({
      onSuccess(data) {
        toast.success(data.message);
        setCategory("");
        refetchParentCategories();
      },
      onError(err) {
        console.log(err);
        toast.error(err);
      },
    });

  const handleSubmit = () => {
    if (category === "") {
      setCategoryError("Category is required!");
    } else {
      setCategoryError("");
      addParentCategory({ role: role, name: category });
    }
  };

  return (
    <div className="w-max h-max flex flex-col gap-2 pt-6 font-sans">
      <p className="text-2xl font-semibold">Enter a parent category</p>
      <div className="flex flex-col gap-2">
        <label className="text-gray-500 text-sm">Enter category</label>
        <input
          type="text"
          className="p-2 focus:outline-none text-sm rounded-lg border border-slate-300"
          onChange={(e) => {
            e.target.value === ""
              ? setCategoryError("Category is required")
              : setCategoryError("");
            setCategory(e.target.value);
          }}
        />
        {categoryError !== "" && (
          <p className="text-xs text-red-500">{categoryError}</p>
        )}
      </div>
      <button
        onClick={handleSubmit}
        type="submit"
        disabled={isParentCategoryPending}
        className={`bg-black text-white p-1 rounded-lg ${
          isParentCategoryPending ? "opacity-50 duration-200" : ""
        }`}
      >
        {isParentCategoryPending ? (
          <div className="flex justify-center">
            {" "}
            <ClipLoader size={15} color="white" />
          </div>
        ) : (
          "Submit"
        )}
      </button>
    </div>
  );
};

export default AddParentCategoryModal;
