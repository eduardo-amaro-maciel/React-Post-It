import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import NotFound from '../pages/NotFound'
import PrivateRoute from './PrivateRoute'
import Loading from '../components/Loading'

function RoutesApp() {
    return (
        <Router>
            <Routes>
                <Route path='/login' exact loader={<Loading/>} element={<Login />} />
                <Route element={<PrivateRoute />} loader={<Loading/>} >
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
                <Route path='*' element={<NotFound />} />
            </Routes>
        </Router>
    )
}

export default RoutesApp