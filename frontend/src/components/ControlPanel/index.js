import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import {useGetLatestUserDevices} from "../../shared/CustomHooks/MediaStreams.js";
import {setConstraints} from "../../redux/reducers/videoReducer";
import * as R from "ramda";
import { DropDownWrapper, ToggleDeviceButton, ControlWithButton } from "./styled.js";
import { DEVICE_KIND } from "../../enums/mediaStream.js";

const getDeviceDict = ({videoinputs, audioinputs, audiooutputs}) => ({
	videoinputs: R.indexBy(R.prop("deviceId"), videoinputs),
	audioinputs: R.indexBy(R.prop("deviceId"), audioinputs),
	audiooutputs: R.indexBy(R.prop("deviceId"), audiooutputs),
});

const ControlPanel = ({
		updateStream, 
		currentDevices, 
		refreshDevices, 
		constraints, 
		setConstraints, 
		micOff, 
		camOff,
		toggleMic,
		toggleCam
	}) => {

	useEffect(() => {
		refreshDevices({})
	}, []);

	const { videoinput, audioinput, audiooutput } = constraints;
	const { videoinputs, audioinputs, audiooutputs } = currentDevices;
	const deviceDict = getDeviceDict(currentDevices);

	const updateConstraints = async({deviceId, kind}) => {
		if(kind === DEVICE_KIND.audiooutput){
			return setAudioOutput(deviceId);
		}
		if(kind === DEVICE_KIND.audioinput && micOff || kind === DEVICE_KIND.videoinput && camOff){
			return setConstraints(constraints => ({...constraints, [kind]: deviceId}))
		}
		updateStream({...constraints, [kind]: deviceId});
	};

	const renderItems = (inputs) => inputs.map(({deviceId, kind, label}) => (
		<Dropdown.Item key={deviceId} onClick={()=>updateConstraints({deviceId, kind})}>{label}</Dropdown.Item>)
	);

	return (
		<div className='w-full flex flex-column items-start px-2 pt-4'>
			<ControlWithButton>
				<TestDropdown
					label = {deviceDict.videoinputs[videoinput]?.label || "Choose Video Input"}
					items = {renderItems(videoinputs)}
				/>
				<ToggleDeviceButton onClick={toggleCam}>{camOff? "Cam On": "Cam Off"}</ToggleDeviceButton>
			</ControlWithButton>
			<ControlWithButton>
				<TestDropdown
					label = {deviceDict.audioinputs[audioinput]?.label || "Choose Audio Input"}
					items = {renderItems(audioinputs)}
				/>
				<ToggleDeviceButton onClick={toggleMic}>{micOff? "Mic On": "Mic Off"}</ToggleDeviceButton>
			</ControlWithButton>
			<TestDropdown
				label = {deviceDict.audiooutputs[audiooutput]?.label || "Choose Audio Output"}
				items = {renderItems(audiooutputs)}
			/>
		</div>
	);
};

export default ControlPanel;

const StyledDropdown = ({children}) => (
	<DropDownWrapper>
		<Dropdown>
			{children}
		</Dropdown>
	</DropDownWrapper>
)

const TestDropdown = ({label, items}) => (
	<DropDownWrapper>
		<Dropdown>
			<Dropdown.Toggle variant="secondary" id="dropdown-basic">
				{label}
			</Dropdown.Toggle>
			<Dropdown.Menu>
				{items}
			</Dropdown.Menu>
		</Dropdown>
	</DropDownWrapper>
)