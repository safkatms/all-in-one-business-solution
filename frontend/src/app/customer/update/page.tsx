import React from 'react';
import CustomerListTable from '@/components/customerlisttable';
import CustomerSearch from '@/components/customersearch';
import InsideHeader from '@/components/insideheader';

const CUpdate = () => {
  return (
    <>
    <InsideHeader />
    
    <h1 className="text-3xl text-center mt-8">Update Customer Info</h1>
     <div className="relative flex justify-center">
        <CustomerSearch />
      </div>
    
    <div className="flex justify-center mt-3">
   
      <form className="w-full max-w-md bg-white rounded-lg shadow-md p-10">
        <div className="mb-3">
          <label
            htmlFor="name"
            className="block text-gray-700 font-bold mb-1 text-sm"
          >
             Name
          </label>
          <input
            type="name"
            name="name"
            id="name"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="contact"
            className="block text-gray-700 font-bold mb-1 text-sm"
          >
            Contact
          </label>
          <input
            type="text"
            name="contact"
            id="contact"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="email"
            className="block text-gray-700 font-bold mb-1 text-sm"
          >
            E-mail
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        
       
       
        <div className="text-center">
          <button
            type="submit"
            className="bg-customTeal hover:bg-customBlack2 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline mr-2 w-full sm:w-auto"
          >
            Update
          </button>
          
        </div>
      </form>
    </div>
    <>
    
    </>
    
     
  </>
  
  );
};

export default CUpdate;