"use client";

import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

const ErrorPage = () => {
	return (
		<div className="flex justify-center items-center h-screen">
			<div
				className="flex flex-col gap-4 text-center
            "
			>
				{" "}
				<h1 className="text-4xl font-bold">Something went wrong</h1>
				<p className="text-lg">Please try again later.</p>
				<p className="text-lg text-red-500">
					{`It appears there's a problem with the server connection.`}
				</p>
				<div>
					<Button variant="default" onClick={() => window.location.reload()}>
						<ReloadIcon className="mr-2" />
						Refresh{" "}
					</Button>
				</div>
			</div>{" "}
		</div>
	);
};

export default ErrorPage;
