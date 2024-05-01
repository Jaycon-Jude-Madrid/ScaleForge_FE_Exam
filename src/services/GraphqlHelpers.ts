import { MembersData } from "@/app/interface/TableComponentProps";
import { GraphQLClient } from "graphql-request";

declare var process: {
	env: {
		NEXT_PUBLIC_API_URL: string;
		NEXT_PUBLIC_HEADERS_TOKEN: string;
	};
};

export async function fetchMembersData({
	first,
	after,
}: {
	first: number;
	after?: string;
}): Promise<MembersData> {
	try {
		const client = new GraphQLClient(process.env.NEXT_PUBLIC_API_URL, {
			headers: {
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_HEADERS_TOKEN}`,
			},
		});

		const query = `
    query FetchMembers($first: Int, $after: Cursor, $filter: MemberFilterInput) {
      members(first: $first, after: $after, filter: $filter) {
        edges {
          node {
            id
            ... on Member {
              name
              verificationStatus
              emailAddress
              mobileNumber
              domain
              dateTimeCreated
              dateTimeLastActive
              status
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `;
		return client.request(query, { first, after });
	} catch (e: any) {
		throw new Error(e);
	}
}

export async function getQueryName(variables: { search: string }) {
	const client = new GraphQLClient(process.env.NEXT_PUBLIC_API_URL, {
		headers: {
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_HEADERS_TOKEN}`,
		},
	});

	const query = `
      query ($search: String!) {
        membersByName(search: $search, first: 20) {
            id,
            name,
            verificationStatus,
            emailAddress,
            mobileNumber,
            domain,
            dateTimeCreated,
            dateTimeLastActive,
            status
        }
      }
    `;

	return client.request(query, variables);
}
