import React from "react";
import VideoElements from "../components/VideoElements";
import Header from "../components/Header/Header.js";
import {MediaStreamProvider, MediaStreamContext} from "../context/mediaStream.js";

const Dashboard = () => { 

	return (
		<>
			<Header/>
				<div className='h-full p-4 flex flex-col justify-center items-center'>
					<>
						<MediaStreamContext.Consumer>
							{(props) => 
								(<VideoElements {...props}/>)}
						</MediaStreamContext.Consumer>
					</>
				</div>
		</>
	);
};

export default Dashboard;