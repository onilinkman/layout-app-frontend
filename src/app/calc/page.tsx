"use client";

import FrontPages from "@/assets/3d_objects/FrontPages";
import DescriptionMain from "./DescriptionMain";

export default function Calc() {
	return (
		<div className="relative">
			<DescriptionMain />
			<div className="h-[calc(100vh-60px)] w-screen absolute right-0">

				<FrontPages/>
			</div>
		</div>
	);
}
