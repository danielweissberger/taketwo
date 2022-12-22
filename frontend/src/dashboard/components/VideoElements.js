import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../../shared/components/UIElements/Card.js';
import Publisher from '../components/Publisher.js'
import {useGetMediaStream} from '../../shared/components/CustomHooks/MediaStreams.js'

axios.defaults.withCredentials = true;


const VideoElements = (props) => {
    const {setQueue, myConstraints} = props;
    const [streamRequested, setStreamRequested] = useState(true)
    const [myStream, setMyStream] = useState(null)
    console.log(useGetMediaStream)
    const [generateStream] = useGetMediaStream()

    console.log(myStream?.id, 'stream id !?!?!')
    useEffect(()=> {
        console.log("WE IN HERE!?")
        setStreamRequested(true)
    }, [myConstraints])

    useEffect(()=> {
        prepareMyStream()
    }, [streamRequested, myConstraints])

    const prepareMyStream = async() => {
        if(streamRequested){
            setMyStream(await generateStream(myConstraints))
            setStreamRequested(false)
        }
    }

    return (
        <Card>
            <Publisher mediaStream={myStream}/>
        </Card>
    )
}

export default VideoElements;