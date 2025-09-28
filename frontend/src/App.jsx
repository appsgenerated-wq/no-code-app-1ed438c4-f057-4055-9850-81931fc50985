import React, { useState, useEffect } from 'react';
import Manifest from '@mnfst/sdk';
import LandingPage from './screens/LandingPage';
import DashboardPage from './screens/DashboardPage';
import { testBackendConnection } from './services/apiService';
import config from './constants';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [backendConnected, setBackendConnected] = useState(false);
  const manifest = new Manifest({ appId: config.APP_ID, baseURL: config.BACKEND_URL });

  useEffect(() => {
    const checkConnectionAndSession = async () => {
      console.log('🚀 [APP] Starting backend connection test...');
      const connectionResult = await testBackendConnection();
      setBackendConnected(connectionResult.success);

      if (connectionResult.success) {
        console.log('✅ [APP] Backend connection successful.');
        try {
          const currentUser = await manifest.from('User').me();
          setUser(currentUser);
          console.log('✅ [APP] User session found.');
        } catch (error) {
          setUser(null);
          console.log('ℹ️ [APP] No active user session.');
        }
      } else {
        console.error('❌ [APP] Backend connection failed:', connectionResult.error);
      }
      setIsDataLoading(false);
    };

    checkConnectionAndSession();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      await manifest.login(email, password);
      const currentUser = await manifest.from('User').me();
      setUser(currentUser);
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleLogout = async () => {
    await manifest.logout();
    setUser(null);
    setAccounts([]);
    setTransactions([]);
  };

  const loadDashboardData = async () => {
    if (!user) return;
    setIsDataLoading(true);
    try {
      const accountsResponse = await manifest.from('Account').find({ filter: { ownerId: user.id } });
      setAccounts(accountsResponse.data);

      if (accountsResponse.data.length > 0) {
        const accountIds = accountsResponse.data.map(acc => acc.id);
        const transactionsResponse = await manifest.from('Transaction').find({
          filter: { accountId: { in: accountIds } },
          sort: { transactionDate: 'desc' },
          limit: 50
        });
        setTransactions(transactionsResponse.data);
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setIsDataLoading(false);
    }
  };

  const handleCreateTransaction = async (transactionData) => {
    try {
      const newTransaction = await manifest.from('Transaction').create(transactionData);
      setTransactions(prev => [newTransaction, ...prev]);
      // Refresh account balance
      const updatedAccount = await manifest.from('Account').read(transactionData.accountId);
      setAccounts(prev => prev.map(acc => acc.id === updatedAccount.id ? updatedAccount : acc));
      alert('Transaction successful!');
    } catch (error) {
      console.error('Failed to create transaction:', error);
      alert('Transaction failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${backendConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className="text-xs text-gray-600">{backendConnected ? 'Connected' : 'Disconnected'}</span>
      </div>

      {isDataLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-gray-500">Loading...</p>
        </div>
      ) : user ? (
        <DashboardPage
          user={user}
          accounts={accounts}
          transactions={transactions}
          onLogout={handleLogout}
          onLoadData={loadDashboardData}
          onCreateTransaction={handleCreateTransaction}
        />
      ) : (
        <LandingPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
