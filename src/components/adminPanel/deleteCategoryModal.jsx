import { useDeleteCategory } from "@/hooks/mutation";
import useUserStore from "@/store/user";
import { useRouter } from "next/router";
import React from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const DeleteCategoryModal = ({refetchCategories}) => {
  const { currentUser } = useUserStore();
  const role = currentUser?.user.role;
  const router = useRouter();
  const id = router.query.id;
  const name = router.query.name;
  const parent = router.query.parent;
  const { mutate: deleteCategory, isPending: isDeleteCategoryPending } =
    useDeleteCategory({
      onSuccess(data) {
        toast.success(data.message);
        refetchCategories();
      },
      onError(err) {
        toast.error(err);
      },
    });
  return (
    <div className="flex flex-col gap-2">
      <p className="text-center text-xl font-semibold">
        Do you want to delete this category?
      </p>
      <button
        onClick={() =>
          deleteCategory({
            id: id,
            role: role,
            category: name,
            parentCategory: parent,
          })
        }
        type="button"
        className={`bg-red-700 text-white p-1 w-full rounded-lg ${
          isDeleteCategoryPending ? "opacity-50 duration-200" : ""
        }`}
      >
        {isDeleteCategoryPending ? (
          <div className="flex justify-center">
            {" "}
            <ClipLoader size={15} color="white" />
          </div>
        ) : (
          "Delete"
        )}
      </button>
      <button
        type="button"
        className="bg-black text-white p-1 rounded-lg w-full"
      >
        Cancel
      </button>
    </div>
  );
};

export default DeleteCategoryModal;
