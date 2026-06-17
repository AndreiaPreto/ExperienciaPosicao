import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Loading } from './components/Loading';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AccessProvider, useAccess } from './context/AccessContext';

// Lazy load pages for better performance
const Diagnostico = lazy(() => import('./pages/Diagnostico'));
const Obrigado = lazy(() => import('./pages/Obrigado'));
const Clube = lazy(() => import('./pages/Clube'));
const Membros = lazy(() => import('./pages/Membros'));
const Login = lazy(() => import('./pages/Login'));
const DashboardPosicao = lazy(() => import('./pages/Dashboard'));
const CompraDiagnostico = lazy(() => import('./pages/CompraDiagnostico'));
const AssinaturaClube = lazy(() => import('./pages/AssinaturaClube'));
const Biblioteca = lazy(() => import('./pages/Biblioteca'));

const ProtectedRoute = ({ children, type }: { children: React.ReactNode, type: 'diagnostico' | 'clube' }) => {
  const { access, loading } = useAccess();

  if (loading) return <Loading />;

  if (type === 'diagnostico' && !access?.diagnostico_comprado) {
    return <Navigate to="/compra-diagnostico" replace />;
  }

  if (type === 'clube' && !access?.clube_ativo) {
    return <Navigate to="/assinatura-clube" replace />;
  }

  return <>{children}</>;
};

export default function App() {
  return (
    <ErrorBoundary>
      <AccessProvider>
        <Router>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Diagnostico />} />
              <Route path="/diagnostico" element={<Diagnostico />} />
              <Route path="/mapafloral" element={<Diagnostico />} />
              <Route path="/mapa-floral" element={<Diagnostico />} />
              <Route path="/lealdades" element={<Diagnostico />} />
              <Route path="/lealdades-ocultas" element={<Diagnostico />} />
              <Route path="/numerologia" element={<Diagnostico />} />
              <Route path="/reset" element={<Diagnostico />} />
              <Route path="/reset-posicao" element={<Diagnostico />} />
              <Route path="/clube-posicao" element={<Diagnostico />} />
              <Route path="/ciclos" element={<Diagnostico />} />
              <Route path="/rituais" element={<Diagnostico />} />
              
              <Route path="/compra-diagnostico" element={<CompraDiagnostico />} />
              <Route path="/assinatura-clube" element={<AssinaturaClube />} />
              
              <Route path="/obrigado" element={<Obrigado />} />
              <Route path="/clube" element={<Clube />} />
              <Route path="/biblioteca" element={<Biblioteca />} />
              
              <Route 
                path="/membros" 
                element={
                  <ProtectedRoute type="clube">
                    <Membros />
                  </ProtectedRoute>
                } 
              />
              
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard-posicao" element={<DashboardPosicao />} />
              
              {/* Fallback to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </Router>
      </AccessProvider>
    </ErrorBoundary>
  );
}
