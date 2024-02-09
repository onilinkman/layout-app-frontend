"use client";

import InputLabelFloat, {
	InputLableFloatHandle,
} from "@/components/inputLabelFloat";
import { PathAPI, PostMueble } from "@/pages/repo/ApiPath";
import { Button, Card } from "flowbite-react";
import { useRef } from "react";

interface Props {
	HandleMoveCard: (id_mueble: number) => void;
}

interface Mueble {
	nombre: string;
	description: string;
	precio: number;
	medidas: string;
}

const CardAdd = (props: Props) => {
	//const [image, setImage] = useState<string | null>(null);
	/* const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImage(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	}; */
	const refNombre = useRef<InputLableFloatHandle>(null);
	const refDescription = useRef<InputLableFloatHandle>(null);
	const refPrecio = useRef<InputLableFloatHandle>(null);
	const refMedidas = useRef<InputLableFloatHandle>(null);

	const refCard = useRef<HTMLDivElement>(null);

	const getDataInputs: () => Mueble = () => {
		let m: Mueble = {
			nombre: refNombre.current?.getValue() ?? "",
			description: refDescription.current?.getValue() ?? "",
			medidas: refMedidas.current?.getValue() ?? "",
			precio: parseFloat(refPrecio.current?.getValue() ?? "") ?? 0,
		};
		return m;
	};
	const postData = () => {
		fetch(PathAPI + PostMueble, {
			method: "POST",
			headers: {
				Accept: "*/*",
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			},
			body: JSON.stringify(getDataInputs()),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
			})
			.catch((err) => {
				console.log(err);
			});
		nextAnimation(2);
	};

	const nextAnimation = (id_mueble: number) => {
		refCard.current?.classList.remove("-translate-x-[calc(100vh+574px)]");
		refCard.current?.classList.remove("hidden");
		refCard.current?.classList.add("-translate-x-[calc(100vh+574px)]");
		refCard.current?.classList.add("hidden");
		props.HandleMoveCard(id_mueble);
		console.log("Added", refCard.current);
	};

	return (
		<div ref={refCard} className="transition duration-500">
			<Card className="max-w-sm m-auto justify-center" horizontal>
				<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					Agregar Item
				</h5>
				{/* <form className="max-w-lg mx-auto">
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
			</form> */}
				<InputLabelFloat
					title="Nombre del Mueble"
					type="text"
					ref={refNombre}
				/>
				<InputLabelFloat
					title="Descripcion del Mueble"
					type="text"
					ref={refDescription}
				/>
				<InputLabelFloat
					title="Precio del mueble"
					type="number"
					ref={refPrecio}
				/>
				<InputLabelFloat
					title="Medidas del Mueble"
					type="text"
					ref={refMedidas}
				/>
				<div className="w-full justify-center flex">
					<Button onClick={()=>nextAnimation(2)}>Siguiente</Button>
				</div>
			</Card>
		</div>
	);
};

export default CardAdd;
