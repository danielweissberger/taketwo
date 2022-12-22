import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import Card from '../../../shared/components/UIElements/Card.js';
import Dropdown from 'react-bootstrap/Dropdown';
import {useGetLatestUserDevices} from '../../../shared/components/CustomHooks/MediaStreams.js'
import {setConstraints} from '../../../redux/reducers/videoReducer'

const ControlPanel = (props) => {
    const {setMyConstraints} = props;
    const [currentDevices, refreshDevices] = useGetLatestUserDevices();
    const dispatch = useDispatch();
    useEffect( () => {
        refreshDevices()
    }, [])

    console.log(currentDevices, 'deviceee')
    const {videoinput, audioinput, audiooutput} = currentDevices;

    const updateConstraints = (id, kind) => {
        dispatch(setConstraints({id, kind}));
        const kindMap = {audioinput: 'audio', videoinput: 'video'}
        setMyConstraints(myConstraints=> ({...myConstraints, [kindMap[kind]]:id }))
    }

    return (
        <Card>
            <div className='h-full w-full flex flex-column justify-evenly items-center'>
                <h1 className='text-white mb-3 font-semibold'>Choose your devices:</h1>
                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        Choose Video Input
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {videoinput.map(input => <Dropdown.Item onClick={()=>updateConstraints(input.deviceId, input.kind)}>{input.label}</Dropdown.Item>)}
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        Choose Audio Input
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {audioinput.map(input => <Dropdown.Item>{input.label}</Dropdown.Item>)}
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        Choose Audio Output
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {audiooutput.map(input => <Dropdown.Item>{input.label}</Dropdown.Item>)}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </Card>
    )
}

export default ControlPanel