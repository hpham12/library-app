import React from 'react';
import { BookModel } from '../../../../models/BookModel';

interface ReturnBookProps {
	book: BookModel;
}

export const ReturnBook = (props: ReturnBookProps) => {
	const {book} = props;

	return (
		<div className='col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3'>
			<div className='text-center'>
				{book.image? 
				<img
					src={book.image}
					width='151'
					height='233'
					alt='book'
				>
				</img>:
				<img 
					src={require('./../../../../Images/BooksImages/book-luv2code-1000.png')}
					width='151'
					height='233'
					alt='book'
					>
				</img>
			}
				
				<h6 className='mt-2'>{book.title}</h6>
				<p>{book.author}</p>
				<a className='btn main-color text-white' href='/#'>Reserve</a>
			</div>
		</div>
	);
}