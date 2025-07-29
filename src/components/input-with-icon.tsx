import { forwardRef, useId } from "react";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "./ui/textarea";

interface InputWithIconProps
	extends Omit<
		React.InputHTMLAttributes<HTMLInputElement>,
		"onChange" | "onBlur"
	> {
	label: string;
	placeholder: string;
	type: string;
	icon: React.ReactNode;
	name?: string;
	value?: string;
	isTextarea?: boolean;
	rows?: number;
	onChange?: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => void;
	onBlur?: (
		e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => void;
}

const InputWithIcon = forwardRef<
	HTMLInputElement | HTMLTextAreaElement,
	InputWithIconProps
>(
	(
		{
			label,
			placeholder,
			type,
			icon,
			value,
			onChange,
			onBlur,
			name,
			isTextarea,
			rows,
			...props
		},
		ref,
	) => {
		const id = useId();
		return (
			<div className="*:not-first:mt-2">
				<Label htmlFor={id}>{label}</Label>
				<div className="relative">
					{isTextarea ? (
						<Textarea
							id={id}
							className="peer pr-9 pl-10"
							placeholder={placeholder}
							ref={ref as React.ForwardedRef<HTMLTextAreaElement>}
							value={value}
							onChange={
								onChange as React.ChangeEventHandler<HTMLTextAreaElement>
							}
							onBlur={onBlur as React.FocusEventHandler<HTMLTextAreaElement>}
							name={name}
							rows={rows}
							{...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
						/>
					) : (
						<Input
							id={id}
							className="peer pr-9 pl-10"
							placeholder={placeholder}
							type={type}
							ref={ref as React.ForwardedRef<HTMLInputElement>}
							value={value}
							onChange={onChange}
							onBlur={onBlur}
							name={name}
							{...props}
						/>
					)}
					<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 text-muted-foreground/80 peer-disabled:opacity-50">
						{icon}
					</div>
				</div>
			</div>
		);
	},
);

InputWithIcon.displayName = "InputWithIcon";

export default InputWithIcon;
