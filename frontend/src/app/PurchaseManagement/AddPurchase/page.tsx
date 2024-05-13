"use client";
import InventoryProductTable from "@/components/Inventorytable";
import PurchaseDetailsTable from "@/components/Purchasetable";
import Header from "@/components/publicheader";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import axios from "axios";

export default function AddPurchase() {
  //
  const [vendorName, setVendorName] = useState("");
  const [vendorContact, setVendorContact] = useState("");
  const [vendorEmail, setVendorEmail] = useState("");
  const [productName, setProductName] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productPurchasePrice, setProductPurchasePrice] = useState("");
  const [purchaseTotalPrice, setPurchaseTotalPrice] = useState("");
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
    setProductQuantity(e.target.value);
  };

  const handleChangeProductPurchasePrice = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setProductPurchasePrice(e.target.value);
  };

  const handleChangePurchaseTotalPrice = (e: ChangeEvent<HTMLInputElement>) => {
    setPurchaseTotalPrice(e.target.value);
  };

  const handleChangePurchaseDate = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    setPurchaseDate(formattedDate);
  };

  //handle on submit
  const handleSubmit = (e: SyntheticEvent) => {
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
        postData();
        alert("product register successfully");
      } catch (e: any) {
        setError(e);
      }
      setVendorName("");
      setVendorContact("");
      setVendorEmail("");
      setProductName("");
      setProductQuantity("");
      setProductPurchasePrice("");
      setPurchaseTotalPrice("");
      setPurchaseDate("");
      setError("");
    }
  };

  async function postData() {
    try {
      //   const formData = new FormData();
      //   formData.append("vendorName", vendorName);
      //   formData.append("vendorContact", vendorContact);
      //   formData.append("vendorEmail", vendorEmail);
      //   formData.append("productName", productName);
      //   formData.append("productQuantity", productQuantity);
      //   formData.append("productPurchasePrice", productPurchasePrice);
      //   formData.append("purchaseTotalPrice", purchaseTotalPrice);
      //   formData.append("purchaseDate", purchaseDate);

      const data1 = {
        vendorName: vendorName,
        vendorContact: vendorContact,
        vendorEmail: vendorEmail,
        productName: productName,
        productQuantity: parseInt(productQuantity),
        productPurchasePrice: parseInt(productPurchasePrice),
        purchaseTotalPrice: parseInt(purchaseTotalPrice),
        purchaseDate: purchaseDate,
      };
      console.log(data1);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/purchase-management/add-purchase`,
        data1,
        {
          headers: {
            "Content-Type": "application/json",
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

      {/* <h1 className="text-3xl text-center mt-8">Add Purchase</h1> */}
      <div className="flex justify-center mt-3">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6 "
        >
          <h1 className="text-2xl text-center mb-6">Add Purchase</h1>
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
              Register Purchase
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
    </>
  );
}
