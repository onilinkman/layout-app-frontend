import ModalModel from "@/components/ModalModel/ModalModel";
import Model3D from "@/components/Model3D/Model3D";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

interface Props {
	url3D: string;
	urlTexture: string;
}

const AddModel3D = (props:Props) => {
	return (
		<div>
			<ModalModel textBtn="Ver Modelo 3D">
				<Canvas style={{ height: "100vh" }}>
				<PerspectiveCamera manual />
				<ambientLight intensity={Math.PI / 2} />
				<spotLight
					position={[10, 30, 10]}
					angle={0.15}
					penumbra={1}
					decay={0}
					intensity={Math.PI}
				/>
				<pointLight
					position={[-10, -10, -10]}
					decay={0}
					intensity={Math.PI}
				/>
				<Model3D
					url3D={props.url3D}
					urlTexture={props.urlTexture}
				/>
				<OrbitControls
					minPolarAngle={0}
					maxPolarAngle={Math.PI *2}
				/>
			</Canvas>
			</ModalModel>
		</div>
	);
};

export default AddModel3D;
