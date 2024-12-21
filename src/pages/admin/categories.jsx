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

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Meta from "@/components/metaTags/meta";
import { ClipLoader } from "react-spinners";
import { useFetchAllParentCategories } from "@/hooks/query";
import { useUpdateParentCategory } from "@/hooks/mutation";
import { toast } from "react-toastify";
import useUserStore from "@/store/user";
import { useRouter } from "next/router";
import AddParentCategoryModal from "@/components/adminPanel/addParentCategoryModal";
import DeleteParentCategoryModal from "@/components/adminPanel/deleteParentCategoryModal";

const Categories = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [categoryId, setCategoryId] = useState(null);

  const [categoryInput, setCategoryInput] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const { currentUser } = useUserStore();
  const role = currentUser?.user.role;

  const router = useRouter();
  const {
    data: parentCategories,
    refetch: refetchParentCategories,
    isLoading: isParentCategoriesLoading,
  } = useFetchAllParentCategories();

  const {
    mutate: updateParentCategory,
    isPending: isUpdateParentCategoryPending,
  } = useUpdateParentCategory({
    onSuccess(data) {
      toast.success(data.message);
      setIsEdit(!isEdit);
      refetchParentCategories();
      setCategoryId(null);
    },
    onError(err) {
      toast.error(err);
    },
  });

  const handleEditCategory = (categoryId, parentCategory) => {
    if (categoryInput === "") {
      setCategoryError("Field must not be empty!");
    } else {
      updateParentCategory({
        role: role,
        id: categoryId,
        name: categoryInput,
        parentCategory: parentCategory,
      });
      setCategoryError("");
    }
  };

  const handleClose = () => {
    const { id, name, ...rest } = router.query;
    router.push({ pathname: router.pathname, query: rest }, undefined, {
      shallow: true,
    });
  };

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
              <DialogContent>
                <AddParentCategoryModal
                  refetchParentCategories={refetchParentCategories}
                />
              </DialogContent>
            </Dialog>
          </div>
          <Table className="mt-5 table-fixed w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isParentCategoriesLoading ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center p-4 text-lg">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : (
                parentCategories?.map((category) => (
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
                              handleEditCategory(category._id, category.name);
                            } else {
                              setIsEdit(!isEdit);
                              setCategoryId(category._id);
                            }
                          }}
                          disabled={
                            isUpdateParentCategoryPending &&
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
                          isUpdateParentCategoryPending ? (
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
                            onClick={() => setIsEdit(!isEdit)}
                            className="text-sm p-1 rounded-lg text-center w-16 bg-white text-black border-2 border-slate-200"
                          >
                            Cancel
                          </button>
                        )}
                        <Dialog onOpenChange={handleClose}>
                          <DialogTrigger asChild>
                            <button
                              onClick={() =>
                                router.push(
                                  `?id=${category._id}&name=${category.name}`
                                )
                              }
                              className="bg-red-700 text-white p-1 rounded-lg w-20"
                            >
                              Delete
                            </button>
                          </DialogTrigger>
                          <DialogContent className="flex flex-col gap-2 font-sans rounded-lg pt-10 lg:w-1/4 sm:w-2/4 w-4/5">
                            <DeleteParentCategoryModal
                              refetchParentCategories={refetchParentCategories}
                              handleClose={handleClose}
                            />
                          </DialogContent>
                        </Dialog>
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

export default Categories;
