"use client";

import InputLabelFloat, {
	InputLableFloatHandle,
} from "@/components/inputLabelFloat";
import { PathAPI, PostMueble } from "@/pages/repo/ApiPath";
import { Alert, Button, Card } from "flowbite-react";
import { useRef, useState } from "react";

interface Props {
	HandleMoveCard: (id_mueble: number) => void;
}

interface Mueble {
	nombre: string;
	description: string;
	precio: number;
	medidas: string;
}

interface MessaggeAlert {
	show: boolean;
	type: string;
	messagge: string;
}

const CardAdd = (props: Props) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [msgAlert, setMsgAlert] = useState<MessaggeAlert>({
		show: false,
		type: "failure",
		messagge: "",
	});

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
		if (
			refNombre.current?.isValid() &&
			refDescription.current?.isValid() &&
			refMedidas.current?.isValid() &&
			refPrecio.current?.getValue()
		) {
			setIsLoading(true);
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
					nextAnimation(data.body.id_mueble);
				})
				.catch((err: Error) => {
					setMsgAlert({
						show: true,
						type: "failure",
						messagge: "Error: " + err.message,
					});
				})
				.finally(() => {
					setIsLoading(false);
				});
		} else {
			setMsgAlert({
				show: true,
				type: "failure",
				messagge: "Debe llenar todos los campos",
			});
		}
	};

	const nextAnimation = (id_mueble: number) => {
		refCard.current?.classList.remove("-translate-x-[calc(100vh+574px)]");
		refCard.current?.classList.remove("hidden");
		refCard.current?.classList.add("-translate-x-[calc(100vh+574px)]");
		refCard.current?.classList.add("hidden");
		props.HandleMoveCard(id_mueble);
	};

	return (
		<div ref={refCard} className="transition duration-500">
			<Card className="max-w-sm m-auto justify-center" horizontal>
				<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					Agregar Item
				</h5>

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
				{msgAlert.show ? (
					<Alert
						color={msgAlert.type}
						onDismiss={() =>
							setMsgAlert({
								show: false,
								messagge: "",
								type: "success",
							})
						}
					>
						<span className="font-medium">{msgAlert.messagge}</span>
					</Alert>
				) : (
					<></>
				)}
				<div className="w-full justify-center flex">
					<Button
						onClick={postData}
						isProcessing={isLoading}
						disabled={isLoading}
					>
						Siguiente
					</Button>
				</div>
			</Card>
		</div>
	);
};

export default CardAdd;
