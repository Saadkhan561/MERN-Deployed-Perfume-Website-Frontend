import Card from "@/components/cards/product-card";
import Pagination from "@/components/common/paginationComponent";
import { ProductCardSkeleton } from "@/components/loadingSkeletons/productCardSkeleton";
import Meta from "@/components/metaTags/meta";
import { useFetchAllProducts, useFetchCategoryById } from "@/hooks/query";
import Layout from "@/layout/layout";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

const Products = () => {
  const categoryId = useSearchParams().get("id");
  const { data: category } = useFetchCategoryById({ id: categoryId });
  const [skip, setSkip] = useState(0);

  const { data: products, isLoading: isProductsLoading } = useFetchAllProducts({
    categoryId: categoryId,
    skip: skip,
  });

  return (
    <Layout>
      <Meta
        title="Perfume Collection - Perfume Shop"
        description="Explore our exclusive collection of perfumes from top brands."
        keywords="perfume collection, luxury perfumes, top perfume brands"
      />
      <div className="flex flex-col items-start h-full w-full">
        <div className="w-full h-[250px] relative">
          <Image
            src="/images/route_bg.jpg"
            alt="route_bg"
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute top-0 w-full h-full left-0">
            <div className="flex flex-col gap-2 h-full text-white items-center justify-center">
              <p className="sm:text-5xl text-3xl font-semibold">Products</p>
              {category && (
                <div className="flex items-center gap-2 sm:text-base text-xs">
                  <Link className="hover:underline" href="/">
                    Home
                  </Link>
                  <p>&gt;</p>
                  <Link className="hover:underline" href="/categories">
                    Categories
                  </Link>
                  <p>&gt;</p>
                  <Link
                    className="hover:underline"
                    href={`/productsAll?id=${category[0].parentCategoryId}`}
                  >
                    {category[0]?.parentCategoryName}
                  </Link>
                  <p>&gt;</p> <p className="capitalize">{category[0]?.name}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-10 mt-2 mob_display:mt-2 duration-200 w-full h-full">
          <div className="flex flex-col gap-10 flex-start w-4/5">
            <div className="flex gap-4 mt-10 flex-wrap mob_display:justify-center mob_display_product:flex-col mob_display_product:items-center">
              {isProductsLoading ? (
                <div className="flex gap-4 mt-10 flex-wrap mob_display:justify-center mob_display_product:flex-col">
                  <ProductCardSkeleton />
                  <ProductCardSkeleton />
                  <ProductCardSkeleton />
                  <ProductCardSkeleton />
                  <ProductCardSkeleton />
                </div>
              ) : products?.message ? (
                <div className="flex justify-center items-center w-full h-full ">
                  <div className="flex justify-center p-4 gap-2 items-center">
                    <p className="text-2xl">{products.message}</p>
                  </div>
                </div>
              ) : (
                category &&
                products?.products[0].products?.map((item) => (
                  <Card
                    key={item._id}
                    id={item._id}
                    product={item}
                    category={item.categoryDetails.name}
                    parentCategory={
                      item.categoryDetails.parentCategoryDetails.name
                    }
                  />
                ))
              )}
            </div>
          </div>
          {products?.products.length !== 0 && (
            <div className="flex justify-center w-full">
              <Pagination
                pages={products?.totalPages}
                skip={skip}
                setSkip={setSkip}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
