export function formatDate(dateString: string): string {
	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	};
	const date = new Date(dateString);
	return date
		.toLocaleString("en-US", options)
		.replace(",", "")
		.replace("AM", "am")
		.replace("PM", "pm");
}
