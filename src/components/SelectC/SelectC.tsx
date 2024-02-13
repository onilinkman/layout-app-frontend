"use client";

interface Props {
	label: string;
	optionDefaut: string;
	options: Array<JSX.Element>;
}

const SelectC = (props: Props) => {
	return (
		<div className="grid">
			<label
				htmlFor="countries"
				className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
			>
				{props.label}
			</label>
			<select
				id="countries"
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			>
				<option defaultValue={0}>{props.optionDefaut}</option>
				{props.options}
			</select>
		</div>
	);
};

export default SelectC;
