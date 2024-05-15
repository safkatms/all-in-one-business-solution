"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { getToken } from "@/utils/auth";
import ConfirmationModal from "./ConfirmationModal";
import ProtectedRoute from "@/utils/protectedRoute";

interface User {
  userId: number;
  username: string;
  email: string;
  status: boolean; 
}

export default function OwnerListTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedAction, setSelectedAction] = useState<"ban" | "unban" | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = getToken();
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/ban-user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleActionClick = (userId: number, action: "ban" | "unban") => {
    setSelectedUserId(userId);
    setSelectedAction(action);
    setShowConfirmation(true);
  };

  const handleConfirmation = async () => {
    if (selectedUserId === null || selectedAction === null) return;

    try {
      const token = Cookies.get("jwtToken");
      const url =
        selectedAction === "ban"
          ? `${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/ban-user/${selectedUserId}/ban`
          : `${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/ban-user/${selectedUserId}/unban`;

      await axios.patch(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setShowConfirmation(false);
      setError(null);
      setSelectedUserId(null);
      setSelectedAction(null);

      
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.userId === selectedUserId ? { ...user, status: selectedAction === "ban" } : user
        )
      );

    } catch (error) {
      console.error(error);
      setError("Failed to update user status.");
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    setSelectedUserId(null);
    setSelectedAction(null);
  };

  return (
    <ProtectedRoute requiredRole={["admin"]}>
      <div className="flex justify-center p-4">
        <div className="w-full">
          <h1 className="text-2xl text-left mb-2">All Owners:</h1>
          <table className="min-w-full bg-white rounded-lg overflow-hidden text-sm">
            <thead className="bg-gray-600 text-white">
              <tr>
                <th className="px-4 py-2">User ID</th>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {users.map((user) => (
                <tr key={user.userId}>
                  <td className="px-4 py-2">{user.userId}</td>
                  <td className="px-4 py-2">{user.username}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.status ? "Banned" : "Active"}</td>
                  <td className="px-4 py-2">
                    {user.status ? (
                      <button
                        type="button"
                        className="bg-green-600 hover:bg-green-500 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
                        onClick={() => handleActionClick(user.userId, "unban")}
                      >
                        Unban
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="bg-red-600 hover:bg-red-500 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
                        onClick={() => handleActionClick(user.userId, "ban")}
                      >
                        Ban
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showConfirmation && (
        <ConfirmationModal
          message={`Are you sure you want to ${selectedAction} this user?`}
          onConfirm={handleConfirmation}
          onCancel={handleCancel}
        />
      )}
      {error && (
        <div className="text-red-500 text-center mt-4">
          <p>{error}</p>
        </div>
      )}
    </ProtectedRoute>
  );
}
