import { Jimp } from "jimp";
import React from "react";

export const handleUploadClick = (
	fileInputRef: React.RefObject<HTMLInputElement>,
) => {
	fileInputRef.current?.click();
};

export const handleFileChange = (
	e: React.ChangeEvent<HTMLInputElement>,
	setUploadedImage: React.Dispatch<React.SetStateAction<string | null>>,
) => {
	const file = e.target.files?.[0];
	if (file) {
		const reader = new FileReader();
		reader.onload = (event) => {
			setUploadedImage(event.target?.result as string);
		};
		reader.readAsDataURL(file);
	}
};

export const processImage = async (
	uploadedImage: string | null,
	currentTolerance: number,
	setProcessedImage: React.Dispatch<React.SetStateAction<string | null>>,
	showToast: (message: string, error?: boolean) => void,
) => {
	if (!uploadedImage) {
		showToast("No image uploaded.", true);
		return;
	}

	try {
		const response = await fetch(uploadedImage);
		const arrayBuffer = await response.arrayBuffer();

		const image = await Jimp.read(arrayBuffer);
		const targetColor = { r: 255, g: 255, b: 255, a: 255 }; // White
		const replaceColor = { r: 0, g: 0, b: 0, a: 0 }; // Transparent
		const colorDistance = (c1: typeof targetColor, c2: typeof targetColor) =>
			Math.sqrt(
				Math.pow(c1.r - c2.r, 2) +
					Math.pow(c1.g - c2.g, 2) +
					Math.pow(c1.b - c2.b, 2) +
					Math.pow(c1.a - c2.a, 2),
			);

		image.scan(0, 0, image.bitmap.width, image.bitmap.height, (_x, _y, idx) => {
			const thisColor = {
				r: image.bitmap.data[idx],
				g: image.bitmap.data[idx + 1],
				b: image.bitmap.data[idx + 2],
				a: image.bitmap.data[idx + 3],
			};
			if (colorDistance(targetColor, thisColor) <= currentTolerance) {
				image.bitmap.data[idx] = replaceColor.r;
				image.bitmap.data[idx + 1] = replaceColor.g;
				image.bitmap.data[idx + 2] = replaceColor.b;
				image.bitmap.data[idx + 3] = replaceColor.a;
			}
		});

		setProcessedImage(await image.getBase64("image/png"));
		//wait a little before copy
		await new Promise((resolve) => setTimeout(resolve, 1000));
		// Copy the image to the clipboard
		const buffer = await image.getBuffer("image/png");
		const blob = new Blob([buffer], { type: "image/png" });
		await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
	} catch (error) {
		console.error("Error processing image:", error);
	}
};

export const handlePaste = (
	e: ClipboardEvent,
	setUploadedImage: React.Dispatch<React.SetStateAction<string | null>>,
) => {
	const items = e.clipboardData?.items;
	if (items) {
		for (const item of items) {
			if (item.type.startsWith("image/")) {
				const file = item.getAsFile();
				if (file) {
					const reader = new FileReader();
					reader.onload = (event) => {
						setUploadedImage(event.target?.result as string);
					};
					reader.readAsDataURL(file);
				}
			}
		}
	}
};
