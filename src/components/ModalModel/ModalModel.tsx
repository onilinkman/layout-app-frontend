"use client";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";

interface Props {
	children: React.ReactNode;
}

const ModalModel = (props: Props) => {
	const [openModal, setOpenModal] = useState(false);
	return (
		<>
			<Button color="gray" onClick={() => setOpenModal(true)}>
				Toggle modal
			</Button>
			<Modal
				show={openModal}
				size={"7xl"}
				onClose={() => setOpenModal(false)}
			>
				<Modal.Header>Small modal</Modal.Header>
				<Modal.Body>{props.children}</Modal.Body>
				<Modal.Footer>
					<Button onClick={() => setOpenModal(false)}>
						I accept
					</Button>
					<Button color="gray" onClick={() => setOpenModal(false)}>
						Decline
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ModalModel;
