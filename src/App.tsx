import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Main from './pages/main';
import Withdraw from './pages/withdraw';
import Replenishment from './pages/replenishment';
import { Toaster } from 'react-hot-toast';
import appAPI from './api/service';
import Loader from './components/loader';

function App() {
  const [user, setUser] = useState(null)

  const getUser = async () => {
    //@ts-ignore
    window?.Telegram.WebApp.expand()
    const userInfo = await appAPI.getUser()
    if (userInfo.success === true) {
      setUser(userInfo.user)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  if (user === null) return <Loader />
  return (
    <BrowserRouter>
      <Toaster />
      <div className="app">
        <Routes>
          <Route path='/' element={<Main user={user} />} />
          <Route path='/withdraw' element={<Withdraw user={user} getUser={getUser} />} />
          <Route path='/replenishment' element={<Replenishment user={user} />} />
          <Route path='/*' element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
