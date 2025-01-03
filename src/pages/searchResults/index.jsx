import { useFetchSearchResults } from "@/hooks/query";
import { useRouter } from "next/router";
import Layout from "@/layout/layout";
import Card from "@/components/cards/product-card";
import React from "react";
import Image from "next/image";
import Link from "next";
import { ClipLoader } from "react-spinners";

const SearchResults = () => {
  const router = useRouter();
  const queryParam = router.query.q;
  const {
    data: searchResults,
    isLoading,
    isError,
  } = useFetchSearchResults(
    { query: queryParam },
    { enabled: Boolean(queryParam), retry: false }
  );

  return (
    <Layout>
      <div className="w-full fle justify-center">
        <div className="w-full">
          <div className="w-full h-[250px] relative">
            <Image
              src="/images/route_bg.jpg"
              alt="route_bg"
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute top-0 w-full h-full left-0">
              <div className="flex flex-col gap-2 h-full text-white items-center justify-center">
                <p className="text-5xl font-semibold">Search Results</p>
                {/* <div className="flex items-center gap-2">
                  <Link className="hover:underliner" href="/">
                    Home
                  </Link>
                  <p>&gt;</p>
                  <Link className="hover:underline" href="/categories">
                    Categories
                  </Link>
                  <p>&gt;</p> <p className="capitalize">{category?.name}</p>
                </div> */}
              </div>
            </div>
          </div>
          <div className="flex justify-center w-full">
            <div className="flex flex-wrap gap-8 w-11/12 p-10 mob_display_product:gap-x-4 mob_display_product:gap-y-10 mob_display_product:p-2 mob_display:justify-center">
              {isError ? (
                <div className="w-full flex justify-center">
                  <p className="text-2xl">No resuts found...</p>
                </div>
              ) : isLoading ? (
                <div className="w-full h-full flex justify-center items-center">
                  <ClipLoader size={40} color="black" />
                </div>
              ) : (
                searchResults?.map((product) => (
                  <Card
                    key={product._id}
                    id={product._id}
                    product={product}
                    category={product.categoryDetails.name}
                    parentCategory={
                      product.categoryDetails.parentCategoryDetails.name
                    }
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SearchResults;
