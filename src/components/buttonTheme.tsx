"use client";
import { useEffect, useState } from "react";
import { CiSun, CiDark } from "react-icons/ci";

const ButtonTheme = () => {
	interface theme {
		theme: "dark" | "light" | string;
	}
	const [mode, setMode] = useState<theme>({
		theme: "light",
	});

	const readTheme = () => {
		const localTheme: string | null = localStorage.getItem("theme");
		if (localTheme === null) {
			document.documentElement.setAttribute("data-mode", "light");
			setMode({ theme: "light" });
		} else {
			setMode({ theme: localTheme });
			document.documentElement.setAttribute("data-mode", localTheme);
		}
	};

	const onClick = () => {
		const localTheme: string | null = localStorage.getItem("theme");
		if (localTheme === "light") {
			document.documentElement.removeAttribute("data-mode");
			document.documentElement.setAttribute("data-mode", "dark");
			setMode({ theme: "dark" });
			localStorage.setItem("theme", "dark");
		} else {
			document.documentElement.removeAttribute("data-mode");
			document.documentElement.setAttribute("data-mode", "light");
			setMode({ theme: "light" });
			localStorage.setItem("theme", "light");
		}
	};

	useEffect(() => {
		readTheme();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return mode.theme == "dark" ? (
		<CiSun
			className="border rounded cursor-pointer border-transparent hover:border-white  max-md:w-full"
			onClick={onClick}
			size={30}
			color={"#ffffff"}
		/>
	) : (
		<CiDark
			className="border rounded cursor-pointer hover:border-black max-md:w-full"
			onClick={onClick}
			size={30}
			color={"#000000"}
		/>
	);
};

export default ButtonTheme;
