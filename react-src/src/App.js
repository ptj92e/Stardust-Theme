import React, { useState, useEffect } from "react";
import { Routes, Route, Outlet } from 'react-router-dom';

import PrivateRoute from "./components/privateRoute/privateRoute";

import StardustNavbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import HomePage from './pages/home/home';
import ActivitiesPage from './pages/activities/activities';
import ReservationPage from './pages/reservations/reservations';
import LoginPage from './pages/login/login';
import RoomsPage from './pages/rooms/rooms';
import RoomPage from './pages/rooms/room/room';
import OwnersPage from './pages/owners/owners';
import SiteAlert from "./components/siteAlert/siteAlert";

import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const authInfo = JSON.parse(localStorage.getItem('auth-info'))

        if (authInfo) {
            const today = new Date();
            const authTime = new Date(authInfo.authDate)
            const timeDiff = Math.abs(today.getTime() - authTime.getTime());
            const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000;

            if (authInfo.userToken && timeDiff < twentyFourHoursInMilliseconds) {
                setIsAuthenticated(true);
            } else {
                localStorage.clear();
                setIsAuthenticated(false)
            }
        }
    }, []);

    return (
        <>
            <SiteAlert />
            <div className="App">
                <StardustNavbar 
                    isAuthenticated={isAuthenticated}
                    authChanger={setIsAuthenticated}
                />
                <Routes>
                    <Route path='/' element={
                            <HomePage />
                        }
                    />
                    <Route path='/activities' element={
                            <ActivitiesPage />
                        }
                    />
                    <Route path='/rooms'>
                        <Route index={true} element={
                                <>
                                    <RoomsPage />
                                    <Outlet />
                                </>
                            }
                        />
                        <Route 
                            path=':roomId'
                            element={
                                <>
                                    <RoomPage />
                                    <Outlet />
                                </>
                            }
                        />
                    </Route>
                    <Route path='/reservations'>
                        <Route index={true} element={
                                <>
                                    <ReservationPage
                                        isAuthenticated={isAuthenticated}
                                    />
                                    <Outlet />
                                </>
                            }
                        />
                        <Route path=':roomName' element={
                                <>
                                    <ReservationPage />
                                    <Outlet />
                                </>
                            }
                        />
                    </Route>
                    <Route path='/owners' element={
                            <PrivateRoute>
                                <OwnersPage />
                            </PrivateRoute>
                        }
                    />
                    <Route path='/login' element={
                            <LoginPage authChanger={setIsAuthenticated} />
                        }
                    />
                    <Route path='*' element={
                            <h1>No Match</h1>
                        }
                    />
                </Routes>
                <Footer 
                    isAuthenticated={isAuthenticated}
                />
            </div>
        </>
    );
}

export default App;
