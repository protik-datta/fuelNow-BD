import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

import Loader from './utils/Loader';

const AdminLayout = lazy(() => import('./components/layout/AdminLayout'));
const ProtectedRoute = lazy(() => import('./components/layout/ProtectedRoute'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Orders = lazy(() => import('./pages/Orders'));
const Emergencies = lazy(() => import('./pages/Emergencies'));
const Login = lazy(() => import('./pages/Login'));

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Suspense fallback={<Loader fullScreen={true} />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="orders" element={<Orders />} />
                <Route path="emergencies" element={<Emergencies />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </Router>
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
};

export default App;
