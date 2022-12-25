import React, {useEffect, useMemo} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../../shared/components/UIElements/Card.js';
import Dropdown from 'react-bootstrap/Dropdown';
import {useGetLatestUserDevices, useGetMediaStream} from '../../../shared/components/CustomHooks/MediaStreams.js'
import {setConstraints} from '../../../redux/reducers/videoReducer'
import * as R from 'ramda';

const getDeviceDict = ({videoinput, audioinput, audiooutput}) => ({
    videoinput: R.indexBy(R.prop('deviceId'), videoinput),
    audioinput: R.indexBy(R.prop('deviceId'), audioinput),
    audiooutput: R.indexBy(R.prop('deviceId'), audiooutput),
})

const ControlPanel = ({updateStream}) => {
    const constraints = useSelector(state => state.constraints);
    const [currentDevices, refreshDevices] = useGetLatestUserDevices();

    useEffect( () => {
        refreshDevices()
    }, [])

    const {
        videoinput: viSelected, 
        audioinput: aiSelected, 
        audiooutput: aoSelected
    } = constraints;

    const {videoinput, audioinput, audiooutput} = currentDevices;
    const deviceDict = getDeviceDict(currentDevices);

    const updateConstraints = ({deviceId, kind}) => {
        updateStream({...constraints, [kind]: deviceId});
    }

    return (
            <div className='h-full w-full flex flex-column justify-evenly items-center'>
                <h1 className='text-white mb-3 font-semibold'>Choose your devices:</h1>
                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        {deviceDict.videoinput[viSelected]?.label || 'Choose Video Input'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {videoinput.map(({deviceId, kind, label}) => <Dropdown.Item onClick={()=>updateConstraints({deviceId, kind})}>{label}</Dropdown.Item>)}
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    {deviceDict.audioinput[aiSelected]?.label || 'Choose Audio Input'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {audioinput.map(({deviceId, kind, label}) => <Dropdown.Item onClick={()=>updateConstraints({deviceId, kind})}>{label}</Dropdown.Item>)}
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    {deviceDict.audiooutput[aoSelected]?.label || 'Choose Audio Output'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {audiooutput.map(({deviceId, kind, label}) => <Dropdown.Item onClick={()=>updateConstraints({deviceId, kind})}>{label}</Dropdown.Item>)}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
    )
}

export default ControlPanel