import { EventsContext } from "@/providers/EventsContextProviders";
import { useContext } from "react";

export function useEventsContext() {
	const context = useContext(EventsContext);
	if (!context) {
		throw new Error(
			"useEventsContext must be used within a EventsContextProvider"
		);
	}
	return context;
}
