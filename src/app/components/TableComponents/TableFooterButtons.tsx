import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import React from "react";
import { TableFooterSelectEntries } from "./TableFooterSelectEntries";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

const TableFooterButtons = () => {
	return (
		<div className="flex justify-center items-center gap-3">
			<div>
				<TableFooterSelectEntries />
			</div>
			<div className="flex justify-center items-center gap-3">
				<Button variant="outline" disabled>
					<ArrowLeftIcon className="mr-2 h-5 w-5" /> Previous
				</Button>

				<Button variant="outline" disabled>
					Next <ArrowRightIcon className="ml-2 h-5 w-5" />
				</Button>
			</div>
		</div>
	);
};

export default TableFooterButtons;
