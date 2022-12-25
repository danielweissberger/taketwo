import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../../shared/components/UIElements/Card.js';
import Publisher from '../components/Publisher.js'
import ControlPanel from './ControlPanel/ControlPanel.js';
axios.defaults.withCredentials = true;


const VideoElements = ({
    mediaStream,
    updateStream
    }) => {
    console.log(mediaStream?.id, 'MS ID')
    console.log(updateStream, 'update func')
    const [streamRequested, setStreamRequested] = useState(true)

    useEffect(()=> {
        prepareMyStream()
    }, [])

    const prepareMyStream = async() => {
        if(streamRequested && updateStream){
            updateStream({audio:true, video:true})
            setStreamRequested(false)
        }
    }

    return (
        <>
        <Card>
            <ControlPanel updateStream={updateStream} />
        </Card>
        <Card className={'h-2/3 w-8/12 m-auto'} >
            <Publisher mediaStream={mediaStream}/>
        </Card>
        </>
    )
}

export default VideoElements;