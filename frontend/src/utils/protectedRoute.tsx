'use client'
import { useRouter } from "next/navigation";
import { useEffect } from 'react';
import { hasRole, isAuthenticated } from './auth'; // Function to check if user is authenticated

const ProtectedRoute = ({ children, requiredRole }: { children: React.ReactNode, requiredRole: string | string[] }) => {
    const router = useRouter();
  
    useEffect(() => {
      const checkAuthentication = async () => {
        if (!isAuthenticated()) {
          router.push('/login'); // Redirect to login page if not authenticated
        } else {
          // Check if the user has the required role
          const hasRequiredRole = await hasRole(requiredRole);
          if (!hasRequiredRole) {
            router.push('/login'); // Redirect to dashboard if user doesn't have the required role
          }
        }
      };
      checkAuthentication();
    }, [router, requiredRole]);
  
    return <>{children}</>;
  };

export default ProtectedRoute;