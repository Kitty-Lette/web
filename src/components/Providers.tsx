"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { createWagmiConfig } from '../config/wagmi';
import { suppressWalletExtensionErrors } from '../utils/suppressWalletErrors';
import '@rainbow-me/rainbowkit/styles.css';
import { useState, useEffect } from 'react';

type WagmiConfig = Awaited<ReturnType<typeof createWagmiConfig>>;

export function Providers({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<WagmiConfig | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: (failureCount, error) => {
          if (error && typeof error === 'object' && 'name' in error && error.name === 'TypeError') {
            return false;
          }
          return failureCount < 3;
        },
        retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      },
    },
  }));

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
    const cleanup = suppressWalletExtensionErrors();
    return cleanup;
  }, []);

  useEffect(() => {
    if (!isClient) return;

    let cancelled = false;

    createWagmiConfig()
      .then((resolvedConfig) => {
        if (!cancelled) {
          setConfig(resolvedConfig);
        }
      })
      .catch((error) => {
        console.error('Failed to bootstrap wallet connectors', error);
      });

    return () => {
      cancelled = true;
    };
  }, [isClient]);


  if (!isClient || !config) {
    return (
      <QueryClientProvider client={queryClient}>
        <div className="flex items-center justify-center min-h-screen">
          {/* <div>Loading wallet configuration...</div> */}
        </div>
      </QueryClientProvider>
    );
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
