"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface Purchase {
  purchaseId: number;
  vendorName: string;
  vendorContact: string;
  vendorEmail: string;
  productName: string;
  productQuantity: number;
  productPurchasePrice: number;
  purchaseTotalPrice: number;
  purchaseDate: string;
}

export default function PurchaseDetailsTable() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  useEffect(() => {
    const token = Cookies.get("jwtToken");
    const fetchPurchases = async () => {
      try {
        const response = await axios.get<Purchase[]>(
          "http://localhost:3000/purchase-management/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPurchases(response.data);
      } catch (error) {
        console.error("Error fetching purchases:", error);
      }
    };

    fetchPurchases();
  }, []);

  const router = useRouter();
  //navigate Update Product page
  const handleUpdate = (purchaseId: number) => {
    router.push(`/PurchaseManagement/UpdatePurchase/${purchaseId}`);
  };
  //remove page
  const handleRemove = (purchaseId: number) => {
    router.push(`/PurchaseManagement/RemovePurchase/${purchaseId}`);
  };

  return (
    
      <div className="flex justify-center p-4">
        <div className="w-100%">
          <h1 className="text-2xl text-left mb-2"> All Purchases:</h1>
          <table className="min-w-full bg-white rounded-lg overflow-hidden text-xs">
            <thead className="bg-gray-600 text-white">
              <tr>
                <th className="px-3 py-2">ID</th>
                <th className="px-3 py-2">Vendor Name</th>
                <th className="px-3 py-2">Vendor Contact</th>
                <th className="px-3 py-2">Vendor Email</th>
                <th className="px-3 py-2">Product Name</th>
                <th className="px-3 py-2">Product Quantity</th>
                <th className="px-3 py-2">Product Purchase Price</th>
                <th className="px-3 py-2">Purchase Total Price</th>
                <th className="px-3 py-2">Purchase Date</th>
                <th className="px-3 py-2">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {purchases.map((purchase) => (
                <tr key={purchase.purchaseId}>
                  <td className="px-2 py-2">{purchase.purchaseId}</td>
                  <td className="px-2 py-2">{purchase.vendorName}</td>
                  <td className="px-2 py-2">{purchase.vendorContact}</td>
                  <td className="px-2 py-2">{purchase.vendorEmail}</td>
                  <td className="px-2 py-2">{purchase.productName}</td>
                  <td className="px-2 py-2">{purchase.productQuantity}</td>
                  <td className="px-2 py-2">{purchase.productPurchasePrice}</td>
                  <td className="px-2 py-2">{purchase.purchaseTotalPrice}</td>
                  <td className="px-2 py-2">{purchase.purchaseDate}</td>
                  <td className="px-2 py-2">
                    <button
                      type="submit"
                      className="bg-customTeal hover:bg-customBlack2 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2 w-full sm:w-auto"
                      onClick={() => handleUpdate(purchase.purchaseId)}
                    >
                      Update
                    </button>
                    <button
                      type="submit"
                      className="bg-red-600 hover:bg-red-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
                      onClick={() => handleRemove(purchase.purchaseId)}
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
  );
}
