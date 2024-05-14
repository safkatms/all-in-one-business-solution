"use client";
import PurchaseDetailsTable from "@/components/Purchasetable";
import InsideHeader from "@/components/insideheader";
import ProtectedRoute from "@/utils/protectedRoute";
import axios from "axios";
import { useState, ChangeEvent, useEffect, SyntheticEvent } from "react";
import Cookies from "js-cookie";
import Sidebar from "@/components/sidebar";

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
export default function UpdatePurchase({
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

  const [vendorName, setVendorName] = useState("");
  const [vendorContact, setVendorContact] = useState("");
  const [vendorEmail, setVendorEmail] = useState("");
  const [productName, setProductName] = useState("");
  const [productQuantity, setProductQuantity] = useState(0);
  const [productPurchasePrice, setProductPurchasePrice] = useState(0);
  const [purchaseTotalPrice, setPurchaseTotalPrice] = useState(0);
  const [purchaseDate, setPurchaseDate] = useState("");
  const [error, setError] = useState("");

  const handleChangeVendorName = (e: ChangeEvent<HTMLInputElement>) => {
    setVendorName(e.target.value);
  };

  const handleChangeVendorContact = (e: ChangeEvent<HTMLInputElement>) => {
    setVendorContact(e.target.value);
  };

  const handleChangeVendorEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setVendorEmail(e.target.value);
  };

  const handleChangeProductName = (e: ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
  };

  const handleChangeProductQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    setProductQuantity(parseInt(e.target.value));
  };

  const handleChangeProductPurchasePrice = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setProductPurchasePrice(parseInt(e.target.value));
  };

  const handleChangePurchaseTotalPrice = (e: ChangeEvent<HTMLInputElement>) => {
    setPurchaseTotalPrice(parseInt(e.target.value));
  };

  const handleChangePurchaseDate = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    setPurchaseDate(formattedDate);
  };

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

        setVendorName(response.data.vendorName);
        setVendorContact(response.data.vendorContact);
        setVendorEmail(response.data.vendorEmail);
        setProductName(response.data.productName);
        setProductQuantity(response.data.productQuantity);
        setProductPurchasePrice(response.data.productPurchasePrice);
        setPurchaseTotalPrice(response.data.purchaseTotalPrice);
        setPurchaseDate(response.data.purchaseDate);
      } catch (error) {
        console.error("Error fetching purchase details:", error);
      }
    };

    fetchPurchaseDetails();
  }, [purchaseId]);

  //handle on submit
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (
      !vendorName ||
      !vendorContact ||
      !vendorEmail ||
      !productName ||
      !productQuantity ||
      !productPurchasePrice ||
      !purchaseTotalPrice ||
      !purchaseDate
    ) {
      setError("All fields are required");
    } else {
      try {
        await postData();
        alert("product Update successfully");
      } catch (e: any) {
        setError(e);
      }
      setVendorName("");
      setVendorContact("");
      setVendorEmail("");
      setProductName("");
      setProductQuantity(parseInt(""));
      setProductPurchasePrice(parseInt(""));
      setPurchaseTotalPrice(parseInt(""));
      setPurchaseDate("");
      setError("");
    }
  };

  //post data in db
  async function postData() {
    try {
      const token = Cookies.get("jwtToken");

      const data1 = {
        vendorName: vendorName,
        vendorContact: vendorContact,
        vendorEmail: vendorEmail,
        productName: productName,
        productQuantity: productQuantity,
        productPurchasePrice: productPurchasePrice,
        purchaseTotalPrice: purchaseTotalPrice,
        purchaseDate: purchaseDate,
      };
      console.log(data1);
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/purchase-management/modify-purchase/${purchaseId}`,
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
              className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6 "
            >
              <h1 className="text-2xl text-center mb-6">Update Purchase</h1>
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
                    value={vendorName}
                    onChange={handleChangeVendorName}
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
                    value={vendorContact}
                    onChange={handleChangeVendorContact}
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
                    value={vendorEmail}
                    onChange={handleChangeVendorEmail}
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
                    value={productName}
                    onChange={handleChangeProductName}
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
                    value={productQuantity}
                    onChange={handleChangeProductQuantity}
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
                    value={productPurchasePrice}
                    onChange={handleChangeProductPurchasePrice}
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
                    value={purchaseTotalPrice}
                    onChange={handleChangePurchaseTotalPrice}
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
                    value={purchaseDate}
                    onChange={handleChangePurchaseDate}
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-customTeal hover:bg-buttonHover text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline mr-2 w-full sm:w-auto"
                >
                  Update Purchase
                </button>
                <button
                  type="reset"
                  className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
                >
                  Reset Purchase
                </button>
              </div>
            </form>
          </div>
          <PurchaseDetailsTable />
        </div>
      </div>

      {/* <PurchaseDetailsTable /> */}
    </ProtectedRoute>
  );
}
