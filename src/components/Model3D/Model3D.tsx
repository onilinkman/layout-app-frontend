import { TextureLoader } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";

interface Props {
	url3D: string;
	urlTexture: string;
}

const Model3D = (props: Props) => {
	const gltf = useLoader(GLTFLoader, props.url3D);
	//const initialTexture=new TextureLoader().load("/textura_estante.png")
	gltf.scene.traverse((child: any) => {
		if (child.isMesh) {
			const material = child.material;
			const texture = new THREE.TextureLoader().load(props.urlTexture);
			material.map = texture;
			material.needsUpdate = true;
		}
	});

	return (
		<mesh>
			{/* <boxGeometry args={[1, 1, 1]} /> */}
			<primitive
				object={gltf.scene}
				receiveShadow
				castShadow
				rotation={[0, -1.3, 0]}
			/>
			<meshStandardMaterial />
		</mesh>
	);
};

export default Model3D;
