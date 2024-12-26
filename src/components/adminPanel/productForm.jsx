import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { productFormSchema } from "@/validationSchema/productFormSchema";
import { Minus, Plus, Trash, X } from "lucide-react";
import { useAddProduct } from "@/hooks/mutation";
import { ClipLoader } from "react-spinners";
import {
  useFetchAllCategories,
  useFetchAllParentCategories,
  useFetchCategoriesByParentId,
} from "@/hooks/query";
import Image from "next/image";

const ProductForm = () => {
  const [parentId, setParentId] = useState(null);
  const [newCategory, setNewCategory] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [categoryName, setCategoryName] = useState(null);
  const [options, setOptions] = useState({});
  const [newOption, setNewOption] = useState({
    amount: "",
    price: 0,
    quantity: 0,
  });
  const [optionError, setOptionError] = useState(null);

  // QUERY TO FETCH ALL CATEGORIES
  // const { data: categories, isLoading: isCategoriesLoading } =
  //   useFetchAllCategories();

  // QUERY TO FETCH ALL PARENT CATEGORIES
  const { data: parentCategories, isParentCategoriesLoading } =
    useFetchAllParentCategories();

  // QUERY TO FETCH CATEGORIES BY PARENT ID
  const { data: categories, isLoading: isCategoriesLoading } =
    useFetchCategoriesByParentId(parentId);

  const [images, setImages] = useState([]);
  const [imgError, setImgError] = useState(null);
  const [imgLengthError, setImgLengthError] = useState(null);

  const imageRef = useRef(null);
  const optionsRef = useRef(null);

  const { mutate: addProduct, isPending } = useAddProduct({
    onSuccess(data) {
      toast.success("Product Added!", {
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      reset();
      setOptions({});
      setImages([]);
      if (images.length === 0) {
        imageRef.current.value = null;
      }
      if (Object.entries(options).length === 0) {
        optionsRef.current.value = null;
      }
    },
    onError(error) {
      toast.error("Error occured!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(productFormSchema),
  });
  const onSubmit = (data) => {
    if (images.length === 0) {
      setImgError("Please upload at least one image");
      return;
    } else if (!validateImages(images)) {
      return;
    }

    console.log(data)
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("parentCategory", data.parentCategory.split("|")[1]);
    formData.append("categoryId", data.categoryId);
    formData.append("category", data.category);
    formData.append("brand", data.brand);
    formData.append("options", JSON.stringify(options));

    // Append the images to FormData
    Array.from(images).forEach((image) => {
      formData.append("images", image);
    });
    if (Object.entries(options).length === 0) {
      setOptionError("Options required!");
    } else {
      addProduct(formData);
      setOptionError(null);
    }
  };

  const handleAmount = (value) => {
    setNewOption((prev) => ({
      ...prev,
      amount: value,
    }));
  };
  const handlePrice = (value) => {
    setNewOption((prev) => ({
      ...prev,
      price: value,
    }));
  };
  const handleQuantity = (value) => {
    setNewOption((prev) => ({
      ...prev,
      quantity: value,
    }));
  };

  const handleNewOption = () => {
    if (
      newOption.name === "" ||
      newOption.price === 0 ||
      newOption.quantity === 0
    ) {
      setOptionError("Field must not be empty");
    } else {
      setOptionError(null);
      setOptions((prev) => ({
        ...prev,
        [newOption.amount]: {
          price: newOption.price,
          quantityAvailable: newOption.quantity,
        },
      }));
    }
  };

  const handleRemoveOption = (optionVal) => {
    const { [optionVal]: deletedVal, ...newOptions } = options;
    setOptions(newOptions);
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    // Validate the selected images before setting them in state
    if (validateImages(selectedFiles)) {
      if (images.length + selectedFiles.length > 5) {
        setImgLengthError("Only five images must be uploaded for a product");
      } else {
        setImages((prev) => [...prev, ...selectedFiles]);
        setImgError(null);
        setImgLengthError(null);
      }
    }
  };

  const handleRemoveImage = (imgToRemove) => {
    const newImages = [...images.filter((img) => img !== imgToRemove)];
    setImages(newImages);
    if (newImages.length === 0) {
      imageRef.current.value = null;
    }
  };

  // Function to validate image files (type and size)
  const validateImages = (files) => {
    if (files.length > 5) {
      setImgLengthError("Only three images must be uploaded for a product");
      return false;
    } else {
      setImgLengthError(null);
    }
    for (let file of files) {
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        setImgError("Only JPEG and PNG images are allowed");
        return false;
      }
      if (file.size > 2 * 1024 * 1024) {
        // 2MB limit
        setImgError("Each image must be smaller than 2MB");
        return false;
      }
    }
    return true;
  };

  const handleNewCategory = () => {
    setNewCategory(!newCategory);
    setValue(category, "");
  };

  console.log(errors);

  return (
    <div className="bg-white p-4 font-sans">
      <form
        className="pt-5 grid grid-cols-2 w-full gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label
              className="text-sm register_mini_div:text-xs  text-slate-500 font-semibold"
              htmlFor="name"
            >
              Enter name
            </label>
            <input
              className=" product_input"
              type="text"
              id="name"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="text-sm register_mini_div:text-xs  text-slate-500 font-semibold"
              htmlFor="brand"
            >
              Enter brand name
            </label>
            <input
              className="product_input"
              type="text"
              id="brand_name"
              {...register("brand")}
            />
            {errors.brand && (
              <p className="text-red-500 text-xs">{errors.brand.message}</p>
            )}
          </div>
          {/* Add parent category */}
          <div className="flex flex-col gap-2">
            <label
              className="text-sm register_mini_div:text-xs  text-slate-500 font-semibold"
              htmlFor="category"
            >
              Enter parent category
            </label>
            <select
              {...register("parentCategory")}
              className="product_input capitalize cursor-pointer text-sm"
              onChange={(e) => {
                const [selectedId, selectedName] = e.target.value.split("|");
                setParentId(selectedId);
              }}
              defaultValue="default"
            >
              <option value="default" disabled hidden>
                Select parent category
              </option>
              {parentCategories?.map((category) => (
                <option
                  key={category._id}
                  // value={category.name}
                  value={`${category._id}|${category.name}`}
                  className=" p-1 text-sm"
                >
                  {category.name}
                </option>
              ))}
            </select>
            {errors.parentCategory && (
              <p className="text-red-500 text-xs">
                {errors.parentCategory.message}
              </p>
            )}
          </div>
          {parentId && categories?.length !== 0 ? (
            <div className="flex flex-col gap-2">
              <label
                className="text-sm register_mini_div:text-xs  text-slate-500 font-semibold"
                htmlFor="category"
              >
                Enter category
              </label>
              <select
                className="product_input capitalize cursor-pointer"
                defaultValue="default"
                onChange={(e) => {
                  const [selectedId, selectedName] = e.target.value.split("|");
                  console.log(selectedId, selectedName);
                  setValue("categoryId", selectedId);
                  setValue("category", selectedName);
                }}
              >
                <option value="default" disabled hidden>
                  Select sub category
                </option>
                {categories?.map((category) => (
                  <option
                    key={category._id}
                    // value={category.name}
                    value={`${category._id}|${category.name}`}
                    className=" p-1 text-sm rounded-none rounded-t-none"
                  >
                    {category.name}
                  </option>
                ))}
              </select>
              {/* <hr />
            <p className="text-center text-sm font-semibold">Or</p>
            <hr />
            <div className="flex gap-4 text-sm font-semibold">
              <p>Add a new category</p>
              <button
                type="button"
                className="p-1 rounded-lg border border-slate-300 bg-slate-100 cursor-pointer"
                onClick={() => setNewCategory(!newCategory)}
              >
                {newCategory ? (
                  <Minus size={15} className="text-blue-500" />
                ) : (
                  <Plus size={15} className="text-blue-500" />
                )}
              </button>
            </div>
            {newCategory && (
              <div>
                <input
                  className="product_input"
                  type="text"
                  id="category"
                  {...register("category")}
                  placeholder="Enter new category"
                />
              </div>
            )}
              */}
              {errors.category && (
                <p className="text-red-500 text-xs">
                  {errors.category.message}
                </p>
              )}
            </div>
          ) : (
            <p className="font-semibold text-sm">
              No sub categories for this category...
            </p>
          )}
          <div className="flex flex-col gap-2">
            <label
              className="text-sm register_mini_div:text-xs  text-slate-500 font-semibold"
              htmlFor="category"
            >
              Enter options
            </label>
            <div className="flex gap-2 items-center">
              <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xs text-slate-500">
                  Amount
                </label>
                <input
                  ref={optionsRef}
                  type="number"
                  className="product_input"
                  onChange={(e) => handleAmount(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="price" className="text-xs text-slate-500">
                  Price
                </label>
                <input
                  ref={optionsRef}
                  type="number"
                  className="product_input"
                  onChange={(e) => handlePrice(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="quantity" className="text-xs text-slate-500">
                  Quantity
                </label>
                <input
                  ref={optionsRef}
                  type="text"
                  className="product_input"
                  onChange={(e) => handleQuantity(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="p-1 mt-6 rounded-lg border border-slate-300 bg-slate-100 cursor-pointer"
                onClick={() => handleNewOption()}
              >
                <Plus className="h-5 w-5 text-blue-500" />
              </button>
            </div>
            {optionError && (
              <p className="text-red-500 text-xs">{optionError}</p>
            )}
          </div>
          {Object.entries(options).length !== 0 && (
            <table className="table-auto border-spacing-10 text-sm overflow-y-auto border border-slate-300 rounded-lg">
              <thead>
                <tr>
                  <td className="p-1 font-semibold">Amount</td>
                  <td className="p-1 font-semibold">Price</td>
                  <td className="p-1 font-semibold">Quantity</td>
                </tr>
              </thead>
              <tbody>
                {Object.entries(options)
                  .sort(([keyA], [keyB]) => Number(keyA) - Number(keyB))
                  .map(([key, value]) => (
                    <tr key={key}>
                      <td className="p-1">{key}</td>
                      <td className="p-1">{value.price}</td>
                      <td className="p-1">{value.quantityAvailable}</td>
                      <td>
                        <Trash
                          onClick={() => handleRemoveOption(key)}
                          className="h-3 w-3 text-red-700 cursor-pointer"
                        />
                      </td>
                    </tr>
                  ))}
                {optionError && <p>{optionError}</p>}
              </tbody>
            </table>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 w-full">
            <label
              className="text-sm register_mini_div:text-xs  text-slate-500 font-semibold"
              htmlFor="description"
            >
              Enter description
            </label>
            <textarea
              className="h-32 w-full border border-slate-200 p-2 text-sm focus:outline-slate-300 rounded-lg"
              id="description"
              {...register("description")}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-xs">
                {errors.description.message}
              </p>
            )}
          </div>
          <div>
            <label className="text-sm register_mini_div:text-xs  text-slate-500 font-semibold">
              Images:
            </label>
            <input
              ref={imageRef}
              type="file"
              multiple
              onChange={handleImageChange}
            />
            {imgError && <p className="text-red-500 text-xs">{imgError}</p>}
            {imgLengthError && (
              <p className="text-red-500 text-xs">{imgLengthError}</p>
            )}
          </div>
          <div className="flex flex-wrap mt-2">
            {images.map((img, index) => (
              <div key={index} className="text-center relative">
                {img && (
                  <Image
                    src={URL.createObjectURL(img)}
                    alt={`uploaded-preview-${index}`}
                    className=" aspect-square m-1 border rounded"
                    height={100}
                    width={100}
                  />
                )}
                <div
                  onClick={() => handleRemoveImage(img)}
                  className="absolute top-0 right-0 p-1 cursor-pointer rounded-full bg-red-500 text-white"
                >
                  <X className="h-3 w-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className=" w-full text-end col-span-2 ">
          <button
            type="submit"
            disabled={isPending}
            className="p-1 w-24 text-sm rounded-lg cursor-pointer text-center bg-black text-white "
          >
            {isPending ? (
              <div className="flex justify-center">
                <ClipLoader size={15} color="white" />
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
