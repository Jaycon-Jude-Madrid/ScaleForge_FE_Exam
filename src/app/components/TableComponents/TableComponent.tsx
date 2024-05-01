import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import TableFooterButtons from "./TableFooterButtons";
import { TableHeaderSelectFilters } from "./TableHeaderSelectFilters";
import { Badge } from "@/components/ui/badge";
import { DotFilledIcon, EraserIcon, TrashIcon } from "@radix-ui/react-icons";
import {
	StatusBadge,
	VerificationStatusBadge,
} from "./common/TableColumnsComponents";
import { DataNodeProps } from "@/app/interface/TableComponentProps";
import { Button } from "@/components/ui/button";
import { useEventsContext } from "@/app/hooks/useEventsHooks";
import { formatDate } from "@/app/utils/DataFormmater";
import { TableDateRangePicker } from "./TableDateRangePicker";

export function TableComponent({
	data,
	filteredMembersEdges,
}: {
	data: DataNodeProps[];
	filteredMembersEdges: DataNodeProps[];
}) {
	const { handleClearAllFilter } = useEventsContext();
	const arrName = data.map(({ node }) => node.name);
	const arrVerificationStatus = data.map(({ node }) => node.verificationStatus);
	const arrEmailAddress = data.map(({ node }) => node.emailAddress);
	const arrMobileNumber = data.map(({ node }) => node.mobileNumber);
	const arrDomain = data.map(({ node }) => node.domain);
	const arrStatus = data.map(({ node }) => node.status);

	return (
		<div
			style={{
				border: "0.5px solid #2E2E2E",
				borderRadius: "5px",
			}}
		>
			<div className="max-h-[700px] overflow-auto">
				<Table>
					<TableHeader style={{ backgroundColor: "rgba(10, 44, 56, 0.2)" }}>
						<TableRow>
							<TableHead className="font-bold text-lg p-4">Filters</TableHead>
							<TableHead className="">
								<TableHeaderSelectFilters title={"Name"} data={arrName} />
							</TableHead>
							<TableHead className="">
								<TableHeaderSelectFilters
									title={"Verification Status"}
									data={arrVerificationStatus}
								/>
							</TableHead>
							<TableHead className="">
								<TableHeaderSelectFilters
									title={"Email Address"}
									data={arrEmailAddress.filter(
										(email): email is string => email !== null
									)}
								/>
							</TableHead>
							<TableHead className="">
								<TableHeaderSelectFilters
									title={"Mobile Number"}
									data={arrMobileNumber}
								/>
							</TableHead>
							<TableHead className="">
								<TableDateRangePicker />
							</TableHead>{" "}
							<TableHead className="">
								<TableHeaderSelectFilters
									title={"Domain"}
									data={arrDomain.filter(
										(domain): domain is string => domain !== null
									)}
								/>
							</TableHead>
							<TableHead className="">
								<TableHeaderSelectFilters title={"Status"} data={arrStatus} />
							</TableHead>
							<TableHead>
								<Button variant="destructive" onClick={handleClearAllFilter}>
									<EraserIcon />
								</Button>{" "}
							</TableHead>{" "}
						</TableRow>
					</TableHeader>
				</Table>
				<Table>
					<TableHeader style={{ backgroundColor: "rgba(10, 44, 56, 0.2)" }}>
						<TableRow>
							<TableHead className="">Name</TableHead>
							<TableHead className=" ">Verification Status</TableHead>
							<TableHead className="">Email Address</TableHead>
							<TableHead className="">Mobile Number</TableHead>
							<TableHead className="">Domain</TableHead>
							<TableHead className="">Date Registered</TableHead>
							<TableHead className="">Status</TableHead>
							<TableHead className="">Date and Time Last Register</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody
						style={{ backgroundColor: "#0A1117" }}
						className="h-[200px]"
					>
						{filteredMembersEdges?.map(({ node }, index) => (
							<TableRow key={index}>
								<TableCell className="  text-custom-yellow font-medium">
									{node.name}
								</TableCell>
								<TableCell className="p-5">
									<VerificationStatusBadge
										status={node.verificationStatus.toLowerCase()}
									/>
								</TableCell>
								<TableCell className="">{node.emailAddress}</TableCell>
								<TableCell className="">{node.mobileNumber}</TableCell>
								<TableCell className="max-w-[150px] overflow-hidden text-ellipsis">
									{node.domain}
								</TableCell>
								<TableCell className="">
									{formatDate(node.dateTimeCreated)}
								</TableCell>
								<TableCell className="">
									<StatusBadge status={node.status.toLowerCase()} />
								</TableCell>
								<TableCell className="">
									{formatDate(node.dateTimeLastActive)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
					<TableFooter style={{ backgroundColor: "rgba(10, 44, 56, 0.2)" }}>
						<TableRow>
							<TableCell colSpan={12}>
								<div className="flex justify-end p-2">
									<TableFooterButtons />
								</div>
							</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</div>
		</div>
	);
}
