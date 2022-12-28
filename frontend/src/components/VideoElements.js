import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../shared/components/UIElements/Card.js";
import Publisher from "./Publisher.js";
import ControlPanel from "./ControlPanel/ControlPanel.js";
axios.defaults.withCredentials = true;

const VideoElements = ({
	mediaStream,
	updateStream
}) => {

	useEffect(()=> {
		updateStream({audio:true, video:true});
	}, []);

	return (
		<>
			<Card className={"h-2/3 w-8/12 mb-12 mx-auto"}>
				<ControlPanel updateStream={updateStream} />
			</Card>
			<Card className={"h-2/3 w-8/12 m-auto"} >
				<Publisher mediaStream={mediaStream}/>
			</Card>
		</>
	);
};

export default VideoElements;