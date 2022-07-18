import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login/Login';
import Registration from './pages/Registration/Registration';
import Gallery from './pages/Gallery/Gallery';
import Profile from './pages/Profile/Profile';
import Protected from './components/ProtectedRoutes';
import Unauthorized from './components/Unauthorized';

function App() {
	return (
		<div className='App'>
			<Header />
			<Routes>
				<Route path='/' element={<></>} />
				<Route element={<Unauthorized />}>
					<Route path='/login' element={<Login />} />
					<Route path='/registration' element={<Registration />} />
				</Route>

				<Route element={<Protected />}>
					<Route path='/gallery' element={<Gallery />} />
					<Route path='/profile' element={<Profile />} />
				</Route>
				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>
		</div>
	);
}

export default App;