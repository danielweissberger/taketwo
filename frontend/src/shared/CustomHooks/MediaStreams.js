import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {setConstraints} from "../../redux/reducers/videoReducer";

const buildConstraintsPayload = ({audioinput, videoinput}) => ({
	audio: {
		deviceId: audioinput
	},
	video: {
		deviceId: videoinput
	}
});

const useGetMediaStream = () => {
	const dispatch = useDispatch();
	const generateStream = async({ audioinput, videoinput }) => {
		let constraints = buildConstraintsPayload({ audioinput, videoinput });
		constraints = constraints? constraints : {audio: true, video: true};
		const stream =  await navigator.mediaDevices.getUserMedia(constraints);
		const videoTrack = stream?.getTracks()?.find(track => track.kind === "video");
		const videoID = videoTrack?.getSettings().deviceId;
		const audioTrack = stream?.getTracks()?.find(track => track.kind === "audio");
		const audioID = audioTrack?.getSettings().deviceId;
		dispatch(setConstraints({audioinput: audioID, videoinput: videoID}));
		return stream;
	};

	return [generateStream];
};


const useGetLatestUserDevices = () => {
	const [currentDevices, setCurrentDevices] = useState({audioinputs:[], videoinputs: [], audiooutputs: []});

	useEffect(() => {
		navigator.mediaDevices.ondevicechange = () => {
			refreshDevices();
		};
	}, []);

	const refreshDevices = async() => {
		const formattedDevices = {audioinputs:[], videoinputs: [], audiooutputs: []};
		const devices = await navigator.mediaDevices.enumerateDevices();    
		devices.map(device=> {
			formattedDevices[`${device.kind}s`].push(device);
		});
		setCurrentDevices(formattedDevices);
		return formattedDevices;
	};
	return [currentDevices, refreshDevices];
};


export {useGetMediaStream, useGetLatestUserDevices};