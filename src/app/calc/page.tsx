"use client";

import FrontPages from "@/assets/3d_objects/FrontPages";
import DescriptionMain from "./DescriptionMain";

export default function Calc() {
	return (
		<div className="relative">
			<DescriptionMain />
			<div className="h-[300px] w-6/12 absolute right-0">

				<FrontPages/>
			</div>
		</div>
	);
}
