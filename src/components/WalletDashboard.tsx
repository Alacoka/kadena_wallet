
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Send, 
  History, 
  Eye, 
  Copy, 
  ExternalLink, 
  Settings,
  ArrowUpRight,
  ArrowDownLeft,
  Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WalletDashboardProps {
  address: string;
  balance: string;
  onDisconnect: () => void;
  onSendTransaction: (to: string, amount: string, memo: string) => void;
  onSignMessage: (message: string) => void;
}

const WalletDashboard = ({ 
  address, 
  balance, 
  onDisconnect, 
  onSendTransaction,
  onSignMessage 
}: WalletDashboardProps) => {
  const [sendForm, setSendForm] = useState({ to: '', amount: '', memo: '' });
  const [signMessage, setSignMessage] = useState('');
  const { toast } = useToast();

  const mockTransactions = [
    {
      id: '1',
      type: 'send',
      amount: '10.5',
      to: 'k:5a2afbc4564b76b2c27ce5a644cab643c43663835ea0be22433b209d3351f937',
      timestamp: '2 hours ago',
      status: 'confirmed'
    },
    {
      id: '2',
      type: 'receive',
      amount: '25.0',
      from: 'k:1d5a5e10eb15355422ad66b6c12167bdbb23b1e1ef9648b82a5e43b964a5a3ae',
      timestamp: '1 day ago',
      status: 'confirmed'
    },
    {
      id: '3',
      type: 'send',
      amount: '5.2',
      to: 'k:8f5a2e7c9b1d3f4e6a8c5d2f1e9b7a4c3d8f6e1a2b5c9d7f3e8a1b4c6d9f2e5a',
      timestamp: '3 days ago',
      status: 'pending'
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Address copied to clipboard",
    });
  };

  const handleSend = () => {
    if (!sendForm.to || !sendForm.amount) {
      toast({
        title: "Invalid input",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    onSendTransaction(sendForm.to, sendForm.amount, sendForm.memo);
    setSendForm({ to: '', amount: '', memo: '' });
  };

  const handleSign = () => {
    if (!signMessage) {
      toast({
        title: "Invalid input",
        description: "Please enter a message to sign",
        variant: "destructive"
      });
      return;
    }
    onSignMessage(signMessage);
    setSignMessage('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Balance Card */}
      <Card className="wallet-card animate-fade-in">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Balance</p>
              <p className="balance-display">{balance} KDA</p>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(address)}
                  className="text-xs p-1 h-auto"
                >
                  <Copy className="h-3 w-3 mr-1" />
                  {address.slice(0, 12)}...{address.slice(-8)}
                </Button>
                <Button variant="ghost" size="sm" className="text-xs p-1 h-auto">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View on Explorer
                </Button>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <Badge variant="secondary" className="text-green-600 bg-green-50">
                <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                Connected
              </Badge>
              <Button variant="outline" size="sm" onClick={onDisconnect}>
                <Settings className="h-4 w-4 mr-1" />
                Disconnect
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Functionality Tabs */}
      <Tabs defaultValue="send" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="send" className="flex items-center space-x-2">
            <Send className="h-4 w-4" />
            <span>Send</span>
          </TabsTrigger>
          <TabsTrigger value="sign" className="flex items-center space-x-2">
            <Eye className="h-4 w-4" />
            <span>Sign</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center space-x-2">
            <History className="h-4 w-4" />
            <span>History</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="send" className="space-y-4">
          <Card className="wallet-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Send className="h-5 w-5" />
                <span>Send KDA</span>
              </CardTitle>
              <CardDescription>
                Transfer KDA tokens to another address
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="to">Recipient Address</Label>
                <Input
                  id="to"
                  placeholder="k:recipient-address-here"
                  value={sendForm.to}
                  onChange={(e) => setSendForm({ ...sendForm, to: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (KDA)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={sendForm.amount}
                  onChange={(e) => setSendForm({ ...sendForm, amount: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="memo">Memo (Optional)</Label>
                <Input
                  id="memo"
                  placeholder="Transaction memo"
                  value={sendForm.memo}
                  onChange={(e) => setSendForm({ ...sendForm, memo: e.target.value })}
                />
              </div>
              <Button onClick={handleSend} className="w-full wallet-button-primary">
                Send Transaction
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sign" className="space-y-4">
          <Card className="wallet-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5" />
                <span>Sign Message</span>
              </CardTitle>
              <CardDescription>
                Cryptographically sign a message with your wallet
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="message">Message to Sign</Label>
                <Textarea
                  id="message"
                  placeholder="Enter your message here..."
                  rows={4}
                  value={signMessage}
                  onChange={(e) => setSignMessage(e.target.value)}
                />
              </div>
              <Button onClick={handleSign} className="w-full wallet-button-primary">
                Sign Message
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card className="wallet-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <History className="h-5 w-5" />
                <span>Transaction History</span>
              </CardTitle>
              <CardDescription>
                Recent wallet activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockTransactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${
                        tx.type === 'send' ? 'bg-red-100' : 'bg-green-100'
                      }`}>
                        {tx.type === 'send' ? (
                          <ArrowUpRight className="h-4 w-4 text-red-600" />
                        ) : (
                          <ArrowDownLeft className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium capitalize">{tx.type}</p>
                        <p className="text-sm text-muted-foreground">
                          {tx.type === 'send' ? 'To: ' : 'From: '}
                          {(tx.type === 'send' ? tx.to : tx.from)?.slice(0, 10)}...
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${
                        tx.type === 'send' ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {tx.type === 'send' ? '-' : '+'}{tx.amount} KDA
                      </p>
                      <div className="flex items-center space-x-2">
                        <Badge variant={tx.status === 'confirmed' ? 'secondary' : 'outline'}>
                          {tx.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                          {tx.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{tx.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WalletDashboard;
