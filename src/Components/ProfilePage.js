// ProfilePage.js

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useData } from './DataProvider';
import DigitalClock from './DigitalClock';
import Modal from './Modal';



const ProfilePage = () => {


    const [time, setTime] = useState(null);
    const [isRunning, setIsRunning] = useState(true);
    const [city, setCity] = useState('Asia/Kolkata')
    const [profileData, setProfileData] = useState({})
    const [isOpen, setIsOpen] = useState(false)
    const [modalData, setModalData] = useState()

    const { worldCity, posts } = useData()
    const params = useParams()
    const navigate=useNavigate()
    const userId = params.userId

    const openModal = (post) => {
        setModalData(post)
        setIsOpen(true)
        console.log("modal open", post)
    }

    const closeModal = () => {
        setIsOpen(false);
    };


    const databyId = useMemo(() => {
        axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
            .then((response) => {
                setProfileData(response.data)
                console.log("profile data", response.data)
                return response.data
            })
    }, [])

    useEffect(() => {
        console.log("changed city", city)
        axios.get(`http://worldtimeapi.org/api/timezone/${city}`)
            .then((response) => {
                setTime(new Date(response.data.datetime))
                console.log("--------------------------------------------",time)
            })
            .catch((error) => console.log(error))
    }, [city])



    const onChangeHandler = (e) => {
        console.log("what is this", e.target.value)
        setCity(e.target.value)
    }

    const backButtonHandler=()=>{
        navigate(-1);
    }
    return (
        <div className="profile-container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="btn btn-color" onClick={backButtonHandler}>Back</button>
                <div className='ml-auto mr-2'>
                    country dropdown:{' '}
                    <select onChange={onChangeHandler} value={city}>
                        {worldCity.map(newcity => (
                            <option key={newcity} value={newcity}>
                                {newcity}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='mx-2'>
                    {time &&
                        <DigitalClock offsetTime={time} start={isRunning} />
                    }
                </div>
                <button onClick={() => setIsRunning(!isRunning)}>Pause/Start</button>
                {/* <div className='mx-2' >
                    <button >Pause/Start</button>
                </div> */}

            </nav>

            <div className="container">
                <div className='text-center my-3'><h3>Profile Page</h3></div>
                <div className='row profile-style py-3'>
                    <div className="col-6">
                        <div className="container">
                            <div className="row text-left">
                                <div className='col'>
                                    Name
                                </div>
                            </div>
                            <div className="row text-left">
                                <div className='col'>
                                    {profileData?.name} &nbsp;|&nbsp;{profileData?.company?.catchPhrase}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="container">
                            <div className="row text-right">
                                <div className='col'>
                                    Address
                                </div>
                            </div>
                            <div className="row text-right">
                                <div className='col'>
                                    {profileData?.email} &nbsp;|&nbsp;{profileData?.phone}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="container">
                <div className="row justify-content-between text-wrap">
                    {
                        posts?.map((post) => {

                            if (post.userId == userId) {
                                return (
                                    <div key={post.id} className="col-md-3 col-sm-6 m-2">
                                        <div className="card post-style" onClick={() => openModal(post)}>
                                            <div className="card-body">
                                                <div className="card-title font-weight-bold">{post.title}</div>
                                                <div className="card-text">{post.body}</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        }
                        )}
                </div>
            </div>
            <Modal
                isOpen={isOpen}
                onClose={closeModal}
                post={modalData}
            />

        </div>
    );
};

export default ProfilePage;
