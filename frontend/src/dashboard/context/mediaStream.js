import React, {createContext, useState} from "react";
import { useGetMediaStream } from "../../shared/components/CustomHooks/MediaStreams";

export const MediaStreamContext = createContext({});

export const MediaStreamProvider = ({children}) => {
	const [mediaStream, setMediaStream] = useState(null);
	const [generateStream] = useGetMediaStream();

	const updateStream = async(constraints) => {
		const stream = await generateStream(constraints);
		setMediaStream(stream);
	};

	const mediaStreamState = {
		mediaStream,
		setMediaStream,
		updateStream
	};

	return (
		<MediaStreamContext.Provider value={mediaStreamState}>
			{children}
		</MediaStreamContext.Provider>
	);
};
