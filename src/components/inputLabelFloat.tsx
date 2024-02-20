"use client";

import { FloatingLabel } from "flowbite-react";
import {
	ComponentProps,
	ForwardedRef,
	forwardRef,
	useImperativeHandle,
	useRef,
	useState,
} from "react";

interface Props {
	type: string;
	title: string;
	patron?: RegExp;
}

export type InputLableFloatHandle = {
	getValue: () => string;
	isValid: () => boolean;
	setValue: (value: string) => void;
};

const InputLabelFloat = forwardRef<InputLableFloatHandle, Props>(
	function InputLabelFloat(props: Props, ref) {
		const refInput = useRef<HTMLInputElement>(null);
		const [isInvalid, setIsInvalid] = useState(false);
		const [val, setVal] = useState("");

		const getValue: () => string = () => {
			return refInput.current?.value ?? "";
		};
		const isValid: () => boolean = () => {
			let result: boolean = props.patron
				? props.patron.test(getValue())
				: getValue() !== "";
			setIsInvalid(!result);
			return result;
		};

		const setValue = (value: string) => {
			setVal(value);
		};

		useImperativeHandle(ref, () => {
			return {
				getValue,
				isValid,
				setValue,
			};
		});

		const handleInputChange = (event: any) => {
			setVal(event.target.value);
		};
		return (
			<div className="relative text-left z-0 w-full mb-5 group">
				<FloatingLabel
					variant="standard"
					type={props.type ?? "text"}
					ref={refInput}
					value={val}
					onChange={handleInputChange}
					label={props.title}
					color={isInvalid ? "error" : "default"}
				/>
			</div>
		);
	}
);

export default InputLabelFloat;
