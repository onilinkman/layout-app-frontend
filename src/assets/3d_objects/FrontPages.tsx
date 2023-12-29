"use client";

import { Gltf, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

function Box(props: any) {
	// This reference gives us direct access to the THREE.Mesh object
	const ref: any = useRef();
	// Hold state for hovered and clicked events
	const [hovered, hover] = useState(false);
	const [clicked, click] = useState(false);
	// Subscribe this component to the render-loop, rotate the mesh every frame

	useFrame((state, delta) => {
		if (typeof ref?.current !== "undefined" && clicked) {
			return (ref.current.rotation.y += delta/3);
		}
	});
	// Return the view, these are regular Threejs elements expressed in JSX
	return (
		<mesh
			{...props}
			ref={ref}
			scale={clicked ? 1.2 : 1.2}
			onClick={(event) => click(!clicked)}
			onPointerOver={(event) => (event.stopPropagation(), hover(true))}
			onPointerOut={(event) => hover(false)}
		>
			{/* <boxGeometry args={[1, 1, 1]} /> */}
			<Gltf src="/tocador.glb" receiveShadow castShadow />
			<meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
		</mesh>
	);
}

const FrontPages = () => {
	return (
		<Canvas>
			<PerspectiveCamera  manual/>
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
			
			<Box position={[0, -1.5, 0]} />
			<OrbitControls />
		</Canvas>
	);
};

export default FrontPages;
