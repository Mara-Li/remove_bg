import type React from "react";
import metadata from "../metadata.json"; // Charger les métadonnées
import Card from "./Card";
import "./HomePage.css";

const HomePage: React.FC = () => {
	return (
		<div className="home-container">
			<h1>Mara-Li's toolbox</h1>
			<div className="card-container">
				{metadata.map((data, index) => (
					<Card
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={index}
						title={data.title}
						description={data.description}
						image={data.image}
						url={data.project}
					/>
				))}
			</div>
		</div>
	);
};

export default HomePage;
