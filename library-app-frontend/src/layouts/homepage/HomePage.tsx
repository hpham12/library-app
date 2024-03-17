import { Carousel } from "./components/Carousel/Carousel"
import { ExploreTopBooks } from "./components/ExploreTopBooks/ExploreTopBooks"
import { Heros } from "./components/Heros/Heros"
import { LibraryServices } from "./components/LibraryServices/LibraryServices"

export const HomePage = () => {
	return (
		<>
			<ExploreTopBooks />
			<Carousel />
			<Heros />
			<LibraryServices />
		</>
	)
}