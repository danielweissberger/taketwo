import React, {useState} from 'react';

const useGetMediaStream = () => {
    const generateStream = async(constraints) => {
        console.log('getting called?!?!', constraints)
        constraints = constraints? constraints : {audio: true, video: true}
        return await navigator.mediaDevices.getUserMedia(constraints)
    }

    return [generateStream]
}


const useGetLatestUserDevices = () => {
    const [currentDevices, setCurrentDevices] = useState({audioinput:[], videoinput: [], audiooutput: []})
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