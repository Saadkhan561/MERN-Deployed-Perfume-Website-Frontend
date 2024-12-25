import React from "react";
import Layout from "../../layout/layout";
import Meta from "@/components/metaTags/meta";
import Image from "next/image";
import Link from "next/link";
import { useFetchProductsByParentCategory } from "../../hooks/query";
import { useRouter } from "next/router";
import Card from "@/components/cards/product-card";

const AllProducts = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useFetchProductsByParentCategory({
    id: id ? id : null,
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
              <p className="text-4xl font-semibold">
                {data && data[0].parent_category_name}
              </p>
              <div className="flex items-center gap-2">
                <Link className="hover:underline" href="/">
                  Home
                </Link>
                <p>&gt;</p>
                <Link className="hover:underline" href="/categories">
                  Products
                </Link>
                {/* <p>&gt;</p> <p className="capitalize">{category?.name}</p> */}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 items-center pt-4 w-full">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            data?.map((item, index) => (
              <div key={index} className="w-11/12 p-4">
                <div className="flex sm:items-center sm:flex-row sm:justify-between flex-col items-start">
                  <p className="text-3xl capitalize">{item.subcategory_name}</p>
                  <Link
                    href={`/products?id=${item.category_id}`}
                    className=" text-gray-500 hover:underline"
                  >
                    View more
                  </Link>
                </div>
                <div className="flex gap-4 sm:pt-4 flex-wrap mob_display_product:flex-col mob_display_product:items-center">
                  {item.products.map((product) => (
                    <Card
                      key={product._id}
                      id={product._id}
                      product={product}
                      category={product.category.name}
                      parentCategory={item.parent_category_name}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AllProducts;
