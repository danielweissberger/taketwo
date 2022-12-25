import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {setConstraints} from '../../../redux/reducers/videoReducer'

const buildConstraintsPayload = ({audioinput, videoinput}) => ({
    audio: {
        deviceId: audioinput
    },
    video: {
        deviceId: videoinput
    }
})

const useGetMediaStream = () => {
    const dispatch = useDispatch();
    const generateStream = async({ audioinput, videoinput }) => {
        console.log("REGENERAING")
        let constraints = buildConstraintsPayload({ audioinput, videoinput })
        console.log('getting called?!?!', constraints)
        constraints = constraints? constraints : {audio: true, video: true}
        const stream =  await navigator.mediaDevices.getUserMedia(constraints)
        console.log(stream.getTracks(), 'track info??')
        const videoTrack = stream?.getTracks()?.find(track => track.kind === "video");
        const videoID = videoTrack?.getSettings().deviceId;
        const audioTrack = stream?.getTracks()?.find(track => track.kind === "audio");
        const audioID = audioTrack?.getSettings().deviceId;
        console.log(videoID, audioID, 'this!?!?')
        dispatch(setConstraints({audioinput: audioID, videoinput: videoID}));
        return stream;
    }

    return [generateStream]
}


const useGetLatestUserDevices = () => {
    const [currentDevices, setCurrentDevices] = useState({audioinput:[], videoinput: [], audiooutput: []})

    useEffect(() => {
        navigator.mediaDevices.ondevicechange = () => {
            refreshDevices();
          };
    }, [])

    const refreshDevices = async() => {
        const formattedDevices = {audioinput:[], videoinput: [], audiooutput: []}
        const devices = await navigator.mediaDevices.enumerateDevices()    
        devices.map(device=> {
            formattedDevices[device.kind].push(device)
        })
        console.log(formattedDevices)
        setCurrentDevices(formattedDevices)
    }
    return [currentDevices, refreshDevices]
}


export {useGetMediaStream, useGetLatestUserDevices}