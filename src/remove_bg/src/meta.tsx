import { Helmet } from "react-helmet-async";

export default function () {
	return (
		<Helmet>
			<meta charSet="UTF-8" />
			<meta content="width=device-width, initial-scale=1.0" name="viewport" />
			<title>Remove (White) Pixel</title>
			<meta
				content="Remove white Pixels from images with ease! Upload or paste an image, adjust tolerance, and get your processed result. All is done in the browser, without AI, GMO and pesticide!"
				name="description"
			/>
			<meta
				content="Remove White Pixel - Image Processing Tool"
				property="og:title"
			/>
			<meta
				content="Remove white Pixels from images with ease! Upload or paste an image, adjust tolerance, and get your processed result. All is done in the browser, without AI, GMO and pesticide!"
				property="og:description"
			/>
			<link href="/assets/favicon.png" rel="icon" type="image/x-icon" />
			<link href="/assets/favicon.png" rel="apple-touch-icon" />
			<meta content="/assets/og-image.png" property="og:image" />
			<meta content="https://project.mara-li.fr/remove_bg" property="og:url" />
			<meta content="website" property="og:type" />
			<meta content="summary_large_image" name="twitter:card" />
			<meta
				content="Remove White Pixel - Image Processing Tool"
				name="twitter:title"
			/>
			<meta
				content="Easily remove white Pixels from images directly from your browser."
				name="twitter:description"
			/>
			<meta content="/assets/og-image.png" name="twitter:image" />
		</Helmet>
	);
}
