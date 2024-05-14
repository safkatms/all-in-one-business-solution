"use client";
import React from 'react';
import Header from "@/components/publicheader";
import OwnerListTable from '@/components/ownerlisttable';


const AdminPage = () => {
  return (
    <>
    <Header />
    <h1 className="text-3xl text-center mt-8">ADMIN PANEL</h1>
    <div className="flex justify-center mt-3">



    </div>
    <>
    
    </>
    <div className="fixed flex justify-end  right-5 ">
          {/*<CustomerSearch /> */}  
      </div>
      <OwnerListTable/>
  </>
  
  );
};

export default AdminPage;