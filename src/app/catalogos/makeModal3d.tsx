"use client";
import ModalModel from "@/components/ModalModel/ModalModel";
import SelectC from "@/components/SelectC/SelectC";
import { Get3d, GetColorMuestra, PathAPI } from "@/pages/repo/ApiPath";
import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import Show3dModel from "./show3dModel";

interface Props {
	arrayColors: any[];
	path_3d: string;
	id_mueble: number;
}

const MakeModal3d = (props: Props) => {
	const [optionColors, SetOptionColors] = useState<Array<JSX.Element>>([]);
	const [path3D, setPath3D] = useState<string>("/tocador.glb");
	const [imageColor, setImageColor] = useState<string | null>(null);
	const [show3D, setShow3D] = useState<boolean>(false);

	const makeOptionsColors = (colors: any[]) => {
		let arr: JSX.Element[] = [];
		colors.forEach((value, index) => {
			arr.push(
				<option key={"option" + index} value={value.path_muestra}>
					{value.nombre}
				</option>
			);
		});
		SetOptionColors(arr);
	};

	const showColorImage = async (path_muestra: string) => {
		await fetch(PathAPI + GetColorMuestra + path_muestra, {
			method: "GET",
			headers: {
				Accept: "*/*",
			},
		})
			.then((res) => res.blob())
			.then((data) => {
				if (data) {
					setImageColor(URL.createObjectURL(data));
				} else {
					setImageColor(null);
				}
			})
			.catch((err: any) => {
				console.log(err);
				setImageColor(null);
			});
	};

	const get3d = async () => {
		setShow3D(false);
		await fetch(
			PathAPI +
				Get3d +
				"id=" +
				props.id_mueble +
				"&name=" +
				props.path_3d,
			{
				method: "GET",
				headers: {
					Accept: "*/*",
				},
			}
		)
			.then((res) => {
				if (res.status == 200) {
					return res.blob();
				}
			})
			.then((data) => {
				if (data) {
					console.log(data);
					setPath3D(URL.createObjectURL(data));
					setShow3D(true);
				} else {
					setPath3D("");
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<ModalModel
			btnShowModal={
				<Button
					color="info"
					onClick={() => {
						get3d();
						makeOptionsColors(props.arrayColors);
					}}
				>
					Ver Modelo 3d
				</Button>
			}
		>
			<div className="flex flex-col relative">
				<div className="absolute top-0 z-10">
				<SelectC
					label="Seleccionar un color"
					optionDefaut="Seleccionar"
					options={optionColors}
					onChange={(name) => {
						showColorImage(name ?? "");
					}}
				/>

				</div>
				{show3D ? (
					<Show3dModel
						url3D={path3D}
						urlTexture={imageColor??"/Textura_estante.jpg"}
					/>
				) : (
					<></>
				)}
			</div>
		</ModalModel>
	);
};

export default MakeModal3d;
