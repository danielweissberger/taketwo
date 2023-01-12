import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Modal from "../../shared/components/Modal";
import { AllowPermisionsImg } from './styled';
import { removeLastUrlPath } from '../../shared/utilities/url';
import { MediaStreamContext } from '../../context/mediaStream';

const PermissionsModal = ({updateStream, refreshDevices, constraints, camOff, micOff}) => {
    const history = useHistory();
    const {path} = useRouteMatch();

    const handleSubmit = async () => {
        const {error} = await updateStream(constraints);
        if(!error){
            await refreshDevices({camOff, micOff});
            history.push(removeLastUrlPath(path))
        }
    }

    const onClose = async() => {
        const {error} = await updateStream({...constraints, suppressModal: true});
        console.log(error, 'error', camOff, micOff)
        !error && refreshDevices({camOff, micOff});
        history.push(removeLastUrlPath(path));
    }

    return (
        <Modal
            submitText='Try Again'
            title='Permission Denied: Allow access to your mic/cam'
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <AllowPermisionsImg 
                src="https://www.howtogeek.com/wp-content/uploads/2019/04/2019-04-12_16h56_26.png?trim=1,1&bg-color=000&pad=1,1"
            />
        </Modal>
); 
}

export default () => (
        <MediaStreamContext.Consumer>
            {({ updateStream, refreshDevices, constraints, camOff, micOff, initializeAudioOutput }) => 
            (<PermissionsModal initializeAudioOutput={initializeAudioOutput} updateStream={updateStream} refreshDevices={refreshDevices} constraints={constraints} camOff={camOff} micOff={micOff}/>)}
        </MediaStreamContext.Consumer>
);