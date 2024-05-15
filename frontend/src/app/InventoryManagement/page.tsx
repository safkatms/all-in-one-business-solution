"use client";
import React, { useEffect, useState } from "react";
import InventoryProductTable from "@/components/Inventorytable";
import InsideHeader from "@/components/insideheader";
import Sidebar from "@/components/sidebar";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
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

const InventoryDashboard: React.FC = () => {
  const [productName, setProductName] = useState("");
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = Cookies.get("jwtToken");
        const response = await axios.get<Product>(
          `http://localhost:3000/inventory-management/by-name/${productName}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProduct(response.data);
      } catch (error) {
        setError("Data Not Found !");
      } finally {
        setLoading(false);
      }
    };

    if (productName !== "") {
      fetchOrderDetails();
    } else {
      setProduct(null);
    }
  }, [productName]);

  const router = useRouter();
  //navigate update Product page
  const handleUpdate = (productId: number) => {
    router.push(`/InventoryManagement/UpdateProduct/${productId}`);
  };
  //remove product page
  const handleRemove = (productId: number) => {
    router.push(`/InventoryManagement/RemoveProduct/${productId}`);
  };

  return (
    <div>
      <InsideHeader />
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <div className="flex justify-end mt-3">
            <div className="flex items-center w-3/10">
              <input
                type="text"
                placeholder="Search..."
                className="appearance-none border rounded-xl w-full py-2 px-3 mr-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
          </div>

          <h1 className="text-2xl text-center mt-8 mb-3">
            Inventory Dashboard
          </h1>
          <Link href="InventoryManagement/AddProduct">
            <h3 className="block text-center bg-customTeal hover:bg-buttonHover text-white mb-3 py-2 px-4 border rounded-md transition duration-300 ease-in-out">
              Add Product
            </h3>
          </Link>
          <div className="flex justify-center mt-8">
            <div className="w-100%">
              {loading && <p>Loading...</p>}
              {error && <p className="text-red-600">{error}</p>}
              {product && (
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
                    <tr key={product.productId}>
                    <td className="px-4 py-2">{product.productId}</td>
                      <td className="px-4 py-2">{product.productName}</td>
                      <td className="px-4 py-2">{product.productDetails}</td>
                      <td className="px-4 py-2">
                        {product.productPurchasePrice}
                      </td>
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
                  </tbody>
                </table>
              )}
            </div>
          </div>
          <InventoryProductTable />
        </div>
      </div>
    </div>
  );
};

export default InventoryDashboard;
