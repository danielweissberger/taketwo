import React, {useEffect, useRef} from "react";

const Publisher =  (props) => {
	const {mediaStream} =   props;
	const videoRef = useRef();

	useEffect(()=> {
		if(!mediaStream?.id) return;
		videoRef.current.srcObject= mediaStream;
		videoRef.current.play();
	}, [mediaStream?.id]);

	if(!mediaStream?.id){
		return (
			<div className='w-full h-24 p-4 bg-gray-300 flex flex-row justify-between items-center border-b border-gray-800'>
				<h1>Rendering Video...</h1>
			</div>
		);
	}

	return (

		<video className='h-full object-fill' ref={videoRef}></video>

	);
};

export default Publisher;