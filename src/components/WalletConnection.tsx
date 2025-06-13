
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wallet, Shield, Zap } from 'lucide-react';

interface WalletConnectionProps {
  onConnect: (walletType: string) => void;
  isConnecting: boolean;
}

const WalletConnection = ({ onConnect, isConnecting }: WalletConnectionProps) => {
  const walletOptions = [
    {
      id: 'spirekey',
      name: 'SpireKey',
      description: 'Kadena\'s native wallet solution with enhanced security',
      icon: Shield,
      features: ['Gasless transactions', 'Hardware security', 'Multi-sig support'],
      recommended: true
    },
    {
      id: 'chainweaver',
      name: 'Chainweaver',
      description: 'Desktop wallet for advanced users',
      icon: Wallet,
      features: ['Full node access', 'Advanced scripting', 'Multi-account'],
      recommended: false
    },
    {
      id: 'walletconnect',
      name: 'WalletConnect',
      description: 'Connect with mobile wallets',
      icon: Zap,
      features: ['Mobile support', 'QR code pairing', 'Cross-platform'],
      recommended: false
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-3">
        <h2 className="text-2xl font-bold">Connect Your Wallet</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Choose a wallet to connect to the Kadena network and start transacting
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {walletOptions.map((wallet) => {
          const IconComponent = wallet.icon;
          return (
            <Card 
              key={wallet.id} 
              className="relative hover:shadow-lg transition-all duration-200 cursor-pointer group"
              onClick={() => onConnect(wallet.id)}
            >
              {wallet.recommended && (
                <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white">
                  Recommended
                </Badge>
              )}
              
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-purple-100 to-cyan-100 group-hover:from-purple-200 group-hover:to-cyan-200 transition-colors">
                    <IconComponent className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{wallet.name}</CardTitle>
                  </div>
                </div>
                <CardDescription className="text-sm">
                  {wallet.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {wallet.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-xs text-muted-foreground">
                      <div className="h-1 w-1 bg-current rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="w-full wallet-button-primary"
                  disabled={isConnecting}
                >
                  {isConnecting ? 'Connecting...' : 'Connect'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          By connecting a wallet, you agree to the{' '}
          <a href="#" className="text-primary hover:underline">Terms of Service</a>
        </p>
      </div>
    </div>
  );
};

export default WalletConnection;
