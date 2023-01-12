import React from "react";
import { CardWrapper } from "./styled";

const Card = ({children, className}) => {
	return (
		<CardWrapper>
			{children}
		</CardWrapper>
	);
};

export default Card;