import InventoryProductTable from "@/components/Inventorytable";
import Header from "@/components/publicheader";

export default function AddProduct() {
  return (
    <>
      <Header />
      <h1 className="text-3xl text-center mt-8">Add Product</h1>
      <div className="flex justify-center mt-3">
        <form className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
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
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-buttonColor hover:bg-buttonHover text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline mr-2 w-full sm:w-auto"
            >
              Register Product
            </button>
            <button
              type="reset"
              className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
            >
              Reset Product
            </button>
          </div>
        </form>
      </div>

      { <InventoryProductTable/> }
    </>
  );
}
