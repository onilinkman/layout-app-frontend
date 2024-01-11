import SidebarComponent from "@/components/SidebarComponent";
import CardItem from "@/components/cardItem/CardItem";

const Catalogos = () => {
	return (
		<main className="flex min-h-[calc(100vh-60px)] flex-col items-center justify-between">
			<div className="w-full relative flex">
				<SidebarComponent />
				<div className="h-[calc(100vh-60px)] w-full text-center overflow-auto">
					<CardItem
						image="/escritorio.jpg"
						title="Noteworthy technology acquisitions 2021"
						description="Here are the biggest enterprise technology acquisitions of 2021
				so far, in reverse chronological order."
					/>
				</div>
			</div>
		</main>
	);
};

export default Catalogos;
