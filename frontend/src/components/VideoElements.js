import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../shared/components/UIElements/Card/Card.js";
import Publisher from "./Publisher.js";
import ControlPanel from "./ControlPanel/index.js";
axios.defaults.withCredentials = true;

const VideoElements = ({
	mediaStream,
	updateStream,
	currentDevices,
	refreshDevices,
	constraints,
	setConstraints,
	camOff,
	toggleCam,
	micOff,
	toggleMic,
	videoTrack,
	audioTrack,
	isGeneratingStream,
	initializeAudioOutput
}) => {

	useEffect(()=> {
		updateStream({audioinput: true, videoinput: true});
	}, []);

	return (
			<Card >
				<Publisher 
					mediaStream={mediaStream}
					videoTrack={videoTrack}
					audioTrack={audioTrack}
					isGeneratingStream={isGeneratingStream}
				/>
				<ControlPanel 
					updateStream={updateStream} 
					currentDevices={currentDevices} 
					refreshDevices={refreshDevices}
					constraints={constraints}
					setConstraints={setConstraints}
					camOff={camOff}
					toggleCam={toggleCam}
					micOff={micOff}
					toggleMic={toggleMic}
				/>
			</Card>
	);
};

export default VideoElements;