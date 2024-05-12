
export default function InventoryProductTable() {
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
              
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
