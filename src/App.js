import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Gallery from './pages/Gallery';
import Protected from './components/ProtectedRoutes';
import Unauthorized from './components/Unauthorized';
import Main from './pages/Main';

function App() {
	return (
		<div className='App'>
			<Header />
			<Routes>
				<Route path='/' element={<Main />} />
				<Route element={<Unauthorized />}>
					<Route path='/login' element={<Login />} />
					<Route path='/registration' element={<Registration />} />
				</Route>
				<Route element={<Protected />}>
					<Route path='/gallery' element={<Gallery />} />
				</Route>
				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>
		</div>
	);
}

export default App;
