"use client";

import {
	Float,
	Gltf,
	OrbitControls,
	PerspectiveCamera,
	Scroll,
	ScrollControls,
	useScroll,
} from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Mesh, TextureLoader, Camera, Euler } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

function Box(props: any) {
	// This reference gives us direct access to the THREE.Mesh object
	const scroll = useScroll();
	const ref = useRef<Mesh>(null!);
	const { scene } = useLoader(GLTFLoader, "/Estante1.glb");
	// Hold state for hovered and clicked events
	const [hovered, hover] = useState(false);
	const [clicked, click] = useState(false);
	const colorMap = useLoader(TextureLoader, "Textura_estante.jpg");
	

	// Subscribe this component to the render-loop, rotate the mesh every frame
	//const n: number = 3; //range position for x

	useFrame((state, delta) => {
		const r1 = scroll.range(0, 1);
		/* const leftR = scroll.range(0, 1);
		ref.current.position.x = -leftR * 2 * n + n; */
		//console.log(leftR)
		//ref.current.translateX(ref.current.position.x - leftR);
		//if (typeof ref?.current !== "undefined" && clicked) {
		return (ref.current.rotation.y = ((-Math.PI * 3) / 1.45) * r1);
		//}
	});

	// Return the view, these are regular Threejs elements expressed in JSX
	return (
		<Float
			speed={1} // Animation speed, defaults to 1
			rotationIntensity={1} // XYZ rotation intensity, defaults to 1
			floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
			floatingRange={[1, 1.2]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
		>
			<mesh
				{...props}
				ref={ref}
				scale={clicked ? 2 : 2}
				onClick={(event) => click(!clicked)}
				onPointerOver={(event) => (
					event.stopPropagation(), hover(true)
				)}
				onPointerOut={(event) => hover(false)}
			>
				{/* <boxGeometry args={[1, 1, 1]} /> */}
				<primitive
					object={scene}
					receiveShadow
					castShadow
					rotation={[0, -1.3, 0]}
				/>
				<meshStandardMaterial map={colorMap} />
			</mesh>
		</Float>
	);
}

const FrontPages = () => {
	return (
		<Canvas>
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

			<ScrollControls pages={3}>
				{/* <Scroll> */}
				<Box position={[0, -2.5, 0]} />
				{/* </Scroll> */}
				<Scroll html>
					<div className="relative h-screen w-screen">
						<div className="absolute" style={{ top: 44 }}>
							<h1 className=" text-black dark:text-white">
								html in here (optional)
							</h1>
						</div>
						<h1 className="text-black dark:text-white absolute bottom-0">
							second page
						</h1>
						{/* <h1 style={{ top: "200vh" }}>third page</h1> */}
					</div>
				</Scroll>
			</ScrollControls>
			{/* <OrbitControls /> */}
		</Canvas>
	);
};

export default FrontPages;
