
export default function CustomerListTable() {
    return (
      <>
        <div className="flex justify-center mt-8">
          <div className="w-100%">
            <h1 className="text-2xl text-center  mb-2"> Customer List</h1>
            <table className="min-w-full bg-white rounded-lg overflow-hidden text-sm">
              <thead className="bg-customBlack2 text-white">
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Contact</th>
                  <th className="px-4 py-2">E-mail</th>
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
  