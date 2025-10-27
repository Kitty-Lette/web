"use client";

import { useState, useEffect } from "react";
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from "wagmi";
import { CONTRACTS } from "../constants/contracts/constracts";
import { FROTH_ABI } from "../constants/abis/FrothABI";
import { parseEther } from "viem";

interface UseMintFrothProps {
  onSuccess?: () => void;
}

export const useMintFroth = ({ onSuccess }: UseMintFrothProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { address } = useAccount();
  
  const { writeContract, data: hash, isPending } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  // Call onSuccess when transaction is confirmed
  useEffect(() => {
    if (isSuccess && onSuccess) {
      onSuccess();
    }
  }, [isSuccess, onSuccess]);

  const mintFroth = async (amount: string = "1000") => {
    if (!address) {
      setError("Wallet not connected");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      await writeContract({
        address: CONTRACTS.FROTH,
        abi: FROTH_ABI,
        functionName: 'mint',
        args: [address, parseEther(amount)],
      });
    } catch (err: any) {
      console.error("Mint error:", err);
      setError(err?.message || "Failed to mint FROTH tokens");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    mintFroth,
    isLoading: isLoading || isPending || isConfirming,
    isSuccess,
    error,
    hash,
  };
};