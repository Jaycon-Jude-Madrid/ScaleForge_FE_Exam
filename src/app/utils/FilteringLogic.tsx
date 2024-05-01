export const getMemberProperty = (key: string, member: any) => {
	switch (key) {
		case "Name":
			return member.node?.name;
		case "Mobile Number":
			return member.node?.mobileNumber;
		case "Verification Status":
			return member.node?.verificationStatus;
		case "Email Address":
			return member.node?.emailAddress;
		case "Domain":
			return member.node?.domain;
		case "Status":
			return member.node?.status;
		default:
			return null;
	}
};
