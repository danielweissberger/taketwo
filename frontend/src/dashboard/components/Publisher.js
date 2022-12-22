import React, {useEffect, useRef} from 'react';
import { Menu, MenuList, MenuButton, MenuItem } from '@reach/menu-button';
import {useHistory, useLocation} from 'react-router-dom';
const axios = require("axios");

const Publisher =  (props) => {
    const {mediaStream} =   props
    const videoRef = useRef()

    useEffect(()=> {
        if(!mediaStream?.id) return;
        console.log("setting", mediaStream)
        videoRef.current.srcObject= mediaStream
        videoRef.current.play();
    }, [mediaStream?.id])

    if(!mediaStream?.id){
        return (
            <div className='w-full h-24 p-4 bg-gray-300 flex flex-row justify-between items-center border-b border-gray-800'>
                <h1>Rendering Video...</h1>
            </div>
        )
    }

    return (

            <video className='h-full' ref={videoRef}></video>

    )
}

export default Publisher;