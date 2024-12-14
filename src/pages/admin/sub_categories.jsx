import React, { useState } from "react";
import AdminLayout from "./layout";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetchAllCategories } from "@/hooks/query";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddCagtegory from "@/components/adminPanel/addCategoryModal";
import { useDeleteCategory, useUpdateCategory } from "@/hooks/mutation";
import { ClipLoader } from "react-spinners";
import useUserStore from "@/store/user";
import { toast } from "react-toastify";
import Meta from "@/components/metaTags/meta";
import { useRouter } from "next/router";
import DeleteCategoryModal from "@/components/adminPanel/deleteCategoryModal";

const SubCategories = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [isDelete, setIsDelete] = useState(false);

  const [categoryInput, setCategoryInput] = useState("");
  const [categoryError, setCategoryError] = useState("");

  const { currentUser } = useUserStore();
  const role = currentUser?.user.role;
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    refetch: refetchCategories,
  } = useFetchAllCategories();

  const { mutate: updateCategory, isPending: isUpdateCategoryPending } =
    useUpdateCategory({
      onSuccess(data) {
        toast.success(data.message);
        setIsEdit(!isEdit);
        refetchCategories();
        setCategoryId(null);
      },
      onError(err) {
        toast.error(err);
      },
    });

  const handleEditCategory = (categoryId, parentCategory, category) => {
    if (categoryInput === "") {
      setCategoryError("Field must not be empty!");
    } else {
      updateCategory({
        role: role,
        id: categoryId,
        name: categoryInput,
        parentCategory: parentCategory,
        category: category,
      });
      setCategoryError("");
    }
  };

  const router = useRouter();

  return (
    <AdminLayout>
      <Meta
        title="Admin Sub Categories - Perfume Shop"
        description="Manage product sub categories for the Perfume Shop."
      />
      <div className="p-4 bg-slate-200 h-full">
        <div className="bg-white rounded-lg p-4">
          <div className="flex justify-between items-center">
            <p className="text-xl">Categories</p>
            <Dialog>
              <DialogTrigger asChild>
                <button className="p-1 pl-2 pr-2 text-sm rounded-lg cursor-pointer text-center bg-black text-white ">
                  Add Category
                </button>
              </DialogTrigger>
              <AddCagtegory refetchCategories={refetchCategories} />
            </Dialog>
          </div>
          <Table className="mt-5 table-fixed w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Parent Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isCategoriesLoading ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center p-4 text-lg">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : (
                categories?.map((category) => (
                  <TableRow key={category._id}>
                    <TableCell>
                      {isEdit && categoryId === category._id ? (
                        <>
                          {" "}
                          <input
                            type="text"
                            placeholder="Enter category"
                            className="p-1 rounded-lg focus:outline-none border-2 border-slate-200 text-sm"
                            onChange={(e) => {
                              e.target.value === ""
                                ? setCategoryError("Fields must not be empty!")
                                : setCategoryError("");
                              setCategoryInput(e.target.value);
                            }}
                          />
                          {categoryError !== "" && (
                            <p className="text-xs text-red-500">
                              {categoryError}
                            </p>
                          )}
                        </>
                      ) : (
                        category.name
                      )}
                    </TableCell>
                    <TableCell>{category.parentCategoryName}</TableCell>
                    <TableCell>
                      <div className="flex gap-2 items-center">
                        <button
                          onClick={() => {
                            if (isEdit) {
                              handleEditCategory(
                                category._id,
                                category.parentCategoryName,
                                category.name
                              );
                            } else {
                              setIsEdit(!isEdit);
                              setCategoryId(category._id);
                            }
                          }}
                          disabled={
                            isUpdateCategoryPending &&
                            isEdit &&
                            categoryId === category._id
                          }
                          className={`text-sm p-1 rounded-lg text-center w-16 ${
                            isEdit && categoryId === category._id
                              ? "bg-white text-black border-2 border-slate-200"
                              : "bg-blue-700 text-white"
                          }`}
                        >
                          {isEdit &&
                          categoryId === category._id &&
                          isUpdateCategoryPending ? (
                            <div className="flex justify-center">
                              <ClipLoader size={15} color="black" />
                            </div>
                          ) : isEdit && categoryId === category._id ? (
                            "Done"
                          ) : (
                            "Edit"
                          )}
                        </button>
                        {isEdit && categoryId === category._id && (
                          <button
                            onClick={() => {
                              setIsEdit(!isEdit);
                              setCategoryId(null);
                            }}
                            className="text-sm p-1 rounded-lg text-center w-16 bg-white text-black border-2 border-slate-200"
                          >
                            Cancel
                          </button>
                        )}
                        {categoryId !== category._id && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <button
                                onClick={() =>
                                  router.push(
                                    `?id=${category._id}&name=${category.name}&parent=${category.parentCategoryName}`
                                  )
                                }
                                className="bg-red-700 text-white p-1 rounded-lg w-20"
                              >
                                Delete
                              </button>
                            </DialogTrigger>
                            <DialogContent className="flex flex-col gap-2 font-sans pt-10">
                              <DeleteCategoryModal
                                refetchCategories={refetchCategories}
                              />
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SubCategories;
