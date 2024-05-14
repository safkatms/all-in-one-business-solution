"use client";
import InventoryProductTable from "@/components/Inventorytable";
import Sidebar from "@/components/sidebar";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import axios from "axios";
import InsideHeader from "@/components/insideheader";
import SearchComponent from "@/components/searchComponent";
import ProtectedRoute from "@/utils/protectedRoute";
import Cookies from "js-cookie";

export default function AddProduct() {
  const [productName, setProductName] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [productPurchasePrice, setProductPurchasePrice] = useState("");
  const [productSellPrice, setProductSellPrice] = useState("");
  const [porductBrand, setPorductBrand] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [error, setError] = useState("");

  const handleChangeProductName = (e: ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
  };

  const handleProductDetails = (e: ChangeEvent<HTMLInputElement>) => {
    setProductDetails(e.target.value);
  };

  const handleProductPurchasePrice = (e: ChangeEvent<HTMLInputElement>) => {
    setProductPurchasePrice(e.target.value);
  };

  const handleProductSellPrice = (e: ChangeEvent<HTMLInputElement>) => {
    setProductSellPrice(e.target.value);
  };

  const handleProductBrand = (e: ChangeEvent<HTMLInputElement>) => {
    setPorductBrand(e.target.value);
  };
  const handleProductQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    setProductQuantity(e.target.value);
  };

  //handle on submit
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (
      !productName ||
      !productDetails ||
      !productPurchasePrice ||
      !productSellPrice ||
      !porductBrand ||
      !productQuantity
    ) {
      setError("All fields are required");
    } else {
      try {
        postData();
        alert("product register successfully");
      } catch (e: any) {
        setError(e);
      }
      setProductName("");
      setProductDetails("");
      setProductPurchasePrice("");
      setProductSellPrice("");
      setPorductBrand("");
      setProductQuantity("");
      setError("");
    }
  };
  //post data in db
  async function postData() {
    try {
      const token = Cookies.get("jwtToken");
      const data1 = {
        productName: productName,
        productDetails: productDetails,
        productPurchasePrice: parseInt(productPurchasePrice),
        productSellPrice: parseInt(productSellPrice),
        porductBrand: porductBrand,
        productQuantity: parseInt(productQuantity),
      };
      console.log(data1);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/inventory-management/add-item`,
        data1,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <ProtectedRoute requiredRole={"owner"}>
      <InsideHeader />
      {/* <SearchComponent /> */}
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
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

          <div className="flex justify-center mt-3">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-md bg-white rounded-lg shadow-md p-6 "
            >
              <h1 className="text-2xl text-center mt-0 mb-3">Add Product</h1>
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
                  value={productName}
                  onChange={handleChangeProductName}
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
                  value={productDetails}
                  onChange={handleProductDetails}
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
                  value={productPurchasePrice}
                  onChange={handleProductPurchasePrice}
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
                  value={productSellPrice}
                  onChange={handleProductSellPrice}
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
                  name="porductBrand"
                  value={porductBrand}
                  onChange={handleProductBrand}
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
                  value={productQuantity}
                  onChange={handleProductQuantity}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-customTeal hover:bg-customBlack2 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline mr-2 w-full sm:w-auto"
                >
                  Register Product
                </button>
                <button
                  type="reset"
                  className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
                >
                  Reset Product
                </button>
                {error && <p>{error}</p>}
              </div>
            </form>
          </div>
          <InventoryProductTable />
        </div>
      </div>

      {/* <InventoryProductTable /> */}
    </ProtectedRoute>
  );
}
