import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import routes from './routes';
import './admin.css';
import { useStateContext } from '../hook/ContextProvider';
import Setter from './pages/home/Setter';
import { Home } from './pages';
import Canvas from './components/Canvas';
import { CanvasProvider } from '../hook/CanvasProvider';
import SetterPercentage from './pages/home/SetterPercentage';
import Notification from './components/Notification';
import AskQuestion from './components/AskQuestion';
import NotifyReminder from './pages/Admin/NotifyReminder';
import AnswerQue from './pages/Admin/AnswerQue';
import ProfileMate from './pages/ProfileMate';



function Admin(props) {
    const { activeMenu } = useStateContext();
    const location = useLocation();
    const pathParts = location.pathname.split('/');
    const teamMateId = pathParts[3] ? pathParts[3] : null; // Extract ID from URL

    // Document title based on path name 
    useEffect(() => {
        const path = location.pathname;
        if (path === '/admin/home') {
            document.title = "Work Culture | Dashboard ";
        } else {
            document.title = "Work Culture";
        }
    }, [location.pathname]);
    return (
        <div className="wrapper">
            <CanvasProvider>
                <Sidebar {...props} routes={routes} />
                <div className={`main-panel ${activeMenu ? "active" : ''}`}>
                    <Navbar teamMateId={teamMateId} />
                    <Routes>
                        {routes.map((route, key) => (
                            <Route
                                key={key}
                                path={route.path}
                                element={route.component}
                            >
                            </Route>
                        ))}
                        {/* <Route path="*" element={<Navigate to="/admin/home" replace />} /> */}
                        <Route path="/admin" element={<Navigate to="/admin/home" replace />} />
                        <Route path="/admin/home" element={<Home />} />
                        <Route path="/home/setter" element={<Setter />} />
                        <Route path="/admin/home/percentage" element={<SetterPercentage />} />
                        <Route path="/admin/profilemate/:id" element={<ProfileMate />} />
                        <Route path="/profilemate/:id" element={<ProfileMate />} />
                    </Routes>
                </div>
                <AnswerQue />
                <NotifyReminder />
                <AskQuestion />
                <Notification />
                <Canvas />
            </CanvasProvider>
        </div>
    );
}

export default Admin;
