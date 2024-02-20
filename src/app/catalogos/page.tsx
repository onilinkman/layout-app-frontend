"use client";
import SidebarComponent from "@/components/SidebarComponent";
import CardItem from "@/components/cardItem/CardItem";
import { GetAllMuebleAndImage, GetColor, PathAPI } from "@/pages/repo/ApiPath";
import { Alert, Spinner } from "flowbite-react";
import { ReactNode, useEffect, useState } from "react";
import { HiInformationCircle } from "react-icons/hi";

interface MuebleAndImg {
	id_mueble: number;
	nombre: string;
	description: string;
	precio: number;
	colors: Array<any> | undefined | null;
	medidas: string;
	path_3d: string;
	images: Array<string>;
}
interface MessaggeAlert {
	show: boolean;
	type: string;
	messagge: string;
}

const Catalogos = () => {
	const [muebles, setMuebles] = useState<Map<number, MuebleAndImg>>(
		new Map<number, MuebleAndImg>()
	);
	const [alert, setAlert] = useState<MessaggeAlert>({
		show: false,
		type: "failure",
		messagge: "",
	});
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [arrayColors, setArrayColors] = useState<Array<any>>([]);

	const getAllMuebleAndImage = async () => {
		const formdata = new FormData();
		formdata.append("id_color", "0");
		setIsLoading(true);
		let colors = await getColor();
		setArrayColors(colors);
		await fetch(PathAPI + GetAllMuebleAndImage, {
			method: "POST",
			headers: {
				Accept: "*/*",
			},
			body: formdata,
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.status == 200) {
					setMuebles(
						parseDataToMueble(data.body?.muebles, data.body?.colors)
					);
					setAlert({
						show: false,
						type: "success",
						messagge: "",
					});
				} else {
					setAlert({
						show: true,
						type: "failure",
						messagge:
							"Error: " +
							data.mensaje +
							"\n NroErr: " +
							data.status,
					});
				}
			})
			.catch((err: Error) => {
				setAlert({
					show: true,
					type: "failure",
					messagge: "Error: " + err.message,
				});
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const parseDataToMueble = (data: Array<any>, colors: Array<any>) => {
		let arr = new Map<number, MuebleAndImg>();
		data.forEach((value, index) => {
			let mi: MuebleAndImg | undefined = arr.get(value.id_mueble);
			if (!mi) {
				let aux: MuebleAndImg = {
					id_mueble: value.id_mueble,
					description: value.description,
					medidas: value.medidas,
					colors: colors,
					nombre: value.nombre,
					path_3d: value.path_3d,
					precio: value.precio,
					images: [value.path_img],
				};
				arr.set(aux.id_mueble, aux);
			} else {
				mi.images.push(value.path_img);
			}
		});
		return arr;
	};

	const makeCards: () => Array<ReactNode> = () => {
		let arr: Array<ReactNode> = [];
		muebles.forEach((value, id_mueble) => {
			arr.push(
				<CardItem
					key={"cards" + id_mueble}
					image={PathAPI + "/" + id_mueble + "/" + value.images[0]}
					arrayImages={value.images}
					title={value.nombre}
					medidas={value.medidas}
					path_3d={value.path_3d}
					precio={value.precio}
					description={value.description}
					id_mueble={id_mueble}
					arrayColors={value.colors ?? []}
				/>
			);
		});
		return arr;
	};

	const getColor = async () => {
		let color: any[] = [];
		await fetch(PathAPI + GetColor, {
			method: "GET",
			headers: {
				Accept: "*/*",
			},
		})
			.then((res) => res.json())
			.then(async (data) => {
				let body = data.body;
				color = body;
			})
			.catch((err) => {
				console.log(err);
			});
		return color;
	};

	useEffect(() => {
		getAllMuebleAndImage();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<main className="flex min-h-[calc(100vh-60px)] flex-col items-center justify-between">
			<div className="w-full relative flex">
				<SidebarComponent />
				<div className="h-[calc(100vh-60px)] w-full text-center overflow-auto flex flex-wrap justify-center">
					{isLoading ? (
						<Spinner
							aria-label="Extra large spinner example"
							size="xl"
						/>
					) : (
						<></>
					)}
					{alert.show && !isLoading ? (
						<Alert
							className="max-h-[120px]"
							color={alert.type}
							icon={HiInformationCircle}
						>
							{alert.messagge + ". "}
							<span
								className="font-medium cursor-pointer"
								onClick={getAllMuebleAndImage}
							>
								Presione aqui para volver a CARGAR
							</span>{" "}
						</Alert>
					) : (
						<></>
					)}
					{makeCards()}
				</div>
			</div>
		</main>
	);
};

export default Catalogos;
