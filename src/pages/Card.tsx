import type React from "react";

interface CardProps {
	title: string;
	description: string;
	image?: string;
	url: string;
}

const Card: React.FC<CardProps> = ({ title, description, image, url }) => {
	return (
		<a href={url} rel="noopener noreferrer" className="card-link">
			<div className="card">
				{image && <img src={image} alt={title} />}
				<div className="card-content">
					<h2>{title}</h2>
					<p>{description}</p>
				</div>
			</div>
		</a>
	);
};

export default Card;
