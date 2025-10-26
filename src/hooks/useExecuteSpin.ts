"use client";

import { useState } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { CONTRACTS } from "../constants/contracts/constracts";
import { FROTH_ABI } from "../constants/abis/FrothABI";
import { KITTY_LETTE_ABI } from "../constants/abis/KittyLetteABI";

export enum SpinStatus {
  IDLE = "idle",
  APPROVING = "approving",
  APPROVED = "approved", 
  SPINNING = "spinning",
  SUCCESS = "success",
  ERROR = "error"
}

export const useExecuteSpin = () => {
  const [status, setStatus] = useState<SpinStatus>(SpinStatus.IDLE);
  const [error, setError] = useState<string | null>(null);
  
  const { writeContract: approve, data: approveHash } = useWriteContract();
  const { writeContract: spinWheel, data: spinHash } = useWriteContract();
  
  const { isLoading: isApproveLoading } = useWaitForTransactionReceipt({
    hash: approveHash,
  });
  
  const { isLoading: isSpinLoading } = useWaitForTransactionReceipt({
    hash: spinHash,
  });

  const executeApprove = async (amount: bigint) => {
    try {
      setStatus(SpinStatus.APPROVING);
      setError(null);
      
      approve({
        address: CONTRACTS.FROTH,
        abi: FROTH_ABI,
        functionName: "approve",
        args: [CONTRACTS.KittyLette, amount],
      });
    } catch (err) {
      setStatus(SpinStatus.ERROR);
      setError(err instanceof Error ? err.message : "Approve failed");
    }
  };

  const executeSpinWheel = async () => {
    try {
      setStatus(SpinStatus.SPINNING);
      setError(null);
      
      spinWheel({
        address: CONTRACTS.KittyLette,
        abi: KITTY_LETTE_ABI,
        functionName: "spinWheel",
      });
    } catch (err) {
      setStatus(SpinStatus.ERROR);
      setError(err instanceof Error ? err.message : "Spin failed");
    }
  };

  const executeSpin = async (amount: bigint) => {
    await executeApprove(amount);
  };

  const reset = () => {
    setStatus(SpinStatus.IDLE);
    setError(null);
  };

  return {
    status,
    error,
    isApproveLoading,
    isSpinLoading,
    executeApprove,
    executeSpinWheel,
    executeSpin,
    approveHash,
    spinHash,
    reset,
  };
};