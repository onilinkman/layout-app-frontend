"use client";

import { useRef } from "react";

interface Props {
	label: string;
	optionDefaut: string;
	options: Array<JSX.Element>;
	onChange?: (value: string | undefined) => void;
}

const SelectC = (props: Props) => {
	const refSelect = useRef<HTMLSelectElement>(null);

	const getValue = () => {
		return refSelect.current?.value;
	};
	return (
		<div className="grid">
			<label
				htmlFor="countries"
				className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
			>
				{props.label}
			</label>
			<select
				ref={refSelect}
				onChange={() => {
					if (props?.onChange) {
						props.onChange(getValue());
					}
				}}
				id="countries"
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			>
				<option defaultValue={-1}>{props.optionDefaut}</option>
				{props.options}
			</select>
		</div>
	);
};

export default SelectC;
