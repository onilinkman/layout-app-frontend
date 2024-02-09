"use client";
import { Button, Card } from "flowbite-react";
import ModalModel from "../ModalModel/ModalModel";
import Image from "next/image";

interface Props {
	image: string;
	title: string;
	description: string;
}

const CardItem = (props: Props) => {
	return (
		<Card
			className="max-w-sm"
			imgSrc={props.image}
			horizontal
			imgAlt="Image"

		>
			<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				{props.title}
			</h5>
			<p className="font-normal text-gray-700 dark:text-gray-400">
				{props.description}
			</p>
			<Button.Group className="flex items-center justify-center" outline>
				<Button color="gray">Profile</Button>
				<ModalModel>
					<img src={props.image} className="h-full w-full"  alt={props.title}/>
				</ModalModel>
				<ModalModel>
					<div>hola2</div>
				</ModalModel>
				<Button color="gray">Settings</Button>
			</Button.Group>
		</Card>
	);
};



export default CardItem;
