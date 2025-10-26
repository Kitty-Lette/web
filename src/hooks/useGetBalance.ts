"use client";

import { useReadContract, useAccount } from "wagmi";
import { CONTRACTS } from "../constants/contracts/constracts";
import { FROTH_ABI } from "../constants/abis/FrothABI";

export const useGetBalance = (customAddress?: `0x${string}`) => {
  const { address: connectedAddress } = useAccount();
  const targetAddress = customAddress || connectedAddress;

  const { 
    data: balance, 
    isLoading: loading, 
    error,
    refetch 
  } = useReadContract({
    address: CONTRACTS.FROTH,
    abi: FROTH_ABI,
    functionName: 'balanceOf',
    args: targetAddress ? [targetAddress] : undefined,
    query: {
      enabled: !!targetAddress,
    },
  });

  return { 
    balance: balance as bigint | undefined, 
    loading, 
    error: error?.message || null, 
    refetch 
  };
};