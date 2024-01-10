import React from 'react';
import './App.css';
import { NavBar } from './layouts/navbar/NavBar';
import { Footer } from './layouts/footer/Footer';
import { HomePage } from './layouts/homepage/HomePage';

export const App = () => {
	return (
		<div>
			<NavBar/>
			<HomePage/>
			<Footer/>
		</div>
	);
}
