
import React from 'react';
import { Wallet } from 'lucide-react';

interface WalletHeaderProps {
  isConnected: boolean;
  address?: string;
}

const WalletHeader = ({ isConnected, address }: WalletHeaderProps) => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg kadena-gradient">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Kadena Wallet Demo</h1>
              <p className="text-sm text-muted-foreground">Simple wallet integration example</p>
            </div>
          </div>
          
          {isConnected && address && (
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-mono bg-secondary px-3 py-1 rounded-full">
                {address.slice(0, 6)}...{address.slice(-4)}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default WalletHeader;
