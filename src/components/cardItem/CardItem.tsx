"use client";
import { Button, Card, Carousel } from "flowbite-react";
import ModalModel from "../ModalModel/ModalModel";
import Image from "next/image";
import { PathAPI } from "@/pages/repo/ApiPath";
import SelectC from "../SelectC/SelectC";
import { ReactNode } from "react";
import MakeModal3d from "@/app/catalogos/makeModal3d";

interface Props {
	image: string;
	title: string;
	description: string;
	medidas: string;
	precio: number;
	arrayImages: Array<string>;
	id_mueble?: number;
	path_3d?: string;
	arrayColors?: any[];
}

const CardItem = (props: Props) => {
	return (
		<div className="flex flex-col m-3 items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-[580px] max-w-sm dark:border-gray-700 dark:bg-gray-800 ">
			<ModalModel
				title={props.title}
				btnShowModal={
					<Image
						height={150}
						width={150}
						className="object-cover w-full h-[288px] rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-s-lg cursor-pointer"
						src={props.image}
						alt=""
					/>
				}
			>
				<div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
					<Carousel slideInterval={4000}>
						{props.arrayImages.map((value, index) => (
							<Image
								className="h-full w-auto"
								onClick={() => {
									window
										.open(
											PathAPI +
												"/" +
												props.id_mueble +
												"/" +
												value,
											"_blank"
										)
										?.focus();
								}}
								alt=""
								height={500}
								width={180}
								key={"carousel" + index}
								src={
									PathAPI +
									"/" +
									props.id_mueble +
									"/" +
									value
								}
							/>
						))}
					</Carousel>
				</div>
			</ModalModel>

			<div className="grid h-full justify-between  leading-normal p-3">
				<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					{props.title}
				</h5>
				<div>
					<p className="font-normal text-gray-700 dark:text-gray-400 ">
						{props.description}
					</p>
				</div>
				<p className="text-gray-700 dark:text-slate-300 text-left mt-3 mb-3">
					<span className="font-bold">Medida: </span> {props.medidas}
				</p>
				<p className="text-gray-700 dark:text-slate-300 text-left mb-3">
					<span className="font-bold">Precio: </span>{" "}
					{props.precio + " Bs"}
				</p>
				<Button.Group
					className="flex items-center justify-center"
					outline
				>
					{/* <Button color="gray">Profile</Button> */}
					<MakeModal3d
						id_mueble={props.id_mueble ?? 0}
						path_3d={props.path_3d ?? ""}
						arrayColors={props.arrayColors ?? []}
					/>
					{/* <Button color="gray">Settings</Button> */}
				</Button.Group>
			</div>
		</div>
	);
};

export default CardItem;
