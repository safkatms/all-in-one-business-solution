"use client";
import InventoryProductTable from "@/components/Inventorytable";
import axios from "axios";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import InsideHeader from "@/components/insideheader";
import Cookies from "js-cookie";
import ProtectedRoute from "@/utils/protectedRoute";

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

  const [productName, setProductName] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [productPurchasePrice, setProductPurchasePrice] = useState(0);
  const [productSellPrice, setProductSellPrice] = useState(0);
  const [porductBrand, setPorductBrand] = useState("");
  const [productQuantity, setProductQuantity] = useState(0);
  const [error, setError] = useState("");

  const handleChangeProductName = (e: ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
  };

  const handleProductDetails = (e: ChangeEvent<HTMLInputElement>) => {
    setProductDetails(e.target.value);
  };

  const handleProductPurchasePrice = (e: ChangeEvent<HTMLInputElement>) => {
    setProductPurchasePrice(parseInt(e.target.value));
  };

  const handleProductSellPrice = (e: ChangeEvent<HTMLInputElement>) => {
    setProductSellPrice(parseInt(e.target.value));
  };

  const handleProductBrand = (e: ChangeEvent<HTMLInputElement>) => {
    setPorductBrand(e.target.value);
  };
  const handleProductQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    setProductQuantity(parseInt(e.target.value));
  };

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

        setProductName(response.data.productName);
        setProductDetails(response.data.productDetails);
        setProductPurchasePrice(response.data.productPurchasePrice);
        setProductSellPrice(response.data.productSellPrice);
        setPorductBrand(response.data.porductBrand);
        setProductQuantity(response.data.productQuantity);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  //handle on submit
  const handleSubmit = async (e: SyntheticEvent) => {
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
        await postData();
        alert("product Update successfully");
      } catch (e: any) {
        setError(e);
      }
      setProductName("");
      setProductDetails("");
      setProductPurchasePrice(parseInt(""));
      setProductSellPrice(parseInt(""));
      setPorductBrand("");
      setProductQuantity(parseInt(""));
      setError("");
    }
  };

  //post data in db
  async function postData() {
    try {
      // const formData = new FormData();
      // formData.append("productName", productName);
      // formData.append("productDetails", productDetails);
      // formData.append("productPurchasePrice", productPurchasePrice);
      // formData.append("productSellPrice", productSellPrice);
      // formData.append("porductBrand", porductBrand);
      // formData.append("productQuantity", productQuantity);
      const token = Cookies.get("jwtToken");

      const data1 = {
        productName: productName,
        productDetails: productDetails,
        productPurchasePrice: productPurchasePrice,
        productSellPrice: productSellPrice,
        porductBrand: porductBrand,
        productQuantity: productQuantity,
      };
      console.log(data1);
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/inventory-management/modify-item/${productId}`,
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
          className="w-full max-w-md bg-white rounded-lg shadow-md p-6"
        >
          <h1 className="text-2xl text-center mt-0 mb-3">Update Product</h1>
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
              id="productDetails"
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
              id="productPurchasePrice"
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
              id="productSellPrice"
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
              name="productBrand"
              id="productBrand"
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
              id="productQuantity"
              value={productQuantity}
              onChange={handleProductQuantity}
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
            {error && <p>{error}</p>}
          </div>
        </form>
      </div>
      <InventoryProductTable />
    </ProtectedRoute>
  );
}
