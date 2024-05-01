"use client";
import React, { createContext, useContext } from "react";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";

interface CheckedItems {
	Name: string[];
	"Mobile Number": string[];
	"Verification Status": string[];
	"Email Address": string[];
	Domain: string[];
	Status: string[];
	// Add more properties as needed
}

interface EventsContextProps {
	// Define the properties of your context here
	entries: number;
	setEntries: React.Dispatch<React.SetStateAction<number>>;
	checkedItems: CheckedItems;
	setCheckedItems: React.Dispatch<React.SetStateAction<CheckedItems>>;
	handleCheckChange: (
		title: string,
		event: React.ChangeEvent<HTMLInputElement>
	) => void;
	handleClearAllFilter: () => void;
	date: DateRange | undefined;
	handleEvent: (selectedDate: DateRange | undefined) => void;
	setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}

export const EventsContext = createContext<EventsContextProps | undefined>(
	undefined
);

export const EventsContextProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [checkedItems, setCheckedItems] = React.useState<CheckedItems>({
		Name: [],
		"Mobile Number": [],
		"Verification Status": [],
		"Email Address": [],
		Domain: [],
		Status: [],

		// Add more properties as needed
	});
	const [entries, setEntries] = React.useState(10);
	const [date, setDate] = React.useState<DateRange | undefined>(undefined);

	const handleEvent = (selectedDate: DateRange | undefined) => {
		setDate(selectedDate);
		// Add your event handling logic here
	};

	const handleCheckChange = (
		title: string,
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const { id, checked } = event.target;

		setCheckedItems((prevCheckedItems: CheckedItems) => {
			// Add a type guard to check if title is a key of CheckedItems
			if (checked && title in prevCheckedItems) {
				return {
					...prevCheckedItems,
					[title as keyof CheckedItems]: [
						...prevCheckedItems[title as keyof CheckedItems],
						id,
					],
				};
			} else if (title in prevCheckedItems) {
				return {
					...prevCheckedItems,
					[title as keyof CheckedItems]: prevCheckedItems[
						title as keyof CheckedItems
					].filter((item) => item !== id),
				};
			}
			// Return the previous state if title is not a key of CheckedItems
			return prevCheckedItems;
		});
	};

	const handleClearAllFilter = () => {
		setDate(undefined);
		setCheckedItems({
			Name: [],
			"Mobile Number": [],
			"Verification Status": [],
			"Email Address": [],
			Domain: [],
			Status: [],
		} as CheckedItems);
	};
	const value = {
		entries,
		setEntries,
		checkedItems,
		setCheckedItems,
		handleCheckChange,
		handleClearAllFilter,
		date,
		setDate,
		handleEvent,
		// Define the values of your context here
	};

	return (
		<EventsContext.Provider value={value}>{children}</EventsContext.Provider>
	);
};
