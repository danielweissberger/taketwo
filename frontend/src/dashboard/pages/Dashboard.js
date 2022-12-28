import React from "react";
import VideoElements from "../components/VideoElements";
import Header from "../components/Header.js";
import {MediaStreamProvider, MediaStreamContext} from "../context/mediaStream.js";

const Dashboard = () => { 

	return (
		<>
			<Header/>
			<div style={{top: "14%"}} className='flex flex-col justify-center absolute w-full'>
				<div className='p-4 flex flex-col justify-center'>
					<MediaStreamProvider>
						<MediaStreamContext.Consumer>
							{({mediaStream, updateStream}) => 
								(<VideoElements mediaStream={mediaStream} updateStream={updateStream}/>)}
						</MediaStreamContext.Consumer>
					</MediaStreamProvider>
				</div>
			</div>
		</>
	);
};

export default Dashboard;