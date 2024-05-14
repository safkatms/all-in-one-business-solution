"use client";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import InsideHeader from "@/components/insideheader";
import Sidebar from "@/components/sidebar";
import ProtectedRoute from "@/utils/protectedRoute";
import { getToken } from "@/utils/auth";
import Order from "@/components/contactbox";

interface Product {
  productId: string;
  productName: string;
  quantity: number;
}

export default function OrderItems() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orderId, setOrderId] = useState("");
  const [totalPrice, settotalPrice] = useState("");
  const [error, setError] = useState("");

  const handleChangeOrderId = (e: ChangeEvent<HTMLInputElement>) => {
    setOrderId(e.target.value);
  };

  const handleProductChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    const updatedProducts = [...products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [name]: value,
    };
    setProducts(updatedProducts);
  };

  const addProduct = () => {
    setProducts([...products, { productId: "", productName: "", quantity: 0 }]);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!orderId) {
      setError("Order ID is required");
      return;
    }
    const token = getToken();
    try {
      const postData = {
        items: products.map(({ productId, productName, quantity }) => ({
          productId,
          productName,
          quantity,
        })),
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/order/${orderId}/items`,
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      settotalPrice(response.data.totalPrice);
      console.log("Order submitted successfully:", response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
       
        setError(error.response?.data?.message || "An error occurred");
      } else {
       
        setError("An error occurred");
      }
    }
  };
  

  return (
    <ProtectedRoute requiredRole={["owner"]}>
      <InsideHeader />
      <div className="flex justify-between">
        <Sidebar />
        <div>
          <div className="bg-white my-10 mr-40 pb-8 h-fit shadow-2xl rounded-xl">
            <h1 className="text-4xl font-extrabold flex justify-center p-8">
              Create order
            </h1>
            <div className="p-8 flex justify-center "></div>
            <Order />
          </div>
          <div className="bg-white my-10 mr-40 p-8 h-fit shadow-2xl rounded-xl">
            <h1 className="text-4xl font-extrabold flex justify-center p-8">
              Create Order
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="text-lg font-semibold flex justify-center p-8">
                <div>
                  <label htmlFor="">Add Order ID</label>
                </div>
                <div>
                  <input
                    type="text"
                    value={orderId}
                    onChange={handleChangeOrderId}
                    id=""
                    className="bg-customGray rounded ml-4 py-2 px-3 text-customBlack2 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              </div>
              <div>
                {products.map((product, index) => (
                  <table key={index}>
                    <tbody>
                      <tr>
                        <td>
                          <input
                            type="text"
                            name="productId"
                            placeholder="Product ID"
                            value={product.productId}
                            onChange={(e) => handleProductChange(index, e)}
                            className="bg-customGray rounded ml-4 py-2 px-3 text-customBlack2 leading-tight focus:outline-none focus:shadow-outline"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="productName"
                            placeholder="Product Name"
                            value={product.productName}
                            onChange={(e) => handleProductChange(index, e)}
                            className="bg-customGray rounded ml-4 py-2 px-3 text-customBlack2 leading-tight focus:outline-none focus:shadow-outline"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            name="quantity"
                            placeholder="Quantity"
                            value={product.quantity}
                            onChange={(e) => handleProductChange(index, e)}
                            className="bg-customGray rounded ml-4 py-2 px-3 text-customBlack2 leading-tight focus:outline-none focus:shadow-outline"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ))}
              </div>
              <div className=" flex justify-end">
                <button
                  type="button"
                  onClick={addProduct}
                  className="bg-customTeal text-white rounded-lg font-semibold mt-2 py-2 px-3"
                >
                  Add More Item
                </button>
                <button
                  type="submit"
                  className="bg-red-500 text-white rounded-lg font-semibold mt-2 py-2 px-3"
                >
                  Submit Order
                </button>
              </div>
            </form>
            <div className="bg-gray-200 w-fit text-start p-8 rounded-md">
              <h3 className="text-lg font-bold mb-2">Total Price</h3>
              <p className="text-xl font-bold">{totalPrice}</p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
