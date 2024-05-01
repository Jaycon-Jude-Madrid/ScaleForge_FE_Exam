import { MembersData } from "@/app/interface/TableComponentProps";
import { GraphQLClient } from "graphql-request";

declare var process: {
	env: {
		NEXT_PUBLIC_API_URL: string;
		NEXT_PUBLIC_HEADERS_TOKEN: string;
	};
};

//I didnt use the ENV it might crash the app since it will be ignored in the git
const URL = "https://report.development.opexa.io/graphql";
const TOKEN =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjakp0ZFdQaGhkUHlYU25SdSIsInJvbGUiOiJBRE1JTiIsImp0aSI6ImE4MjFlYjM1Y2NmZjI0NjAwNjI0ZGFjYSIsImlwQWRkcmVzcyI6IjE0My40NC4xOTIuMTA3IiwibG9jYXRpb24iOiJDYWdheWFuIGRlIE9ybywgUGhpbGlwcGluZXMiLCJwbGF0Zm9ybSI6IjEydXd1UkNjWXAxY1dpWHpQWSIsImlhcCI6IjIwMjQtMDQtMjRUMDA6MTc6MjAuMDI4KzAwOjAwIiwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxMzkxNzg3MCwiZXhwIjoxNzc2OTg5ODcwfQ.UfB36fjFrYvg8TV9VYEtNfG6CzRlz9pnjKnqfru-1Hc";
export async function fetchMembersData({
	first,
	after,
}: {
	first: number;
	after?: string;
}): Promise<MembersData> {
	try {
		const client = new GraphQLClient(URL, {
			headers: {
				Authorization: `Bearer ${TOKEN}`,
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
	const client = new GraphQLClient(URL, {
		headers: {
			Authorization: `Bearer ${TOKEN}`,
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
