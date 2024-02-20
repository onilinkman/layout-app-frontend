"use client";
import Image from "next/image";
import InputLabelFloat, { InputLableFloatHandle } from "./inputLabelFloat";
import { ChangeEvent, useRef, useState } from "react";
import { Button } from "flowbite-react";
import { PathAPI, PostAddColor } from "@/pages/repo/ApiPath";

interface Props {
	onUpdate?: () => void;
}

const AddColorMenu = (props: Props) => {
	const [image, setImage] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const refName = useRef<InputLableFloatHandle>(null);
	const refFileInput = useRef<HTMLInputElement>(null);

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

	const PostColor = () => {
		if (
			refName.current?.isValid() &&
			image != null &&
			refFileInput.current?.files
		) {
			var formData = new FormData();
			formData.append("nombre", refName.current?.getValue());
			formData.append("img", refFileInput.current?.files[0]);

			var requestOptions = {
				method: "POST",
				body: formData,
				headers: {
					Accept: "*/*",
				},
			};
			setLoading(true);
			fetch(PathAPI + PostAddColor, requestOptions)
				.then((res) => res.json())
				.then((data: any) => {
					if (props?.onUpdate) {
						props.onUpdate();
					}
					clearData();
				})
				.catch((err: any) => {
					console.log(err);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	};

	const clearData = () => {
		refName.current?.setValue("");
		setImage(null);
	};

	return (
		<>
			<h2 className="text-black dark:text-white text-center font-semibold text-2xl">
				Agregar Color
			</h2>
			<div className="grid justify-center">
				<InputLabelFloat
					title="Nombre del Color"
					type="text"
					ref={refName}
				/>
				<p className="text-black dark:text-white text-center">
					Selecciona una imagen
				</p>
				<Image
					className=" m-auto"
					src={image ?? "/dummy.jpg"}
					width={180}
					height={180}
					alt="imagen color"
				/>
				<form className="max-w-lg mx-auto">
					<input
						className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
						aria-describedby="user_avatar_help"
						onChange={handleImageChange}
						type="file"
						accept="image/png, image/jpg, image/jpeg"
						ref={refFileInput}
					/>
					<div className="w-full grid mt-3">
						<Button
							onClick={PostColor}
							color="success"
							isProcessing={loading}
							disabled={loading}
						>
							Agregar imagen
						</Button>
					</div>
				</form>
			</div>
		</>
	);
};

export default AddColorMenu;
