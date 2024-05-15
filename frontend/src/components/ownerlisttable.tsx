"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  userId: number;
  username: string;
  email: string;
  status: boolean;
}

function OwnerListTable() {
  const [User, setUser] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/ban-user");
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <div className="flex justify-center mt-8">
        <div className="w-full">
          <h1 className="text-2xl text-center mb-2">Owner List</h1>
          <table className="min-w-full bg-white rounded-lg overflow-hidden text-sm">
            <thead className="bg-customBlack2 text-white">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">E-mail</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {User.map((User) => (
                <tr key={user.userId}>
                  <td className="px-4 py-2">{user.userId}</td>
                  <td className="px-4 py-2">{user.username}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default OwnerListTable;
