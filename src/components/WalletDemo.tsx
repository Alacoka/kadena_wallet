
import React, { useState } from 'react';
import WalletHeader from './WalletHeader';
import WalletConnection from './WalletConnection';
import WalletDashboard from './WalletDashboard';
import { useToast } from '@/hooks/use-toast';

interface WalletState {
  isConnected: boolean;
  address: string;
  balance: string;
  walletType: string;
}

const WalletDemo = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: '',
    balance: '0.00',
    walletType: ''
  });
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const handleConnect = async (walletType: string) => {
    setIsConnecting(true);

    // Simulate connection process
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock wallet connection
      const mockAddress = 'k:5a2afbc4564b76b2c27ce5a644cab643c43663835ea0be22433b209d3351f937';
      const mockBalance = '142.56';

      setWalletState({
        isConnected: true,
        address: mockAddress,
        balance: mockBalance,
        walletType
      });

      toast({
        title: "Wallet Connected!",
        description: `Successfully connected to ${walletType}`,
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setWalletState({
      isConnected: false,
      address: '',
      balance: '0.00',
      walletType: ''
    });

    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been safely disconnected",
    });
  };

  const handleSendTransaction = async (to: string, amount: string, memo: string) => {
    try {
      console.log('Sending transaction:', { to, amount, memo });

      // Simulate transaction
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Update balance (mock)
      const currentBalance = parseFloat(walletState.balance);
      const sendAmount = parseFloat(amount);
      const newBalance = (currentBalance - sendAmount).toFixed(2);

      setWalletState(prev => ({
        ...prev,
        balance: newBalance
      }));

      toast({
        title: "Transaction Sent!",
        description: `Successfully sent ${amount} KDA`,
      });
    } catch (error) {
      toast({
        title: "Transaction Failed",
        description: "Failed to send transaction. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSignMessage = async (message: string) => {
    try {
      console.log('Signing message:', message);

      // Simulate message signing
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockSignature = "0x" + Array.from({ length: 64 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join('');

      toast({
        title: "Message Signed!",
        description: `Signature: ${mockSignature.slice(0, 10)}...`,
      });
    } catch (error) {
      toast({
        title: "Signing Failed",
        description: "Failed to sign message. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50">
      <WalletHeader
        isConnected={walletState.isConnected}
        address={walletState.address}
      />

      <main className="container mx-auto px-4 py-8">
        {!walletState.isConnected ? (
          <div className="animate-fade-in">
            <WalletConnection
              onConnect={handleConnect}
              isConnecting={isConnecting}
            />
          </div>
        ) : (
          <div className="animate-slide-up">
            <WalletDashboard
              address={walletState.address}
              balance={walletState.balance}
              onDisconnect={handleDisconnect}
              onSendTransaction={handleSendTransaction}
              onSignMessage={handleSignMessage}
            />
          </div>
        )}
      </main>

      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">

          </p>
          <p className="text-xs text-muted-foreground mt-2">
            This is a demonstration wallet for development purposes only
          </p>
        </div>
      </footer>
    </div>
  );
};

export default WalletDemo;
