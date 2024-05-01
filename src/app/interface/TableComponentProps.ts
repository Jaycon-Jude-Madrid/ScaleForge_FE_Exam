export interface TableHeaderSelectFiltersProps {
	title: string;
	items: string[];
}

type Node = {
	id: string;
	name: string;
	verificationStatus: string;
	emailAddress: string | null;
	mobileNumber: string;
	domain: string | null;
	dateTimeCreated: string;
	dateTimeLastActive: string;
	status: string;
};

export type DataNodeProps = {
	node: Node;
};

interface EdgeProps {
	node: Node;
}

interface MembersProps {
	edges: EdgeProps[];
}

export interface MembersDataProps {
	members: MembersProps;
}

type PageInfo = {
	hasNextPage: boolean;
	endCursor: string;
};

type MemberEdge = {
	node: DataNodeProps[];
};

export type MembersData = {
	members: {
		edges: MemberEdge[];
		pageInfo: PageInfo;
	};
};
