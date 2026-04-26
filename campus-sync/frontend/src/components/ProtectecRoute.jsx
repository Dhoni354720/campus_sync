import React from 'react';
import { Navigate, BrowserRouter, useInRouterContext } from 'react-router-dom';

function ProtectedRouteContent({ children }) {
  // Fallback for isolated preview environments where no children are passed
  if (!children) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="p-8 text-center text-slate-500 font-medium bg-white rounded-xl border border-slate-200 shadow-sm">
          <span className="text-2xl mb-2 block">🔒</span>
          Protected Route Component<br/>
          <span className="text-sm font-normal text-slate-400 mt-2 block">
            This wrapper secures other pages. It is currently being viewed in isolation.
          </span>
        </div>
      </div>
    );
  }

  // Check if the user has a token in their browser's local storage
  const token = localStorage.getItem('token');
  
  // If there is no token, redirect them to the auth page
  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  // If they have a token, allow them to see the protected page (like the Dashboard)
  return children;
}

export default function ProtectedRoute({ children }) {
  // Check if this component is already rendered inside a <Router>
  // This prevents errors in the isolated preview environment while keeping it working perfectly in your local App.jsx
  const hasRouter = useInRouterContext();

  if (!hasRouter) {
    return (
      <BrowserRouter>
        <ProtectedRouteContent>{children}</ProtectedRouteContent>
      </BrowserRouter>
    );
  }

  return <ProtectedRouteContent>{children}</ProtectedRouteContent>;
}