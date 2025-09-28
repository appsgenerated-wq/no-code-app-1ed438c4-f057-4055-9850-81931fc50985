import React from 'react';
import config from '../constants';
import { BanknotesIcon, ShieldCheckIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

const LandingPage = ({ onLogin }) => {
  const handleDemoLogin = () => {
    // Use the default admin user for demo purposes
    onLogin('admin@manifest.build', 'admin');
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5 flex items-center">
              <BanknotesIcon className="h-8 w-auto text-indigo-600" />
              <span className="ml-2 text-xl font-bold tracking-tight text-gray-900">BankApp</span>
            </a>
          </div>
          <div className="lg:flex lg:flex-1 lg:justify-end">
            <a href={`${config.BACKEND_URL}/admin`} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600">
              Admin Panel <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
      </header>

      <main className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Modern Banking, Simplified
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              A complete banking application built with a secure and scalable Manifest backend. Manage your accounts and transactions with ease.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                onClick={handleDemoLogin}
                className="rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login as Demo User
              </button>
            </div>
          </div>
        </div>

        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:text-center">
                  <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Everything you need for digital banking</p>
              </div>
              <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                  <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                      <div className="relative pl-16">
                          <dt className="text-base font-semibold leading-7 text-gray-900">
                              <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                  <BanknotesIcon className="h-6 w-6 text-white" aria-hidden="true" />
                              </div>
                              Account Management
                          </dt>
                          <dd className="mt-2 text-base leading-7 text-gray-600">View all your checking and savings accounts in one place, with real-time balance updates.</dd>
                      </div>
                      <div className="relative pl-16">
                          <dt className="text-base font-semibold leading-7 text-gray-900">
                              <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                  <ShieldCheckIcon className="h-6 w-6 text-white" aria-hidden="true" />
                              </div>
                              Secure Transactions
                          </dt>
                          <dd className="mt-2 text-base leading-7 text-gray-600">Log deposits, withdrawals, and transfers with confidence, backed by robust security policies.</dd>
                      </div>
                  </dl>
              </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
