"use client";
import ModalText from "@/components/ModalText/ModalText";
import { Button, Card, Carousel, Dropdown } from "flowbite-react";
import Image from "next/image";
import {
	ChangeEvent,
	forwardRef,
	useImperativeHandle,
	useRef,
	useState,
} from "react";

export type SecondCardHandle = {
	hiddenDiv: () => void;
	showDiv: () => void;
};

interface Props {}

const SecondCard = forwardRef<SecondCardHandle, Props>(function SecondCard(
	props: Props,
	ref
) {
	const [image, setImage] = useState<string | null>(null);
	const refDiv = useRef<HTMLDivElement>(null);
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

	useImperativeHandle(ref, () => {
		return {
			hiddenDiv,
			showDiv,
		};
	});
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
								<div>hola</div>
							</ModalText>
						</p>
						<Image
							src={image ?? "/dummy.jpg"}
							alt="Imagen"
							width={128}
							height={128}
						/>
						<Dropdown
							dismissOnClick={false}
							label="Seleccione Color"
							className="h-16"
						>
							<Dropdown.Item>Vainilla</Dropdown.Item>
						</Dropdown>
					</div>

					<p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
						{" "}
						Paso 2: Seleccione una imagen del item y luego pulse{" "}
						<strong className="underline decoration-sky-500">
							Agrege Color
						</strong>
					</p>

					<div className="h-32 sm:h-40 xl:h-52 2xl:h-60">
						<Carousel>
							<Image
								src={image ?? "/dummy.jpg"}
								alt="Imagen"
								width={128}
								height={128}
							/>
						</Carousel>
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
						/>
						<div
							className="mt-1 text-sm text-gray-500 dark:text-gray-300"
							id="user_avatar_help"
						>
							La imagen principal que se mostrara
						</div>
					</form>
					<div className="flex justify-center mt-2">
						<Button color="success">Agregar Color</Button>
					</div>
				</div>
			</Card>
		</div>
	);
});

export default SecondCard;
