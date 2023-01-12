import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import useOpenModal from "../shared/CustomHooks/UseOpenModal";

const Publisher =  ({mediaStream, videoTrack, isGeneratingStream}) => {
	const videoRef = useRef();
	const {openModal} = useOpenModal();

	useEffect(()=> {
		if(!mediaStream?.id) return;
		videoRef.current.srcObject= mediaStream;
		videoRef.current.play();
	}, [mediaStream?.id]);
	const {error} = mediaStream || {};

	return (
		<VideoWrapper>
			<video id='publisher' className={`object-cover ${(!videoTrack || isGeneratingStream) && 'hidden'}`} ref={videoRef}></video> 
			{(!videoTrack || isGeneratingStream) && 
			<CameraOffTile>
				{(!videoTrack && !isGeneratingStream && !error) && <CameraOffTileLabel>{'Camera Off'}</CameraOffTileLabel>}
				{(!videoTrack && !isGeneratingStream && error) && 
					<ErrorWrapper>
						<ErrorLabel>{'Fix your permissions to proceed.'}</ErrorLabel>
						<LearnMore onClick={() => openModal('/permissions')}>{'Learn more'}</LearnMore>
					</ErrorWrapper>
				}
				{isGeneratingStream && <Loader/>}
			</CameraOffTile> }
		</VideoWrapper>
	);
};

const VideoWrapper = styled.div`
	height: 80%;
	width: 95%;
	display: flex;
	justify-content: center;
	margin: auto;
`

const CameraOffTile = styled.div`
	background-color: gray;
	width: 100%;
	height: 100%;
	align-self: stretch;
	display: flex;
	align-items: center;
	justify-content: center;
`
const CameraOffTileLabel = styled.span`
	color: white;
`

const ErrorWrapper = styled.div`
	display: flex;
`

const ErrorLabel = styled.span`
	color: lightsalmon;
`

const LearnMore = styled.span`
	color: white;
	text-decoration: underline;
	margin-left: 4px;
	cursor: pointer;
`

const Loader = styled.div`
  border: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 2s linear infinite;
  @keyframes spin {
	0% { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
}
`


export default Publisher;