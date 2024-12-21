import { useDeleteParentCategory } from "@/hooks/mutation";
import useUserStore from "@/store/user";
import { useRouter } from "next/router";
import React from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { DialogTrigger } from "../ui/dialog";

const DeleteParentCategoryModal = ({
  handleClose,
  refetchParentCategories,
}) => {
  const { currentUser } = useUserStore();
  const role = currentUser?.user.role;
  const router = useRouter();
  const id = router.query.id;
  const parent = router.query.name;
  const { mutate: deleteParentCategory, isPending: isDeletePending } =
    useDeleteParentCategory({
      onSuccess(data) {
        toast.success(data.message);
        refetchParentCategories();
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
      <p className="text-center text-sm font-semibold">
        All of the products and sub categories for this category will also be
        deleted!
      </p>
      <button
        onClick={() => {
          deleteParentCategory({
            id: id,
            role: role,
            parentCategory: parent,
          });
        }}
        type="button"
        disabled={isDeletePending}
        className={`bg-red-700 text-white p-1 w-full rounded-lg ${
          isDeletePending ? "opacity-50 duration-200" : ""
        }`}
      >
        {isDeletePending ? (
          <div className="flex justify-center">
            {" "}
            <ClipLoader size={15} color="white" />
          </div>
        ) : (
          "Delete"
        )}
      </button>
      <DialogTrigger>
        <button
          onClick={handleClose}
          type="button"
          className="bg-black text-white p-1 rounded-lg w-full"
        >
          Cancel
        </button>
      </DialogTrigger>
    </div>
  );
};

export default DeleteParentCategoryModal;
