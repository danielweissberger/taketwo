import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import {useGetLatestUserDevices} from "../../shared/CustomHooks/MediaStreams.js";
import {setConstraints} from "../../redux/reducers/videoReducer";
import * as R from "ramda";
import { DEVICE_KIND } from "../../enums/mediaStream.js";

const getDeviceDict = ({videoinputs, audioinputs, audiooutputs}) => ({
	videoinputs: R.indexBy(R.prop("deviceId"), videoinputs),
	audioinputs: R.indexBy(R.prop("deviceId"), audioinputs),
	audiooutputs: R.indexBy(R.prop("deviceId"), audiooutputs),
});

const initializeAudioOutput = async({ refreshDevices, setAudioOutput }) => {
	const { audiooutputs = [] } = await refreshDevices();
	if(audiooutputs.length){
		const {deviceId} = audiooutputs[0];
		return setAudioOutput(deviceId);
	}
};

const ControlPanel = ({updateStream}) => {
	const constraints = useSelector(state => state.constraints);
	const [currentDevices, refreshDevices] = useGetLatestUserDevices();
	const dispatch = useDispatch();

	const setAudioOutput = async(deviceId) => {
		const audio = document.createElement("audio");
		await audio.setSinkId(deviceId);
		dispatch(setConstraints({audiooutput: deviceId}));
	};

	useEffect(() => {initializeAudioOutput({refreshDevices, setAudioOutput})}
	, []);

	const { videoinput, audioinput, audiooutput } = constraints;
	const { videoinputs, audioinputs, audiooutputs } = currentDevices;
	const deviceDict = getDeviceDict(currentDevices);

	const updateConstraints = async({deviceId, kind}) => {
		if(kind === DEVICE_KIND.audiooutput){
			return setAudioOutput(deviceId);
		}
		updateStream({...constraints, [kind]: deviceId});
	};

	return (
		<div className='h-full w-full flex flex-column justify-evenly items-center'>
			<h1 className='text-white mb-3 font-semibold'>Choose your devices:</h1>
			<Dropdown>
				<Dropdown.Toggle variant="secondary" id="dropdown-basic">
					{deviceDict.videoinputs[videoinput]?.label || "Choose Video Input"}
				</Dropdown.Toggle>
				<Dropdown.Menu>
					{videoinputs.map(({deviceId, kind, label}) => <Dropdown.Item key={deviceId} onClick={()=>updateConstraints({deviceId, kind})}>{label}</Dropdown.Item>)}
				</Dropdown.Menu>
			</Dropdown>
			<Dropdown>
				<Dropdown.Toggle variant="secondary" id="dropdown-basic">
					{deviceDict.audioinputs[audioinput]?.label || "Choose Audio Input"}
				</Dropdown.Toggle>
				<Dropdown.Menu>
					{audioinputs.map(({deviceId, kind, label}) => <Dropdown.Item key={deviceId} onClick={()=>updateConstraints({deviceId, kind})}>{label}</Dropdown.Item>)}
				</Dropdown.Menu>
			</Dropdown>
			<Dropdown>
				<Dropdown.Toggle variant="secondary" id="dropdown-basic">
					{deviceDict.audiooutputs[audiooutput]?.label || "Choose Audio Output"}
				</Dropdown.Toggle>
				<Dropdown.Menu>
					{audiooutputs.map(({deviceId, kind, label}) => <Dropdown.Item key={deviceId} onClick={()=>updateConstraints({deviceId, kind})}>{label}</Dropdown.Item>)}
				</Dropdown.Menu>
			</Dropdown>
		</div>
	);
};

export default ControlPanel;