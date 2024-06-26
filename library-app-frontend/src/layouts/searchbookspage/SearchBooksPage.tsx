import { ReactElement, useCallback, useEffect, useMemo, useState } from "react";
import { SearchBook } from "./components/SearchBook";
import { BookModel } from "../../models/BookModel";
import { SpinnerLoading } from "../utils/SpinnerLoading";
import { Pagination } from "../utils/Pagination";
import { BACKEND_CATEGORY, BookCategory, CATEGORIES_AND_SEARCH_TERMS_MAP, DATA_CATEGORY, DEVOPS_CATEGORY, FRONTEND_CATEGORY } from "../utils/TypesUtil";

export const SearchBooksPage = (): ReactElement | null => {
	const [books, setBooks] = useState<BookModel[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [httpError, setHttpError] = useState<string | null>(null);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [booksPerPage] = useState<number>(5);
	const [totalAmountOfBooks, setTotalAmountOfBooks] = useState<number>(0);
	const [totalPages, setTotalPages] = useState<number>(0);
	const [search, setSearch] = useState<string>('');
	const [searchUrl, setSearchUrl] = useState<string>('');

	const searchResult = useMemo((): ReactElement => {
		const indexOfLastBook: number = currentPage * Math.min(totalAmountOfBooks, booksPerPage);
		const indexOfFirstBook: number = Math.max(0, indexOfLastBook - booksPerPage);
		let lastItem = booksPerPage * currentPage <= totalAmountOfBooks ? booksPerPage * currentPage : totalAmountOfBooks;
		return (
			<>
				<div className="mt-3">
					{totalAmountOfBooks > 0 ?
						<>
							<h5>Number of results: ({totalAmountOfBooks})</h5>
							<p>
								{indexOfFirstBook} to {lastItem} of {totalAmountOfBooks} items:
							</p>
						</>
						:
						<div>
							<h3> Can't find what you are looking for? </h3>
							<a type='button' className="btn main-color btn-md px-4 me-md-2 fw-bold text-white" href='#'>
								Library Services
							</a>
						</div>}
				</div>
				{books.map(
					book => <SearchBook book={book} key={book.id} />
				)}
			</>
		)
	}, [books, booksPerPage, currentPage, totalAmountOfBooks]);

	useEffect(() => {
		(async () => {
			const baseUrl: string = "http://localhost:8080/api/books";
			let url: string = '';
			if (searchUrl === '') {
				url = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`;
			} else {
				url = baseUrl + searchUrl;
			}
			const response = await fetch(url);
			if (!response.ok) {
				setIsLoading(false);
				const error = new Error(`Failed to fetch ${url}`);
				setHttpError(error.message);
				throw new Error(`Failed to fetch ${url}`);
			}
			const jsonResponse = await response.json();
			const responseData = jsonResponse._embedded.books;
			setTotalAmountOfBooks(jsonResponse.page.totalElements);
			setTotalPages(jsonResponse.page.totalPages);
			const loadedBooks: BookModel[] = [];
			for (const key in responseData) {
				loadedBooks.push(
					{
						id: responseData[key].id,
						title: responseData[key].title,
						author: responseData[key].author,
						description: responseData[key].description,
						copies: responseData[key].copies,
						copiesAvailable: responseData[key].copiesAvailable,
						category: responseData[key].category,
						image: responseData[key].image
					}
				);
			}
			setBooks(loadedBooks);
			setIsLoading(false);
			window.scrollTo(0, 0);
		})();
	}, [booksPerPage, currentPage, searchUrl]);

	const searchByTitleHandleChange = useCallback(() => {
		setCurrentPage(1);
		if (search === '') {
			setSearchUrl('');
		} else {
			setSearchUrl(`/search/findByTitleContaining?title=${search}&page=0&size=${booksPerPage}`);
		}
	}, [booksPerPage, search]);


	const searchByCategoryHandleChange = useCallback((searchTerm: BookCategory | string) => {
		setCurrentPage(1);
		const queryTerm = CATEGORIES_AND_SEARCH_TERMS_MAP.get(searchTerm as BookCategory);
		if (queryTerm) {
			setSearchUrl(`/search/findByCategory?category=${queryTerm}&page=0&size=${booksPerPage}`);
		} else {
			setSearchUrl('');
		}
	}, [booksPerPage]);

	const paginate = useCallback((pageNumber: number) => { setCurrentPage(pageNumber) }, []);

	if (httpError) {
		return (
			<div className='container pageWrapper'>
				<p>{httpError}</p>
			</div>
		)
	}

	return (
		<div className="pageWrapper mb-5 pb-5">
			{isLoading ? <SpinnerLoading /> :
				<div className="container">
					<div>
						<div className="row">
							<div className="col-6">
								<div className="d-flex">
									<input className="form-control me-2" type="search" placeholder="Search" aria-labelledby="Search" onChange={(e) => setSearch(e.target.value)} />
									<button className="btn btn-outline-success" onClick={() => searchByTitleHandleChange()}>
										Search
									</button>
								</div>
							</div>
							<div className="col-4">
								<div className="dropdown">
									<button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuBUtton1" data-bs-toggle="dropdown" aria-expanded="false">
										Category
									</button>
									<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
										<li>
											<a className="dropdown-item" href="#" onClick={
												() => {
													searchByCategoryHandleChange('');
												}}>
												All
											</a>
										</li>
										<li>
											<a className="dropdown-item" href="#" onClick={() => searchByCategoryHandleChange(FRONTEND_CATEGORY)}>
												Frontend
											</a>
										</li>
										<li>
											<a className="dropdown-item" href="#" onClick={() => searchByCategoryHandleChange(BACKEND_CATEGORY)}>
												Backend
											</a>
										</li>
										<li>
											<a className="dropdown-item" href="#" onClick={() => searchByCategoryHandleChange(DATA_CATEGORY)}>
												Data
											</a>
										</li>
										<li>
											<a className="dropdown-item" href="#" onClick={() => searchByCategoryHandleChange(DEVOPS_CATEGORY)}>
												DevOps
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
						{searchResult}
						{totalPages > 1 &&
							<Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}
					</div>
				</div>
			}
		</div>
	);
}