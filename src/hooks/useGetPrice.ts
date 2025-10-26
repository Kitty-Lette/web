"use client";

import { useReadContract } from "wagmi";
import { CONTRACTS } from "../constants/contracts/constracts";
import { KITTY_LETTE_ABI } from "../constants/abis/KittyLetteABI";

export const useGetPrice = () => {
  const { 
    data: price, 
    isLoading: loading, 
    error,
    refetch 
  } = useReadContract({
    address: CONTRACTS.KittyLette,
    abi: KITTY_LETTE_ABI,
    functionName: 'spinCost',
  });

  return { 
    price: price as bigint | undefined, 
    loading, 
    error: error?.message || null, 
    refetch 
  };
};