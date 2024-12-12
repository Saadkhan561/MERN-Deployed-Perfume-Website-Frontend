import Layout from "@/layout/layout";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Card from "@/components/cards/product-card";
import { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  useFetchAllCategories,
  useFetchAllParentCategories,
  useFetchTrendingProducts,
} from "@/hooks/query";
import ServiceCard from "@/components/cards/service-card";
import { settings } from "../../carouselConfig";
// import CategoryCard from "@/components/cards/categoryCard";
import { ProductCardSkeleton } from "@/components/loadingSkeletons/productCardSkeleton";
import CategoryCardSkeleton from "@/components/loadingSkeletons/categoryCardSkeleton";
import Meta from "@/components/metaTags/meta";
import SliderImageCard from "@/components/cards/sliderImageCard";
import ParentCategoryCard from "@/components/cards/parentCategoryCard";

export default function Home() {
  // const { data: categories, isLoading: isCategoryLoading } =
  //   useFetchAllCategories();

  const { data: parentCategories, isLoading: isParentCategoriesLoading } =
    useFetchAllParentCategories();

  const { data: trendingProducts, isLoading: trendingProductsLoading } =
    useFetchTrendingProducts();
  useEffect(() => {
    AOS.init({});
  }, []);

  return (
    <Layout>
      <Meta
        title="Perfume Shop - Luxury Fragrances"
        description="Discover luxury perfumes and fragrances at the Perfume Shop. Shop the latest collections and exclusive scents."
        keywords="perfume, fragrance, luxury perfume, perfume shop"
      />
      <div className="w-full flex flex-col gap-4 sm:gap-8">
        {/* MAIN AD DIV */}
        <div className="flex justify-center h-max mob_display:pt-0">
          <Slider
            className="w-full sm:h-[300px] md:h-[400px] h-[400px] z-20"
            {...settings}
          >
            {/* {Array.from({length: 3}).map((img, index) => (
              <SliderImageCard key={index} imgName={index+1} />
            ))} */}
            <div className="sm:h-[300px] md:h-[400px] h-[400px]">
              <Image
                className=" w-full h-full aspect-square"
                src="/images/ad_1.jpg"
                alt=""
                width={1600}
                height={900}
                // style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>

            <div className="sm:h-[300px] md:h-[400px] h-[400px]">
              <Image
                className=" w-full h-full aspect-square"
                src="/images/ad_2.jpg"
                alt=""
                width={1600}
                height={900}
                // style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
            <div className="sm:h-[300px] md:h-[400px] h-[400px]">
              <Image
                className=" w-full h-full aspect-square"
                src="/images/ad_3.jpg"
                alt=""
                width={1600}
                height={900}
                // style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
          </Slider>
        </div>
        <div className="flex justify-center gap-16 mob_display:items-center mt-8 mob_display:mt-20">
          <div className="w-11/12 flex flex-col items-center gap-28">
            {/* TRENDING DIV */}
            <div>
              <div className="flex flex-col items-center gap-3">
                <p className="text-4xl mb-4 mob_display:text-2xl">
                  Select from our trending items!
                </p>
              </div>
              <div className="flex flex-wrap mob_display:justify-center mob_display_product:flex-col mob_display_product:items-center gap-6 mt-6">
                {trendingProductsLoading ? (
                  <div className="flex flex-wrap mob_display:justify-center mob_display_product:flex-col mob_display_product:items-center gap-4 mt-6">
                    <ProductCardSkeleton />
                    <ProductCardSkeleton />
                    <ProductCardSkeleton />
                    <ProductCardSkeleton />
                    <ProductCardSkeleton />
                  </div>
                ) : trendingProducts?.message ? (
                  <div className="flex w-full justify-center items-center text-xl">
                    <p>{trendingProducts?.message}</p>
                  </div>
                ) : (
                  trendingProducts?.map((item) => (
                    <Card
                      key={item._id}
                      id={item._id}
                      product={item}
                      category={item.categoryDetails.name}
                    />
                  ))
                )}
              </div>
            </div>
            {/* PRODUCTS DIV */}
            <div className="flex flex-col items-center  gap-3 w-full">
              {/* PARENT CATEGORIES DIV */}
              {isParentCategoriesLoading ? (
                <CategoryCardSkeleton />
              ) : (
                parentCategories.map((parentCategory, index) => (
                  <ParentCategoryCard key={index} data={parentCategory} />
                ))
              )}
            </div>
            {/* REVIEWS DIV */}
            {/* <div className="flex flex-col items-center gap-10">
              <p className="text-4xl mob_display:text-2xl">
                See What Our Customers Are Saying!
              </p>
              <div
                data-aos="fade-up"
                className="flex flex-wrap mob_display:justify-center mob_display_product:flex-col gap-8"
              >
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
              </div>
            </div> */}
            {/* SERVICES DIV */}
            <div className="flex flex-col items-center gap-10">
              <p className="text-4xl">Services provided by us!</p>
              <div data-aos="fade-up" className="">
                <ServiceCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
