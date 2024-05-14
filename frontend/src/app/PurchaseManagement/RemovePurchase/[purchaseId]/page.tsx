"use client";
import ConfirmationModal from "@/components/ConfirmationModal";
import PurchaseDetailsTable from "@/components/Purchasetable";
import InsideHeader from "@/components/insideheader";
import ProtectedRoute from "@/utils/protectedRoute";
import axios from "axios";
import { useState, useEffect, SyntheticEvent } from "react";
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
export default function RemovePurchase({
  params,
}: {
  params: { purchaseId: string };
}) {
  const { purchaseId } = params;
  const [purchase, setProduct] = useState<Purchase>({
    purchaseId: 0,
    vendorName: "",
    vendorContact: "",
    vendorEmail: "",
    productName: "",
    productQuantity: 0,
    productPurchasePrice: 0,
    purchaseTotalPrice: 0,
    purchaseDate: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPurchaseDetails = async () => {
      try {
        const token = Cookies.get("jwtToken");
        const response = await axios.get<Purchase>(
          `http://localhost:3000/purchase-management/${purchaseId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching purchase details:", error);
      }
    };

    fetchPurchaseDetails();
  }, [purchaseId]);

  //handle on submit
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleConfirmation = async () => {
    try {
      await removeData();
      setShowConfirmation(false);
      alert("Purchase removed successfully");
    } catch (e: any) {
      setError(e);
    }
  };
  //handle popup cancel
  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  //post data in db
  async function removeData() {
    try {
      const token = Cookies.get("jwtToken");
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/purchase-management/remove-purchase/${purchaseId}`,
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
          className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6 "
        >
          <h1 className="text-2xl text-center mb-6">Remove Purchase</h1>
          <div className="mb-3 flex justify-between">
            <div className="w-1/2 pr-2">
              <label
                htmlFor="vendorName"
                className="block text-gray-700 font-bold mb-1 text-sm"
              >
                Vendor Name
              </label>
              <input
                type="text"
                name="vendorName"
                id="vendorName"
                value={purchase.vendorName}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="w-1/2 pl-2">
              <label
                htmlFor="vendorContact"
                className="block text-gray-700 font-bold mb-1 text-sm"
              >
                Vendor Contact
              </label>
              <input
                type="text"
                name="vendorContact"
                id="vendorContact"
                value={purchase.vendorContact}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <div className="mb-3 flex justify-between">
            <div className="w-1/2 pr-2">
              <label
                htmlFor="vendorEmail"
                className="block text-gray-700 font-bold mb-1 text-sm"
              >
                Vendor Email
              </label>
              <input
                type="email"
                name="vendorEmail"
                id="vendorEmail"
                value={purchase.vendorEmail}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="w-1/2 pl-2">
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
                value={purchase.productName}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <div className="mb-3 flex justify-between">
            <div className="w-1/2 pr-2">
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
                value={purchase.productQuantity}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="w-1/2 pl-2">
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
                value={purchase.productPurchasePrice}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <div className="mb-3 flex justify-between">
            <div className="w-1/2 pr-2">
              <label
                htmlFor="purchaseTotalPrice"
                className="block text-gray-700 font-bold mb-1 text-sm"
              >
                Purchase Total Price
              </label>
              <input
                type="number"
                name="purchaseTotalPrice"
                id="purchaseTotalPrice"
                value={purchase.purchaseTotalPrice}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="w-1/2 pl-2">
              <label
                htmlFor="purchaseDate"
                className="block text-gray-700 font-bold mb-1 text-sm"
              >
                Purchase Date
              </label>
              <input
                type="date"
                name="purchaseDate"
                id="purchaseDate"
                value={purchase.purchaseDate}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline mr-2 w-full sm:w-auto"
            >
              Remove Purchase
            </button>
          </div>
        </form>
      </div>
      {/* popup */}
      {showConfirmation && (
        <ConfirmationModal
          message="Are you sure you want to remove this Purchase?"
          onConfirm={handleConfirmation}
          onCancel={handleCancel}
        />
      )}
      <PurchaseDetailsTable />
    </ProtectedRoute>
  );
}
