export default function PurchaseDetailsTable() {
  return (
    <>
      <div className="flex justify-center mt-8">
        <div className="w-100%">
          <h1 className="text-2xl text-left mb-2"> All Purchases:</h1>
          <table className="min-w-full bg-white rounded-lg overflow-hidden text-sm">
            <thead className="bg-gray-600 text-white">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Vendor Name</th>
                <th className="px-4 py-2">Vendor Contact</th>
                <th className="px-4 py-2">Vendor Email</th>
                <th className="px-4 py-2">Product Name</th>
                <th className="px-4 py-2">Product Quantity</th>
                <th className="px-4 py-2">Product Purchase Price</th>
                <th className="px-4 py-2">Purchase Total Price</th>
                <th className="px-4 py-2">Purchase Date</th>
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
