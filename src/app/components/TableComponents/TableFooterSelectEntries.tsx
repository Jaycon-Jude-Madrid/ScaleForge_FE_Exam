import * as React from "react";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useEventsContext } from "@/app/hooks/useEventsHooks";

export function TableFooterSelectEntries() {
	const { setEntries, entries } = useEventsContext();

	const handleSelectChange = (value: string) => {
		// Convert the value to a number and set it
		setEntries(Number(value));
	};

	// Create an array of numbers from 5 to 50 in increments of 5
	const options = Array.from({ length: 5 }, (_, i) => (i + 1) * 5);

	return (
		<Select onValueChange={handleSelectChange}>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Entries" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{options.map((option) => (
						<SelectItem key={option} value={`${option}`}>
							{option}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
