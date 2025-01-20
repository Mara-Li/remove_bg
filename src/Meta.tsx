import { Helmet } from "react-helmet-async";
import metadata from "./metadata.json" with { type: "json" };

export default function ({ project }: { project: string }) {
	const meta = metadata.find((m) => m.project === project);
	if (!meta) {
		throw new Error(`No metadata found for project ${project}`);
	}
	return (
		<Helmet>
			<meta charSet="UTF-8" />
			<meta content="width=device-width, initial-scale=1.0" name="viewport" />
			<title>{meta.title}</title>
			<meta name="description" content={meta.description} />
			{/* Open Graph */}
			<meta property="og:title" content={meta.title} />
			<meta property="og:description" content={meta.description} />
			<meta property="og:image" content={meta.og_image} />
			<meta property="og:url" content={meta.url} />
			{/* Twitter */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={meta.title} />
			<meta name="twitter:description" content={meta.description} />
			<meta name="twitter:image" content={meta.og_image} />
			{/* Icons */}
			<link href={meta.icon} rel="icon" type="image/x-icon" />
			<link href={meta.icon} rel="apple-touch-icon" />
		</Helmet>
	);
}
