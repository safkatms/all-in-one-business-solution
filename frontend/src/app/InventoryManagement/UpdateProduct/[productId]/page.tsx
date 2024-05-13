"use client";
import InventoryProductTable from "@/components/Inventorytable";
import Header from "@/components/publicheader";
import { useRouter } from "next/router";
import axios from "axios";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";

interface Product {
  productId: number;
  productName: string;
  productDetails: string;
  productPurchasePrice: number;
  productSellPrice: number;
  porductBrand: string;
  productQuantity: number;
}

export default function UpdateProduct({
  params,
}: {
  params: { productId: string };
}) {
  const { productId } = params;
  const [product, setProduct] = useState<Product>({
    productId: 0,
    productName: "",
    productDetails: "",
    productPurchasePrice: 0,
    productSellPrice: 0,
    porductBrand: "",
    productQuantity: 0,
  });

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get<Product>(
          `http://localhost:3000/inventory-management/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  return (
    <>
      <Header />

      <div className="flex justify-end mt-3">
        <div className="flex items-center w-3/10">
          <input
            type="text"
            placeholder="Search..."
            className="appearance-none border rounded-xl w-full py-2 px-3 mr-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            type="button"
            className="bg-customTeal hover:bg-buttonHover border rounded-xl text-white font-bold text-sm py-2 px-3 mr-2  focus:outline-none focus:shadow-outline"
          >
            Search
          </button>
        </div>
      </div>

      <h1 className="text-3xl text-center mt-8">Update Product</h1>
      <div className="flex justify-center mt-3">
        <form className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <div className="mb-3">
            <label
              htmlFor="productName"
              className="block text-gray-700 font-bold mb-1 text-sm"
            >
              Product Name
            </label>
            <input
              type="text"
              name="productName"
              id="productName"
              value={product.productName}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="productDetails"
              className="block text-gray-700 font-bold mb-1 text-sm"
            >
              Product Details
            </label>
            <input
              type="text"
              name="productDetails"
              id="productDetails"
              value={product.productDetails}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="productPurchasePrice"
              className="block text-gray-700 font-bold mb-1 text-sm"
            >
              Product Purchase Price
            </label>
            <input
              type="number"
              name="productPurchasePrice"
              id="productPurchasePrice"
              value={product.productPurchasePrice}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="productSellPrice"
              className="block text-gray-700 font-bold mb-1 text-sm"
            >
              Product Sell Price
            </label>
            <input
              type="number"
              name="productSellPrice"
              id="productSellPrice"
              value={product.productSellPrice}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="productBrand"
              className="block text-gray-700 font-bold mb-1 text-sm"
            >
              Product Brand
            </label>
            <input
              type="text"
              name="productBrand"
              id="productBrand"
              value={product.porductBrand}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="productQuantity"
              className="block text-gray-700 font-bold mb-1 text-sm"
            >
              Product Quantity
            </label>
            <input
              type="number"
              name="productQuantity"
              id="productQuantity"
              value={product.productQuantity}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-customTeal hover:bg-buttonHover text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline mr-2 w-full sm:w-auto"
            >
              Update Product
            </button>
            <button
              type="reset"
              className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
            >
              Reset Product
            </button>
          </div>
        </form>
      </div>
      <InventoryProductTable />
    </>
  );
}
