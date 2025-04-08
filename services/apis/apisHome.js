import {
  BANNERS,
  BLOGS,
  BRANDS,
  CATEGORIES,
  CATEGORY_PRODUCTS,
  LATEST_PRODUCTS,
  PRODUCTS_FROM_CATEGORY,
  WISHLIST,
  PACKAGES,
  AUTH,
  HOTELS,
  CARS,
  CUSTOM_PACKAGES,
  METADATA,
  HOTELS_REVIEW

} from "../constants/apiEndPointsHome";

import { GetApi, PostApi } from "./crudApis";

export const LatestProducts = () => GetApi(LATEST_PRODUCTS);
export const ProductsOfCategory = (category_id) =>
  GetApi(CATEGORY_PRODUCTS + category_id);
export const Categories = () => GetApi(CATEGORIES);
export const Brands = () => GetApi(BRANDS);
export const Banners = () => GetApi(BANNERS);
export const MyBlogs = () => GetApi(BLOGS);
export const MyPackages = () => GetApi(PACKAGES);
export const MyHotels = () => GetApi(HOTELS);
export const MyCars = () => GetApi(CARS);
export const MyMetaData = () => GetApi(METADATA);
export const MyCustomPackages = () => GetApi(CUSTOM_PACKAGES);
export const SubmitReview = () => PostApi(HOTELS_REVIEW)
export const AddHotelReview = () => PostApi(HOTELS_REVIEW)
