import React from 'react';
import './App.css';
import { NavBar } from './layouts/navbar/NavBar';
import { Footer } from './layouts/footer/Footer';
import { HomePage } from './layouts/homepage/HomePage';
import { SearchBooksPage } from './layouts/searchbookspage/SearchBooksPage';

export const App = () => {
	return (
		<div>
			<NavBar/>
			{/* <HomePage/> */}
			<SearchBooksPage/>
			<Footer/>
		</div>
	);
}
