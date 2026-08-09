import { Outlet } from 'react-router-dom';import Navbar from './Navbar';import Footer from './Footer';
export default function MainLayout(){return <div className="flex min-h-screen min-w-0 flex-col"><Navbar/><main className="min-w-0 flex-1"><Outlet/></main><Footer/></div>}
