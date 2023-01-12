import React, {createContext, useEffect, useState} from "react";
import { useGetLatestUserDevices, useGetMediaStream } from "../shared/CustomHooks/MediaStreams";
export const MediaStreamContext = createContext({});
import * as R from 'ramda';

const createTrackEndedListener = ({track, constraints, updateStream, event='ended'}) => {
	if(!track) return;
	let isStopped = false;
	function callback() {
		if(isStopped) return;
		isStopped=true;
		updateStream(constraints)
	}
	track.addEventListener('ended', callback)
	return () => track.removeEventListener(event, callback);
}

const setTrackEndedListeners = ({audioTrack, videoTrack, constraints, updateStream}) => {	
	console.log({audioTrack, videoTrack, constraints}, 'setting listener')
	const removeAudioTrack = createTrackEndedListener({track: audioTrack, constraints, updateStream})
	const removeVideoTrack = createTrackEndedListener({track: videoTrack, constraints, updateStream})
	const removeListeners = R.reject(R.isNil, [removeAudioTrack, removeVideoTrack])
	return removeListeners.length? R.pipe(...removeListeners) : null
}

export const MediaStreamProvider = ({children}) => {
	const [mediaStream, setMediaStream] = useState(null);
	const [audioTrack, setAudioTrack] = useState(null);
	const [videoTrack, setVideoTrack] = useState(null);
	const [constraints, setConstraints] = useState({audioinput: true, videoinput: true})
	const [camOff, setCamOff] = useState(false);
	const [micOff, setMicOff] = useState(false);
	const [removeListeners, setRemoveListeners] = useState({})
	const [isGeneratingStream, setIsGeneratingStream] = useState(false);

	const { generateStream } = useGetMediaStream({constraints, camOff, micOff});
	const {ended: removeEndedEvents} = removeListeners; 
	const {refreshDevices, currentDevices, initializeAudioOutput} = useGetLatestUserDevices({setConstraints});

	const toggleCam = () => {
		const {audioinput, videoinput} = constraints;
		const isCamOff = !camOff
		setCamOff(isCamOff)
		updateStream({videoinput, audioinput, isCamOff})
	}

	const toggleMic = () => {
		const {audioinput, videoinput} = constraints;
		const isMicOff = !micOff
		setMicOff(isMicOff)
		updateStream({audioinput, videoinput, isMicOff})
	}

	const resetStream = ({error}={}) => {
		const stream = error? {error} : null;
		videoTrack && videoTrack.stop();
		audioTrack && audioTrack.stop();
		setMediaStream(stream)
		setVideoTrack(null)
		setAudioTrack(null)
		removeEndedEvents && removeEndedEvents()
	}

	const setEventListeners = ({audioTrack, videoTrack, newConstraints}) => {
		const removeEndedListeners = setTrackEndedListeners({
			audioTrack, videoTrack, constraints: newConstraints, updateStream
		});
		setRemoveListeners({...removeListeners, ended: removeEndedListeners })
	}

	const updateStreamAndTracks = ({stream, audioTrack, videoTrack}) => {
		setMediaStream(stream);
		setAudioTrack(audioTrack);
		setVideoTrack(videoTrack)
	}

	const updateConstraints = ({newConstraints}) => setConstraints(
			(constraints) => ({...constraints, ...newConstraints})
	);

	const handleStreamUpdate = R.pipe(
		R.tap(setEventListeners),
		R.tap(updateStreamAndTracks),
		R.tap(updateConstraints),
		R.prop('stream')
	)

	const initializeUpdate = () => {
		setIsGeneratingStream(true);
		removeEndedEvents && removeEndedEvents();
	}

	const hasErrorOrWarning = ({error, warning}) => error || warning

	const handleErrorOrWarning = ({error, warning}) => {
		resetStream({error, warning});
		return { error, warning }
	}

	const handleStreamResult = R.pipe(
		R.tap(() => setIsGeneratingStream(false)),
		R.ifElse(
			hasErrorOrWarning,
			handleErrorOrWarning,
			handleStreamUpdate
		)
	)

	const updateStream = R.pipeP(
		(input) => Promise.resolve(input),
		R.tap(initializeUpdate),
		generateStream,
		handleStreamResult
	)

	const mediaStreamState = {
		mediaStream,
		audioTrack,
		videoTrack,
		constraints,
		setConstraints,
		updateStream,
		currentDevices,
		refreshDevices, 
		initializeAudioOutput,
		isGeneratingStream,
		toggleMic,
		micOff,
		toggleCam,
		camOff
	};

	return (
		<MediaStreamContext.Provider value={mediaStreamState}>
			{children}
		</MediaStreamContext.Provider>
	);
};
