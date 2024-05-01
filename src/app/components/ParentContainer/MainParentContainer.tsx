import React from "react";
import MainTableContainer from "../TableComponents/MainTableContainer";
import { fetchMembersData } from "@/services/GraphqlHelpers";

const MainParentContainer = async () => {
	return (
		<div className="grid grid-cols-12 items-center justify-center min-h-screen">
			<div className="col-span-12 text-center">
				<MainTableContainer />
			</div>
		</div>
	);
};

export default MainParentContainer;
