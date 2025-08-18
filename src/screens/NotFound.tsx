import React from "react";

export const NotFound = (): JSX.Element => (
	<div className="flex flex-col items-center justify-center h-screen">
		<h1 className="text-3xl font-bold mb-4 text-[#111416]">
			404 - Page Not Found
		</h1>
		<p className="text-[#60758a] text-lg mb-8">
			Sorry, the page you are looking for does not exist.
		</p>
		<a href="/" className="text-blue-600 hover:underline">
			Go Home
		</a>
	</div>
);
