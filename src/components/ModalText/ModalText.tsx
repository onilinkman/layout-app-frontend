"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";

interface Props {
	children: React.ReactNode;
	title: string;
	text: string;
}

const ModalText = (props:Props) => {
	const [openModal, setOpenModal] = useState(false);
	return (
		<>
			<strong className="cursor-pointer text-black dark:text-white" onClick={() => setOpenModal(true)}>{props.text}</strong>
			<Modal
				dismissible
				show={openModal}
				onClose={() => setOpenModal(false)}
			>
				<Modal.Header>{props.title}</Modal.Header>
				<Modal.Body>
					<div className="space-y-6">
						{props.children}
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button color="gray" onClick={() => setOpenModal(false)}>
						Cerrar
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ModalText;
