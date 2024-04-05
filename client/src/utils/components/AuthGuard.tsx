import { useToast } from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../../services/localTokenService';
import apiClient from '../../services/api-client';
import { isAxiosError } from 'axios';

interface AuthGuardProps {
  children: JSX.Element;
}

export default function AuthGuard({ children }: AuthGuardProps): JSX.Element {
  const toast = useToast();

  if (!getToken()) {
    toast({
      title: 'Lütfen tekrar giriş yapın!',
      position: 'bottom',
      status: 'error',
      duration: 1500,
    });
    return <Navigate to={'/login'} />;
  }

  return children;
}
