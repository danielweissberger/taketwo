import {useEffect, useState} from "react";
import useOpenModal from "./UseOpenModal";
import * as R from 'ramda';

const buildConstraintsPayload = ({audioinput, videoinput}) => R.applySpec({
	audio: ({audioinput}) => typeof audioinput === "boolean" ? audioinput : {deviceId: audioinput},
	video: ({videoinput}) => typeof videoinput === "boolean" ? videoinput : {deviceId: videoinput}
})({audioinput, videoinput})


const handleMediaStreamErrors = ({name, openModal, suppressModal}) => {
	if (name == "NotFoundError" || name == "DevicesNotFoundError") {
        //required track is missing 
    } else if (name == "NotReadableError" || name == "TrackStartError") {
        //webcam or mic are already in use 
    } else if (name == "OverconstrainedError" || name == "ConstraintNotSatisfiedError") {
        //constraints can not be satisfied by avb. devices 
    } else if (name == "NotAllowedError" || name == "PermissionDeniedError") {
        !suppressModal && openModal('/permissions')
    } else if (name == "TypeError" || name == "TypeError") {
        //empty constraints object 
    } else {
        //other errors 
    }
}

const evaluateConstraints = ({isCamOff, isMicOff, videoinput, audioinput}) => ({
	videoinput: isCamOff? false : videoinput,
	audioinput: isMicOff? false : audioinput,
})

const removeOffDevices = ({audioID, videoID, isCamOff, isMicOff, constraints}) => {
	const {audioinput, videoinput} = constraints;
	return ({
		audioinput: isMicOff? audioinput: audioID,
		videoinput: isCamOff? videoinput: videoID
	})
}

const useGetMediaStream = ({constraints, micOff, camOff}) => {
	const {openModal} = useOpenModal();

	const generateStream = async({ audioinput, videoinput, isCamOff=camOff, isMicOff=micOff,  suppressModal }) => {
		let newConstraints = buildConstraintsPayload(evaluateConstraints({isCamOff, isMicOff, videoinput, audioinput}));
		let stream;
		if((!audioinput || isMicOff)  && (!videoinput || isCamOff)){
			return ({warning: 'No devices requested'})
		}
		try{
			stream =  await navigator.mediaDevices.getUserMedia(newConstraints);
		}
		catch(err){
			const name = err.name;
			handleMediaStreamErrors({name, openModal, suppressModal})
			return ({error: name})
		}
		const videoTrack = stream?.getTracks()?.find(track => track.kind === "video");
		const videoID = videoTrack?.getSettings().deviceId;
		const audioTrack = stream?.getTracks()?.find(track => track.kind === "audio");
		const audioID = audioTrack?.getSettings().deviceId;
		newConstraints = removeOffDevices({audioID, videoID,  isCamOff, isMicOff, constraints});
		return {stream, audioTrack, videoTrack, newConstraints};
	};

	return {generateStream};
};


const useGetLatestUserDevices = ({setConstraints, constraints={}}) => {
	const [currentDevices, setCurrentDevices] = useState({audioinputs:[], videoinputs: [], audiooutputs: []});
	const {audiooutput} = constraints;
	useEffect(() => {
		navigator.mediaDevices.ondevicechange = () => {
			console.log('calling')
			// refreshDevices({});
		};
	}, []);

	const setAudioOutput = async(deviceId) => {
		const audio = document.createElement("audio");
		await audio.setSinkId(deviceId);
		console.log('setting constraints!!');
		setConstraints(constraints => ({...constraints, audiooutput: deviceId}));
	};

	const initializeAudioOutput = async(devices) => {
		const { audiooutputs = [] } = devices;
		if(audiooutputs.length){
			const {deviceId} = audiooutputs[0];
			setAudioOutput(deviceId);
		}
	};

	const refreshDevices = async({micOff=false, camOff=false}) => {
		const formattedDevices = {audioinputs:[], videoinputs: [], audiooutputs: []};
		const devices = await navigator.mediaDevices.enumerateDevices();    
		devices.map(device=> {
			formattedDevices[`${device.kind}s`].push(device);
		});
		// Conditionally refresh based on camOff/micOff state will preserve the 
		// device list in the event a partial media stream (only audio or only video)
		// was requested. 
		const {audioinputs, videoinputs, audiooutputs} = currentDevices;
		const newDevices = {
			...formattedDevices,
			...camOff && {videoinputs},
			...micOff && {audioinputs, audiooutputs}
		}
		setCurrentDevices(newDevices);
		if(!audiooutput) {
			console.log('initializing audio output!!')
			initializeAudioOutput(newDevices)
		}
		return formattedDevices;
	};

	return {currentDevices, refreshDevices, initializeAudioOutput};
};


export {useGetMediaStream, useGetLatestUserDevices};