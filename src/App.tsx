import { useEffect, useRef, useState } from "react";
import {
	handleUploadClick,
	handleFileChange,
	processImage,
	handlePaste,
} from "./utils";
import { toast, ToastContainer } from "react-toastify";
import { Icon } from "@iconify/react";
import "./App.css";

export const App = () => {
	const [uploadedImage, setUploadedImage] = useState<string | null>(null);
	const [processedImage, setProcessedImage] = useState<string | null>(null);
	const [tolerance, setTolerance] = useState<number>(0);
	const [editingTolerance, setEditingTolerance] = useState<number>(tolerance);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const showToast = (message: string, error?: boolean) => {
		if (error) toast.error(message);
		else toast.success(message);
	};
	useEffect(() => {
		window.addEventListener("paste", (e) => handlePaste(e, setUploadedImage));
		return () => {
			window.removeEventListener("paste", (e) =>
				handlePaste(e, setUploadedImage),
			);
		};
	}, []);

	useEffect(() => {
		if (uploadedImage) {
			//wait a little before processing the image
			processImage(
				uploadedImage,
				tolerance,
				setProcessedImage,
				showToast,
			).then();
		}
	}, [uploadedImage, tolerance]);

	return (
		<div
			style={{
				textAlign: "center",
				padding: "20px",
				fontFamily: "Arial, sans-serif",
			}}
		>
			<h1>Remove (White) Pixel</h1>

			<div className="controls">
				<div className="slider-container">
					<label htmlFor="tolerance">Tolerance: {editingTolerance}</label>
					<input
						type="range"
						id="tolerance"
						min="0"
						max="255"
						value={editingTolerance}
						onChange={(e) => setEditingTolerance(Number(e.target.value))}
						onMouseUp={() => setTolerance(editingTolerance)}
						onTouchEnd={() => setTolerance(editingTolerance)}
					/>
				</div>
				<button
					className="refresh-button"
					aria-label={"Clear"}
					onClick={() => {
						setUploadedImage(null);
						setProcessedImage(null);
						setEditingTolerance(0);
					}}
				>
					<Icon
						icon="basil:refresh-outline"
						width="24"
						height="24"
						style={{ fontSize: "1.5em" }}
					/>
					<span>Clear</span>
				</button>
			</div>
			{processedImage ? (
				<img src={processedImage} alt="Processed" />
			) : (
				<input
					type="text"
					className="input-placeholder"
					onClick={() => handleUploadClick(fileInputRef)}
					onDragOver={(e) => e.preventDefault()}
					placeholder={"Click here or paste an image to get started"}
				></input>
			)}
			<input
				type="file"
				ref={fileInputRef}
				accept="image/*"
				onChange={(e) => handleFileChange(e, setUploadedImage)}
			/>
			<br />

			<ToastContainer
				position={"top-center"}
				hideProgressBar={true}
				closeOnClick={true}
				className="toast-container"
			/>
		</div>
	);
};
