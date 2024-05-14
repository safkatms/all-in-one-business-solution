import PurchaseDetailsTable from "@/components/Purchasetable";
import InsideHeader from "@/components/insideheader";

export default function UpdatePurchase() {
  return (
    <>
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
        <form className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6 ">
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
    </>
  );
}
