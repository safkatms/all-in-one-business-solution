"use client";
import InventoryProductTable from "@/components/Inventorytable";
import PurchaseDetailsTable from "@/components/Purchasetable";
import Header from "@/components/publicheader";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import axios from "axios";
import InsideHeader from "@/components/insideheader";
import ProtectedRoute from "@/utils/protectedRoute";
import Cookies from "js-cookie";
import Sidebar from "@/components/sidebar";
import SuccessMessage from "@/components/successMessage";

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
  const [successMessage, setSuccessMessage] = useState("");

  const [errors, setErrors] = useState({
    vendorName: "",
    vendorContact: "",
    vendorEmail: "",
    productName: "",
    productQuantity: "",
    productPurchasePrice: "",
    purchaseTotalPrice: "",
    purchaseDate: "",
  });

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
  const closeSuccessMessage = () => {
    setSuccessMessage("");
  };

  const handleChangePurchaseDate = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    setPurchaseDate(formattedDate);
  };

  const validateFields = () => {
    const errors = {
      vendorName: "",
      vendorContact: "",
      vendorEmail: "",
      productName: "",
      productQuantity: "",
      productPurchasePrice: "",
      purchaseTotalPrice: "",
      purchaseDate: "",
    };

    if (!vendorName) {
      errors.vendorName = "Vendor name is required";
    } else if (vendorName.length < 2 || vendorName.length > 50) {
      errors.vendorName = "Vendor name must be between 2 and 50 characters";
    } else if (!/^[A-Z][a-zA-Z0-9]*$/.test(vendorName)) {
      errors.vendorName =
        "Vendor name must start with a capital letter and contain only alphanumeric characters";
    }

    if (!vendorContact) {
      errors.vendorContact = "Vendor contact is required";
    } else if (!/^\d{11}$/.test(vendorContact)) {
      errors.vendorContact = "Vendor contact must be a valid 11-digit number";
    }

    if (!vendorEmail) {
      errors.vendorEmail = "Vendor email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(vendorEmail)) {
      errors.vendorEmail = "Vendor email must be a valid email address";
    }

    if (!productName) {
      errors.productName = "Product name is required";
    } else if (productName.length < 2 || productName.length > 50) {
      errors.productName = "Product name must be between 2 and 50 characters";
    }

    if (!productQuantity) {
      errors.productQuantity = "Product quantity is required";
    } else if (
      isNaN(Number(productQuantity)) ||
      Number(productQuantity) <= 0 ||
      !Number.isInteger(Number(productQuantity))
    ) {
      errors.productQuantity =
        "Product quantity must be a non-negative integer";
    }

    if (!productPurchasePrice) {
      errors.productPurchasePrice = "Product purchase price is required";
    } else if (
      isNaN(Number(productPurchasePrice)) ||
      Number(productPurchasePrice) <= 0
    ) {
      errors.productPurchasePrice =
        "Product purchase price must be a positive number";
    }

    if (!purchaseTotalPrice) {
      errors.purchaseTotalPrice = "Purchase total price is required";
    } else if (
      isNaN(Number(purchaseTotalPrice)) ||
      Number(purchaseTotalPrice) <= 0
    ) {
      errors.purchaseTotalPrice =
        "Purchase total price must be a positive number";
    }

    if (!purchaseDate) {
      errors.purchaseDate = "Purchase date is required";
    }

    return errors;
  };

  //handle on submit
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const validationErrors = validateFields();
    setErrors(validationErrors);

    const hasErrors = Object.values(validationErrors).some((error) => !!error);

    if (!hasErrors) {
      try {
        // Validation passed, submit data
        await postData();
        Cookies.set('successMessage', `Puchase information regarding ${productName} registered successfully !`);
        setSuccessMessage("Purchase registered successfully !");
        // Reset form state
        setVendorName("");
        setVendorContact("");
        setVendorEmail("");
        setProductName("");
        setProductQuantity("");
        setProductPurchasePrice("");
        setPurchaseTotalPrice("");
        setPurchaseDate("");
      } catch (e: any) {
        setErrors(e);
      }
    }
  };
  async function postData() {
    try {
      const token = Cookies.get("jwtToken");

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
                    className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.vendorName && "border-red-500"
                    }`}
                  />
                  {errors.vendorName && (
                    <p className="text-red-500 text-xs italic">
                      {errors.vendorName}
                    </p>
                  )}
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
                    className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.vendorContact && "border-red-500"
                    }`}
                  />
                  {errors.vendorContact && (
                    <p className="text-red-500 text-xs italic">
                      {errors.vendorContact}
                    </p>
                  )}
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
                    className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.vendorEmail && "border-red-500"
                    }`}
                  />
                  {errors.vendorEmail && (
                    <p className="text-red-500 text-xs italic">
                      {errors.vendorEmail}
                    </p>
                  )}
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
                    className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.productName && "border-red-500"
                    }`}
                  />
                  {errors.productName && (
                    <p className="text-red-500 text-xs italic">
                      {errors.productName}
                    </p>
                  )}
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
                    className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.productQuantity && "border-red-500"
                    }`}
                  />
                  {errors.productQuantity && (
                    <p className="text-red-500 text-xs italic">
                      {errors.productQuantity}
                    </p>
                  )}
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
                    className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.productPurchasePrice && "border-red-500"
                    }`}
                  />
                  {errors.productPurchasePrice && (
                    <p className="text-red-500 text-xs italic">
                      {errors.productPurchasePrice}
                    </p>
                  )}
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
                    className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.purchaseTotalPrice && "border-red-500"
                    }`}
                  />
                  {errors.purchaseTotalPrice && (
                    <p className="text-red-500 text-xs italic">
                      {errors.purchaseTotalPrice}
                    </p>
                  )}
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
                    className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.purchaseDate && "border-red-500"
                    }`}
                  />
                  {errors.purchaseDate && (
                    <p className="text-red-500 text-xs italic">
                      {errors.purchaseDate}
                    </p>
                  )}
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
        </div>
      </div>
      {successMessage && (
        <SuccessMessage
          message={successMessage}
          onClose={closeSuccessMessage}
        />
      )}
      {/* <PurchaseDetailsTable /> */}/
    </ProtectedRoute>
  );
}
