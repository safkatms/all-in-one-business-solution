import InventoryProductTable from "@/components/Inventorytable";
import DeliveryManagementTable from "@/components/deliveryManTable";
import Header from "@/components/publicheader";

export default function MakeDelivery() {
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

      <h1 className="text-3xl text-center mt-8">Make Delivery</h1>
      <div className="flex justify-center mt-3">
        <form className="w-full max-w-md bg-white rounded-lg shadow-md p-6 ">
          <div className="mb-3">
            <label
              htmlFor="status"
              className="block text-gray-700 font-bold mb-1 text-sm"
            >
              Status
            </label>
            <select
              name="status"
              id="status"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="completed">Completed</option>
              <option value="returned">Returned</option>
            </select>
          </div>
          
          <div className="text-center">
            <button
              type="submit"
              className="bg-customTeal hover:bg-buttonHover text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline mr-2 w-full sm:w-auto"
            >
              Proceed
            </button>
          </div>
        </form>
      </div>

      <DeliveryManagementTable/>
    </>
  );
}
