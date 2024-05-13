"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
interface Product {
  productId: number;
  productName: string;
  productDetails: string;
  productPurchasePrice: number;
  productSellPrice: number;
  porductBrand: string;
  productQuantity: number;
}

export default function InventoryProductTable() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/inventory-management/"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const router = useRouter();
  //navigate Update Product page
  const handleUpdate = (productId: number) => {
    router.push(`/InventoryManagement/UpdateProduct/${productId}`);
  };
  //remove page
  const handleRemove = (productId: number) => {
    router.push(`/InventoryManagement/RemoveProduct/${productId}`);


  };

  return (
    <>
      <div className="flex justify-center mt-8">
        <div className="w-100%">
          <h1 className="text-2xl text-left mb-2"> All Products:</h1>
          <table className="min-w-full bg-white rounded-lg overflow-hidden text-sm">
            <thead className="bg-gray-600 text-white">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Product Name</th>
                <th className="px-4 py-2">Details</th>
                <th className="px-4 py-2">Purchase Price</th>
                <th className="px-4 py-2">Sell Price</th>
                <th className="px-4 py-2">Brand</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {products.map((product) => (
                <tr key={product.productId}>
                  <td className="px-4 py-2">{product.productId}</td>
                  <td className="px-4 py-2">{product.productName}</td>
                  <td className="px-4 py-2">{product.productDetails}</td>
                  <td className="px-4 py-2">{product.productPurchasePrice}</td>
                  <td className="px-4 py-2">{product.productSellPrice}</td>
                  <td className="px-4 py-2">{product.porductBrand}</td>
                  <td className="px-4 py-2">{product.productQuantity}</td>
                  <td className="px-4 py-2">
                    <button
                      type="submit"
                      className="bg-customTeal hover:bg-customBlack2 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline mr-2 w-full sm:w-auto"
                      onClick={() => handleUpdate(product.productId)}
                    >
                      Update
                    </button>
                    <button
                      type="submit"
                      className="bg-red-600 hover:bg-red-500 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
                      onClick={() => handleRemove(product.productId)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
