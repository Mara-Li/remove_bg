import { Helmet } from "react-helmet-async";

export default function () {
	return (
		<Helmet>
			<title>Mara-Li's toolbox</title>
			<meta
				name="description"
				content="Mara-Li's toolbox ; some little website that do stuff."
			/>
			<meta name="author" content="Mara-Li" />
			<meta name="keywords" content="Mara-Li, toolbox, website, tools" />
			<meta name="robots" content="index, follow" />
			<meta property="og:title" content="Mara-Li's toolbox" />
			<meta
				property="og:description"
				content="Mara-Li's toolbox ; some little website that do stuff."
			/>
			<meta property="og:type" content="website" />
			<meta property="og:url" content="https://project.mara-li.fr" />
			<meta
				property="og:image"
				content="https://www.blog.mara-li.fr/_assets/meta/avatar_index.gif"
			/>
			<meta property="og:site_name" content="Mara-Li's toolbox" />
			<meta property="og:locale" content="en_US" />
			<meta property="og:locale:alternate" content="fr_FR" />
			<meta property="twitter:card" content="summary" />
			<meta
				content="https://www.blog.mara-li.fr/_assets/meta/avatar_index.gif"
				name="twitter:image"
			/>
			<link href="/assets/box.png" rel="icon" type="image/x-icon" />
			<link href="/assets/box.png" rel="apple-touch-icon" />
		</Helmet>
	);
}
