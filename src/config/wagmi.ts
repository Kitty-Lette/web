import { defineChain } from 'viem';

export const flowTestnet = defineChain({
  id: 545,
  name: 'Flow EVM Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Flow',
    symbol: 'FLOW',
  },
  rpcUrls: {
    default: {
      http: ['https://testnet.evm.nodes.onflow.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Flow EVM Explorer',
      url: 'https://testnet.flowdiver.io',
    },
  },
  testnet: true,
});

export const createWagmiConfig = async () => {
  const { createConfig, http } = await import('wagmi');
  const { connectorsForWallets } = await import('@rainbow-me/rainbowkit');
  const { metaMaskWallet, walletConnectWallet, injectedWallet } = await import('@rainbow-me/rainbowkit/wallets');
  
  const connectors = connectorsForWallets(
    [
      {
        groupName: 'Recommended',
        wallets: [
          metaMaskWallet,
          walletConnectWallet,
          injectedWallet,
        ],
      },
    ],
    {
      appName: 'Kitty Lette',
      projectId: '6721e82ac454e916acc25c075f9263b4',
    }
  );

  return createConfig({
    connectors,
    chains: [flowTestnet],
    transports: {
      [flowTestnet.id]: http(),
    },
    ssr: true,
  });
};