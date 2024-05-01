"use client";

import * as React from "react";
import {
	CaretSortIcon,
	CheckIcon,
	ChevronDownIcon,
	MagnifyingGlassIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { it } from "node:test";
import { useEventsContext } from "@/app/hooks/useEventsHooks";

export function TableHeaderSelectFilters({
	title,
	data,
}: {
	title: string;
	data: string[] | null[];
}) {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState("");
	const [selectedName, setSelectedName] = React.useState<string[]>([]);

	const filteredData =
		value !== ""
			? data?.filter((item) =>
					item?.toLowerCase().includes(value.toLowerCase())
			  )
			: data;
	const { handleCheckChange } = useEventsContext();
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-auto justify-between  bg-custom-blue text-white font-normal text-sm px-2 py-1 rounded-md flex items-center space-x-1"
				>
					{title}
					<ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto max-h-[300px] overflow-auto p-0">
				<Command>
					<div className="flex w-full items-center space-x-2 pt-2 px-3">
						<div className="relative">
							<Input
								type="text"
								placeholder={`Search ${title}`}
								value={value}
								onChange={(e) => setValue(e.target.value)}
								className="pr-10 w-auto" // Add padding to prevent the text from going under the icon
							/>
							<span className="absolute inset-y-0 right-0 pr-3 flex items-center">
								<MagnifyingGlassIcon className="w-5 h-5" />
							</span>
						</div>
					</div>
					{/* <CommandEmpty>No framework found.</CommandEmpty> */}
					<CommandGroup>
						{filteredData
							?.filter(
								(item, index, self) =>
									item !== null &&
									typeof item === "string" &&
									self.indexOf(item) === index
							)
							.map((item, index) => (
								<div
									className="flex items-center px-2 space-x-2 py-2"
									key={index}
								>
									<input
										className=""
										type="checkbox"
										id={`${item}`}
										onChange={(e) => handleCheckChange(title, e)}
									/>
									<label
										htmlFor={`${item}`}
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-custom-yellow"
									>
										{item}
									</label>
								</div>
							))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
