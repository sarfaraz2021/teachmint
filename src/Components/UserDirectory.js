import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import UserCard from './Card';
import { useData } from './DataProvider';

const UserDirectory = () => {

    var postCountValue;
    const {data,usersPost}=useData()
    return (
        <div className="container mt-5">
            <h2>Directory</h2>
            <div className="row">
                {data?.map(user => {
                    for (const obj of usersPost) {
                        console.log("@@@@@@@@", obj)
                        if (obj.id === user.id) {
                            postCountValue = obj.count
                            break;
                        }
                    }
                    return (
                        <div className="col-10 mb-2 mx-auto" key={user.id}>
                            <Link to={`${user.id}`}>
                            <UserCard user={user.name} postCount={postCountValue} />
                            </Link>
                        </div>)
                })}
            </div>
        </div>
    );
}
export default UserDirectory;