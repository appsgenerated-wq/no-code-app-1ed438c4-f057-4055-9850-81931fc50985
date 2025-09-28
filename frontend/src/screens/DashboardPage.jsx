import React, { useEffect, useState } from 'react';
import config from '../constants';
import { ArrowRightOnRectangleIcon, Cog6ToothIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

const DashboardPage = ({ user, accounts, transactions, onLogout, onLoadData, onCreateTransaction }) => {
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTransaction, setNewTransaction] = useState({ type: 'Transfer', amount: '', description: '', accountId: '' });

  useEffect(() => {
    onLoadData();
  }, [user]);

  useEffect(() => {
    if (accounts.length > 0 && !selectedAccountId) {
      setSelectedAccountId(accounts[0].id);
    }
    if (accounts.length > 0 && !newTransaction.accountId) {
      setNewTransaction(prev => ({ ...prev, accountId: accounts[0].id }));
    }
  }, [accounts, selectedAccountId]);

  const handleTransactionSubmit = (e) => {
    e.preventDefault();
    const transactionPayload = {
      ...newTransaction,
      amount: parseFloat(newTransaction.amount)
    };
    onCreateTransaction(transactionPayload);
    setIsModalOpen(false);
    setNewTransaction({ type: 'Transfer', amount: '', description: '', accountId: accounts[0]?.id || '' });
  };

  const filteredTransactions = transactions.filter(t => t.accountId === selectedAccountId);

  const formatCurrency = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome, {user.name}!</h1>
            <p className="text-gray-600">Here is your financial overview.</p>
          </div>
          <div className="flex items-center space-x-4">
            <a href={`${config.BACKEND_URL}/admin`} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm font-medium text-gray-600 hover:text-indigo-600">
              <Cog6ToothIcon className="h-5 w-5 mr-1" /> Admin Panel
            </a>
            <button onClick={onLogout} className="flex items-center text-sm font-medium text-gray-600 hover:text-red-600">
              <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1" /> Logout
            </button>
          </div>
        </header>

        {/* Accounts Overview */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Accounts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accounts.map(account => (
              <div key={account.id} 
                   onClick={() => setSelectedAccountId(account.id)}
                   className={`p-6 rounded-lg shadow-md cursor-pointer transition-all duration-200 ${selectedAccountId === account.id ? 'bg-indigo-600 text-white transform -translate-y-1' : 'bg-white hover:bg-gray-50'}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className={`text-sm font-medium ${selectedAccountId === account.id ? 'text-indigo-200' : 'text-gray-500'}`}>{account.accountType}</p>
                    <p className={`text-xs ${selectedAccountId === account.id ? 'text-indigo-300' : 'text-gray-400'}`}>...{account.accountNumber.slice(-4)}</p>
                  </div>
                  <p className={`text-2xl font-semibold ${selectedAccountId === account.id ? 'text-white' : 'text-gray-900'}`}>{formatCurrency(account.balance)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Transactions */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Recent Transactions</h2>
            <button onClick={() => setIsModalOpen(true)} className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700">
              <PlusCircleIcon className="h-5 w-5 mr-2" /> New Transaction
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.length > 0 ? filteredTransactions.map(tx => (
                  <tr key={tx.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(tx.transactionDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{tx.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tx.type}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-semibold ${tx.type === 'Deposit' ? 'text-green-600' : 'text-red-600'}`}>
                      {tx.type === 'Deposit' ? '+' : '-'}{formatCurrency(tx.amount)}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4" className="text-center py-10 text-gray-500">No transactions for this account.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* New Transaction Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 shadow-2xl w-full max-w-md">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">New Transaction</h3>
            <form onSubmit={handleTransactionSubmit} className="space-y-4">
              <div>
                <label htmlFor="accountId" className="block text-sm font-medium text-gray-700">From Account</label>
                <select id="accountId" name="accountId" value={newTransaction.accountId} onChange={(e) => setNewTransaction({...newTransaction, accountId: e.target.value})} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  {accounts.map(acc => <option key={acc.id} value={acc.id}>{acc.accountType} - ...{acc.accountNumber.slice(-4)}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">Transaction Type</label>
                <select id="type" name="type" value={newTransaction.type} onChange={(e) => setNewTransaction({...newTransaction, type: e.target.value})} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Transfer</option>
                  <option>Deposit</option>
                  <option>Withdrawal</option>
                </select>
              </div>
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                <input type="number" name="amount" id="amount" value={newTransaction.amount} onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})} step="0.01" min="0.01" required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="0.00" />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <input type="text" name="description" id="description" value={newTransaction.description} onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})} required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="e.g., Online Purchase" />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
