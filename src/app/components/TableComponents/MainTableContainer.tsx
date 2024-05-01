"use client";
import React from "react";
import { TableComponent } from "./TableComponent";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import request from "graphql-request";

import { fetchMembersData } from "@/services/GraphqlHelpers";
import {
	DataNodeProps,
	MembersDataProps,
} from "@/app/interface/TableComponentProps";
import { useEventsContext } from "@/app/hooks/useEventsHooks";
import { getMemberProperty } from "@/app/utils/FilteringLogic";

const MainTableContainer = () => {
	const { checkedItems, entries, date } = useEventsContext();
	const {
		data,
		isLoading,
		error,
	}: { data?: MembersDataProps; isLoading: boolean; error: any } = useQuery({
		queryKey: ["all-members-data", entries],
		queryFn: async () => fetchMembersData({ first: entries }),
		enabled: !!entries,
		placeholderData: keepPreviousData,
	});

	const membersEdges = data?.members?.edges ?? [];
	const filteredMembersEdges = membersEdges.filter((member) => {
		// Check if the member properties match the checked items
		const matchesCheckedItems = Object.entries(checkedItems).every(
			([key, values]) =>
				values.length === 0
					? true
					: values.includes(getMemberProperty(key, member))
		);

		// If a date range has been selected, check if the member's dateTimeCreated and dateTimeLastActive fall within this range
		const matchesDateRange =
			date?.from && date?.to
				? new Date(member.node.dateTimeCreated) >= date.from &&
				  new Date(member.node.dateTimeLastActive) <= date.to
				: true;

		// Return true if the member matches both the checked items and the date range
		return matchesCheckedItems && matchesDateRange;
	});

	if (isLoading) {
		return <div className="flex justify-center">Fetching data...</div>;
	}

	if (error) {
		throw new Error(error.message);
	}
	return (
		<div className="flex items-center justify-center py-5">
			<div className="max-w-screen-2xl">
				<TableComponent
					filteredMembersEdges={filteredMembersEdges}
					data={membersEdges}
				/>
			</div>
		</div>
	);
};

export default MainTableContainer;
