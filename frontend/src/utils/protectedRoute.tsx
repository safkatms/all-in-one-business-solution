'use client'
import { useRouter } from "next/navigation";
import { useEffect } from 'react';
import { hasRole, isAuthenticated } from './auth'; // Function to check if user is authenticated

const ProtectedRoute = ({ children, requiredRole }: { children: React.ReactNode, requiredRole: string | string[] }) => {
    const router = useRouter();
  
    useEffect(() => {
      const checkAuthentication = async () => {
        if (!isAuthenticated()) {
          router.push('/login'); 
        } else {
          const hasRequiredRole = await hasRole(requiredRole);
          if (!hasRequiredRole) {
            router.push('/login');
          }
        }
      };
      checkAuthentication();
    }, [router, requiredRole]);
  
    return <>{children}</>;
  };

export default ProtectedRoute;