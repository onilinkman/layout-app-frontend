"use client";
import AddColorMenu from "@/components/AddColorMenu";
import ModalText from "@/components/ModalText/ModalText";
import SelectC from "@/components/SelectC/SelectC";
import {
	GetColor,
	GetColorMuestra,
	PathAPI,
	PostColor,
	PutModel3D,
} from "@/pages/repo/ApiPath";
import { Alert, Button, Card, Carousel } from "flowbite-react";
import Image from "next/image";
import {
	ChangeEvent,
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import AddModel3D from "./addModel3D";

export type SecondCardHandle = {
	hiddenDiv: () => void;
	showDiv: () => void;
};

interface Props {
	idItem: number;
}

interface MessaggeAlert {
	show: boolean;
	type: string;
	messagge: string;
}

const SecondCard = forwardRef<SecondCardHandle, Props>(function SecondCard(
	props: Props,
	ref
) {
	const [image, setImage] = useState<string | null>(null);
	const [imageColor, setImageColor] = useState<string | null>(null);
	const [modelColor, setModelColor] = useState<string | null>(null);
	const [arraySelect, setArraySelect] = useState<Array<JSX.Element>>([]);
	const [arrayData, setArrayData] = useState<Array<any>>([]);
	const [idColor, setIdColor] = useState<number | null>(null);
	const [isUploading, setIsUploading] = useState<boolean>(false);
	const [showAlert, setShowAlert] = useState<MessaggeAlert>({
		show: false,
		messagge: "",
		type: "failure",
	});
	const [show3DputAlert, setShow3DputAlert] = useState<MessaggeAlert>({
		show: false,
		messagge: "",
		type: "failure",
	});
	const [isUploading3D, setIsUploading3D] = useState<boolean>(false);

	const refDiv = useRef<HTMLDivElement>(null);
	const refInputImage = useRef<HTMLInputElement>(null);
	const refInput3d = useRef<HTMLInputElement>(null);

	const hiddenDiv = () => {
		refDiv.current?.classList.remove("hidden");
		refDiv.current?.classList.remove("translate-x-[calc(100vh+600px)]");
		refDiv.current?.classList.add("translate-x-[calc(100vh+600px)]");
		refDiv.current?.classList.add("hidden");
	};
	const showDiv = () => {
		refDiv.current?.classList.remove("hidden");
		refDiv.current?.classList.remove("translate-x-[calc(100vh+600px)]");
	};

	const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImage(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleModelImage3DChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setModelColor(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	useImperativeHandle(ref, () => {
		return {
			hiddenDiv,
			showDiv,
		};
	});

	const getColor = async () => {
		await fetch(PathAPI + GetColor, {
			method: "GET",
			headers: {
				Accept: "*/*",
			},
		})
			.then((res) => res.json())
			.then(async (data) => {
				let body = data.body;
				setArrayData(body);
				let aux: Array<JSX.Element> = [];
				await body.forEach((value: any, index: number) => {
					aux.push(
						<option key={index} value={index}>
							{value.nombre}
						</option>
					);
				});
				setArraySelect(aux);
			})
			.catch((err) => {
				console.log(err);
			});
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

	const postColor = () => {
		if (idColor && refInputImage.current?.files) {
			const formdata = new FormData();
			formdata.append("id_color", idColor + "");
			formdata.append("id_mueble", props.idItem + "");
			formdata.append("img", refInputImage.current?.files[0]);
			console.log(props.idItem);
			setIsUploading(true);

			fetch(PathAPI + PostColor, {
				method: "POST",
				headers: {
					Accept: "*/*",
				},
				body: formdata,
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					clearImageInput();
					setShowAlert({
						show: true,
						messagge: data.mensaje,
						type: "success",
					});
				})
				.catch((err: Error) => {
					setShowAlert({
						show: true,
						messagge: err.message,
						type: "failure",
					});
					console.log(err);
				})
				.finally(() => {
					setIsUploading(false);
				});
		}
	};

	const putModel3dHandle = () => {
		if (refInput3d.current?.files) {
			let formdata = new FormData();
			formdata.append("id_mueble", props.idItem + "");
			formdata.append("model", refInput3d.current.files[0]);
			setIsUploading3D(true);
			fetch(PathAPI + PutModel3D, {
				method: "PUT",
				headers: {
					Accept: "*/*",
				},
				body: formdata,
			})
				.then((res) => {
					if (res.status) {
						setShow3DputAlert({
							show: true,
							messagge: "Se guardo correctamente",
							type: "success",
						});
					} else {
						setShow3DputAlert({
							show: true,
							messagge: "Error: " + res.status,
							type: "failure",
						});
					}
				})
				.catch((err: Error) => {
					console.log(err);
					setShow3DputAlert({
						show: true,
						messagge: err.message,
						type: "failure",
					});
					console.log(err);
				})
				.finally(() => {
					setIsUploading3D(false);
				});
		}
	};

	const clearImageInput = () => {
		setImage("/dummy.jpg");
	};

	useEffect(() => {
		getColor();
	}, []);

	return (
		//translate-x-[calc(100vh+600px)] hidden
		<div
			className="transition duration-500 translate-x-[calc(100vh+600px)] hidden"
			ref={refDiv}
		>
			<Card className="max-w-sm m-auto">
				<p className="text-black text-xl dark:text-white uppercase font-semibold underline decoration-solid">
					Agregar Multimedia
				</p>
				<div className="grid">
					<p className="text-black text-xl dark:text-white font-medium">
						Vincular Color
					</p>
					<p className="mb-5 text-base text-gray-500 dark:text-gray-400 sm:text-sm">
						{" "}
						Aqui se agrega la imagen con el color correspondiente.
					</p>
					<div className="flex flex-wrap items-center justify-self-center m-3">
						<p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
							{" "}
							Paso1: Seleccione un color para subir la imagen
							correspondiente.
						</p>
						<p className="mb-1 text-sm text-left text-gray-500 dark:text-gray-400">
							Si no tiene algun Color puede Agregar uno nuevo
							pulsando{" "}
							<ModalText text="Aquí" title="Agregar Color">
								<AddColorMenu onUpdate={getColor} />
							</ModalText>
						</p>
						<Image
							src={imageColor ?? "/dummy.jpg"}
							alt="Imagen"
							width={128}
							height={128}
						/>
						<SelectC
							label="Seleccionar Color"
							optionDefaut="Seleccione un color"
							options={arraySelect}
							onChange={(value) => {
								let index = parseInt(value ?? "");
								if (
									(index &&
										index != -1 &&
										!Number.isNaN(index)) ||
									index === 0
								) {
									setIdColor(arrayData[index].id_color);
									showColorImage(
										arrayData[index].path_muestra
									);
								}
							}}
						/>
					</div>

					<p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
						{" "}
						Paso 2: Seleccione una imagen del item y luego pulse{" "}
						<strong className="underline decoration-sky-500">
							Agrege Color
						</strong>
					</p>
					<div className="flex justify-center">
						<Image
							src={image ?? "/dummy.jpg"}
							alt="Imagen"
							width={128}
							height={128}
						/>
					</div>
					<form className="max-w-lg mx-auto">
						<label
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							htmlFor="user_avatar"
						>
							Subir Imagen
						</label>
						<input
							className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
							aria-describedby="user_avatar_help"
							onChange={handleImageChange}
							type="file"
							ref={refInputImage}
						/>
						<div
							className="mt-1 text-sm text-gray-500 dark:text-gray-300"
							id="user_avatar_help"
						>
							Agregar la imagen
						</div>
					</form>
					{showAlert.show ? (
						<Alert
							color={showAlert.type}
							onDismiss={() => {
								setShowAlert({
									messagge: "",
									show: false,
									type: "failure",
								});
							}}
						>
							{showAlert.messagge}
						</Alert>
					) : (
						<></>
					)}
					<div className="flex justify-center mt-2">
						<Button
							disabled={isUploading}
							isProcessing={isUploading}
							color="success"
							onClick={postColor}
						>
							Agregar Color
						</Button>
					</div>
					<p className="text-black dark:text-white mt-3 font-bold">
						Agregar Modelo 3D
					</p>
					<p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
						{" "}
						Paso 3: Agregar un modelo 3d para mostrar el mueble
					</p>

					<input
						className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
						aria-describedby="user_avatar_help"
						onChange={handleModelImage3DChange}
						type="file"
						accept=".glb"
						ref={refInput3d}
					/>
					<div className="grid justify-items-center mt-3">
						<AddModel3D
							url3D={modelColor ?? "/estante.glb"}
							urlTexture={imageColor ?? "/dummy.jpg"}
						/>
						{show3DputAlert.show ? (
							<Alert
								color={show3DputAlert.type}
								onDismiss={() => {
									setShow3DputAlert({
										messagge: "",
										show: false,
										type: "failure",
									});
								}}
							>
								{show3DputAlert.messagge}
							</Alert>
						) : (
							<></>
						)}
						<Button
							color="success"
							className="mt-3"
							disabled={isUploading3D}
							isProcessing={isUploading3D}
							onClick={putModel3dHandle}
						>
							AGREGAR MODELO 3D
						</Button>
					</div>
				</div>
			</Card>
		</div>
	);
});

export default SecondCard;
