"use client";

import {
	ComponentProps,
	ForwardedRef,
	forwardRef,
	useImperativeHandle,
	useRef,
} from "react";

interface Props {
	type: string;
	title: string;
}

export type InputLableFloatHandle = {
	getValue: () => string;
};

const InputLabelFloat = forwardRef<InputLableFloatHandle, Props>(
	function InputLabelFloat(props: Props, ref) {
		const refInput = useRef<HTMLInputElement>(null);
		const getValue: () => string = () => {
			return refInput.current?.value ?? "";
		};
		useImperativeHandle(ref, () => {
			return {
				getValue,
			};
		});
		return (
			<div className="relative text-left z-0 w-full mb-5 group">
				<input
					type={props.type ?? "text"}
					className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
					placeholder=" "
					ref={refInput}
					required
				/>
				<label
					htmlFor="floating_email"
					className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
				>
					{props.title}
				</label>
			</div>
		);
	}
);

export default InputLabelFloat;
