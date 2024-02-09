"use client";
import SidebarComponent from "@/components/SidebarComponent";
import CardAdd from "./cardAdd";
import SecondCard, { SecondCardHandle } from "./secondCard";
import { useRef } from "react";

const AgregarItem = () => {
	const refSecCard=useRef<SecondCardHandle>(null)
	return (
		<main className="flex min-h-[calc(100vh-60px)] flex-col items-center justify-between">
			<div className="w-full relative flex">
				<SidebarComponent />
				<div className="h-[calc(100vh-60px)] w-full text-center overflow-auto grid">
					<CardAdd
						HandleMoveCard={(id_mueble) => {
							console.log(id_mueble);
							refSecCard.current?.showDiv();
						}}
					/>
					<SecondCard ref={refSecCard}/>
				</div>
			</div>
		</main>
	);
};

export default AgregarItem;
