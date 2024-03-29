import { ReactElement } from "react";
import { BookModel } from "../../../models/BookModel";

interface SearchBookProps {
	book: BookModel;
}

export const SearchBook = (props: SearchBookProps): ReactElement | null => {
	const { book } = props;
	return (
		<div className='card mt-3 shadow p-3 mb-3 bg-body rounded'>
			<div className="row g-0">
				<div className="col-md-2">
					<div className="d-none d-lg-block">
						{book.image ?
							<img
								src={book.image}
								width='123'
								height='196'
								alt="Book"
							/> :
							<img
								src={require('../../../Images/BooksImages/book-luv2code-1000.png')}
								width='123'
								height='196'
								alt="Book"
							/>
						}
					</div>
					<div className="d-lg-none d-flex justify-content-center align-items-center">
						{book.image ?
							<img
								src={book.image}
								width='123'
								height='196'
								alt="Book"
							/> :
							<img
								src={require('../../../Images/BooksImages/book-luv2code-1000.png')}
								width='123'
								height='196'
								alt="Book"
							/>
						}
					</div>
				</div>
				<div className="col-md-6">
					<div className="card-body">
						<h5 className="card-title">
							{book.author}
						</h5>
						<h4>
							{book.title}
						</h4>
						<p className="card-text">
							{book.description}
						</p>
					</div>
				</div>
				<div className="col-md-4 d-flex justify-content-center align-items-center">
					<a className="btn btn-md main-color text-white" href="#">
						View Details
					</a>
				</div>
			</div>
		</div>
	);
}