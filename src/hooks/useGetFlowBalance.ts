"use client";

import { useBalance, useAccount } from "wagmi";

export const useGetFlowBalance = () => {
  const { address } = useAccount();
  
  const { 
    data: balance, 
    isLoading: loading, 
    error,
    refetch 
  } = useBalance({
    address,
    query: {
      enabled: !!address,
    },
  });

  return { 
    balance: balance?.value, 
    loading, 
    error: error?.message || null, 
    refetch 
  };
};