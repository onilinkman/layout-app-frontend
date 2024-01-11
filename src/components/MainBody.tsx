import Image from "next/image";

const MainBody = () => {
	return (
		<div>
			<h1 className="text-black text-3xl text-center dark:text-white mb-5 font-semibold">
				DecorMueble
			</h1>
			<div className="w-full grid justify-items-center md:flex md:items-center ">
				<p className="text-black dark:text-white">
					Muebles de calidad para tu hogar
				</p>
				<Image
					src="/escritorio-min.png"
					alt="tocador"
					width={350}
					height={55}
				/>
			</div>
			<div className="w-full grid justify-items-center md:flex md:items-center md:flex-row-reverse ">
				<div>
					<h3 className="text-black dark:text-white font-semibold font-mono mb-2">DISEÑOS PERSONALIZADOS</h3>
					<p className="text-black dark:text-white line-clamp-1">
						Diseñamos muebles a medida para todas sus necesidades.
					</p>
				</div>
				<Image
					src="/plano-min.png"
					alt="tocador"
					width={480}
					height={55}
				/>
			</div>
			<ul className=" h-full w-full">
				<li className="w-[60px] h-[60px] absolute bottom-0 bg-gray-300 rounded-2xl animate-[spin_3s_linear_infinite]"></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
		</div>
	);
};

export default MainBody;
