"use client";
import InventoryProductTable from "@/components/Inventorytable";
import InsideHeader from "@/components/insideheader";
import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import ConfirmationModal from "@/components/ConfirmationModal";
import Cookies from "js-cookie";
import ProtectedRoute from "@/utils/protectedRoute";
import Sidebar from "@/components/sidebar";

interface Product {
  productId: number;
  productName: string;
  productDetails: string;
  productPurchasePrice: number;
  productSellPrice: number;
  porductBrand: string;
  productQuantity: number;
}

export default function RemoveProduct({
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

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const token = Cookies.get("jwtToken");
        const response = await axios.get<Product>(
          `http://localhost:3000/inventory-management/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  //handle on submit
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleConfirmation = async () => {
    try {
      await postData();
      setShowConfirmation(false);
      alert("Product removed successfully");
      Cookies.set(
        "successMessage",
        `Product Id ${productId} has been remove !`
      );
    } catch (e: any) {
      setError(e);
    }
  };
  //handle popup cancel
  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  //post data in db
  async function postData() {
    try {
      const token = Cookies.get("jwtToken");
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/inventory-management/remove-item/${productId}`,
        {
          headers: {
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
      <div className="min-w-screen min-h-screen items-center">
        <div className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Sidebar />
          <div className="items-center w-screen mx-2 m-10 rounded-lg ring-offset-2 ring-2">
            <div className="bg-white my-10  mx-2 m-10 w-100% border ">
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
                  className="w-full max-w-md bg-white p-6"
                >
                  <h1 className="text-2xl text-center font-bold mt-0 mb-3">
                    Remove Product
                  </h1>
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
                      value={product.productPurchasePrice.toString()}
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
                      value={product.productSellPrice.toString()}
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
                      value={product.productQuantity.toString()}
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className=" bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline mr-2 w-full sm:w-auto"
                    >
                      Remove Product
                    </button>
                    {error && <p>{error}</p>}
                  </div>
                </form>
              </div>
            </div>
            <div className="bg-white my-10  mx-2 m-10 w-100% border ">
              <InventoryProductTable />
            </div>
          </div>
        </div>
      </div>
      {showConfirmation && (
        <ConfirmationModal
          message="Are you sure you want to remove this product?"
          onConfirm={handleConfirmation}
          onCancel={handleCancel}
        />
      )}
      {/* <InventoryProductTable /> */}
    </ProtectedRoute>
  );
}
