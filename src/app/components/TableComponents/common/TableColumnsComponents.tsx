import { Badge } from "@/components/ui/badge";
import {
	DotFilledIcon,
	CheckCircledIcon,
	CircleBackslashIcon,
	MinusIcon,
	MinusCircledIcon,
} from "@radix-ui/react-icons";

interface StatusColorsProps {
	active: string;
	blacklisted: string;
	disabled: string;
}
interface VerificationStatusColorsProps {
	verified: string;
	unverified: string;
	pending: string;
}

const Verification_Status_colors: VerificationStatusColorsProps = {
	verified: "green",
	unverified: "red",
	pending: "orange",
};

const Status_colors: StatusColorsProps = {
	active: "#75E0A7",
	blacklisted: "#FDA29B",
	disabled: "#CECFD2",
};
const Status_colors_background: any = {
	active: "#053321",
	blacklisted: "#912018",
	disabled: "#161B26",
};

const Status_Icon = {
	active: <CheckCircledIcon />,
	blacklisted: <CircleBackslashIcon />,
	disabled: <MinusCircledIcon />,
};
const capitalizedStatus = (status: string) => {
	return status.charAt(0).toUpperCase() + status.slice(1);
};
const VerificationStatusBadge = ({ status }: { status: string }) => {
	const color =
		Verification_Status_colors[
			status as keyof typeof Verification_Status_colors
		];

	return (
		<Badge
			style={{
				color,
				border: `1px solid ${color}`,
				borderRadius: "10px",
			}}
			className="flex justify-center gap-1 items-center"
			variant={"outline"}
		>
			<DotFilledIcon className={`text-${color}`} />
			{capitalizedStatus(status)}
		</Badge>
	);
};

const StatusBadge = ({ status }: { status: string }) => {
	const color = Status_colors[status as keyof typeof Status_colors];
	const bgColor =
		Status_colors_background[status as keyof typeof Status_colors_background];

	const icon = Status_Icon[status as keyof typeof Status_Icon];
	if (!color) {
		return null;
	}

	return (
		<Badge
			style={{
				color,
				background: bgColor,
				border: `1px solid ${color}`,
				borderRadius: "10px",
			}}
			className="flex justify-center gap-1"
		>
			{icon}
			{capitalizedStatus(status)}
		</Badge>
	);
};
export { VerificationStatusBadge, StatusBadge };
