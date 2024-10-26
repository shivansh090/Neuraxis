import { useState } from 'react'
import { Mic, MessageSquare, VolumeX, Volume2 } from 'lucide-react'
import { Navigate, useNavigate } from 'react-router-dom'
import bg from '../assets/images/bg.png'

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('signup')
    const navigate= useNavigate();
  return (
    <div style={{backgroundImage:`url(${bg})`}}  className="min-h-screen bg-gray-50 flex flex-col">
      <header className="">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-gray-900">neur<span className='text-orange-500'>axis.</span> </span>
              </div>
            </div>
            <div className="flex items-center">
              <button onClick={()=> navigate('/', { replace: true })} className="bg-orange-500 text-white rounded-md px-3 py-2 text-sm font-medium">
                Home
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow  flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {activeTab === 'signup' ? 'Create your account' : 'Sign in to your account'}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {activeTab === 'signup'
                ? 'Start your journey to a world without barriers'
                : 'Welcome back to neuraxis'}
            </p>
          </div>
          <div className="mt-8 py-8 bg-white opacity-75 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="sm:flex sm:justify-center mb-6">
              <div className="relative z-0 inline-flex shadow-sm rounded-md">
                <button
                  type="button"
                  onClick={() => setActiveTab('signup')}
                  className={`relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                    activeTab === 'signup'
                      ? 'text-gray-900 bg-gray-50'
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  Sign Up
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('login')}
                  className={`-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                    activeTab === 'login'
                      ? 'text-gray-900 bg-gray-50'
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  Login
                </button>
              </div>
            </div>
            <form className="space-y-6" action="#" method="POST">
              {activeTab === 'signup' && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    />
                  </div>
                </div>
              )}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  {activeTab === 'signup' ? 'Sign Up' : 'Sign In'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            {[Mic, MessageSquare, VolumeX, Volume2].map((Icon, i) => (
              <div key={i} className="bg-gray-800 text-white p-2 rounded-md">
                <Icon className="h-6 w-6" />
              </div>
            ))}
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">
              &copy; 2023 neuraxis. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
    
  )
}