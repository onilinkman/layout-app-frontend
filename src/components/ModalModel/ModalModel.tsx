"use client";
import { Button, Modal } from "flowbite-react";
import { ReactNode, useState } from "react";

interface Props {
	children: React.ReactNode;
	title?: string;
	textBtn?: string;
	txtBtnAccept?: string;
	txtBtnDecline?: string;
	btnShowModal?: ReactNode;
}

const ModalModel = (props: Props) => {
	const [openModal, setOpenModal] = useState(false);
	return (
		<>
			{props.btnShowModal ? (
				<div onClick={() => setOpenModal(true)}>
					{props.btnShowModal}
				</div>
			) : (
				<Button color="gray" onClick={() => setOpenModal(true)}>
					{props.textBtn ?? "Ventana"}
				</Button>
			)}
			<Modal
				show={openModal}
				size={"7xl"}
				onClose={() => setOpenModal(false)}
			>
				<Modal.Header>{props.title}</Modal.Header>
				<Modal.Body>{props.children}</Modal.Body>
				<Modal.Footer>
					{props.txtBtnAccept ? (
						<Button onClick={() => setOpenModal(false)}>
							{props.txtBtnAccept ?? "Aceptar"}
						</Button>
					) : (
						<></>
					)}
					<Button color="gray" onClick={() => setOpenModal(false)}>
						{props.txtBtnDecline ?? "Cerrar"}
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ModalModel;
