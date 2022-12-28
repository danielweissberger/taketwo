import React from "react";

const Card = ({children, className}) => {
	return (
		<div className={`flex flex-col p-4 m-4 bg-gray-400 shadow-lg border border-gray-900 rounded ${className}`}>
			{children}
		</div>
	);
};

export default Card;