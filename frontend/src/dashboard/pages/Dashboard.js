import React, {useState} from 'react';
import ControlPanel from '../components/ControlPanel/ControlPanel.js';
import VideoElements from '../components/VideoElements';
import Header from '../components/Header.js';

const Dashboard = () => {   
    const [myConstraints, setMyConstraints] = useState({audio:true, video:true})
    console.log(myConstraints, 'updated!')
    return (
    <>
    <Header/>
    <div style={{top: '14%'}} className='flex flex-col justify-center absolute w-full'>
        <div className='p-4 flex flex-col justify-center'>
            <VideoElements myConstraints={myConstraints}/>
            <ControlPanel setMyConstraints={setMyConstraints} myConstraints={myConstraints}/>
        </div>
    </div>
    </>
    )
}

export default Dashboard