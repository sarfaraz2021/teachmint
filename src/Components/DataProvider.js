import React,{createContext, useContext, useState, useEffect} from 'react'
import axios from 'axios'

const DataContext=createContext();

const DataProvider=({children})=>{
    const [data, setData] = useState([])
    const [posts, setPosts] = useState([])
    const [usersPost, setUsersPost] = useState([])
    const [worldCity, setWorldCity]= useState([])
    var postCountValue;

    const fetchData = async () => {
        try {
            const response1 = await axios.get(' https://jsonplaceholder.typicode.com/users');
            const response2 = await axios.get('https://jsonplaceholder.typicode.com/posts');
            const response3= await axios.get('http://worldtimeapi.org/api/timezone')
            // Check if both promises have been fulfilled
            Promise.all([response1, response2,response3]).then(() => {
                setData(response1.data);
                setPosts(response2.data);
                setWorldCity(response3.data)
                console.log('Both promises have been fulfilled.', response1.data, response2.data);
                countUserPost(response1.data, response2.data)
                // console.log("---------------",usersPost)
            });
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const countUserPost = (users, postsUser) => {
        const updatedUsersPost = [];
        for (const obj1 of users) {
            var postCount = {
                id: obj1.id,
                count: 0
            }
            console.log("post count for obj1", postCount)
            for (const obj2 of postsUser) {
                if (obj2.userId === postCount.id) {
                    postCount.count += 1;
                    // setPostCount((previous)=>({...previous, count:previous.count+1}))
                    console.log("post count for obj2", postCount)
                }

            }
            updatedUsersPost.push(postCount)

        }
        console.log(updatedUsersPost)
        setUsersPost(updatedUsersPost)
        //   setUsersPost((prev)=>({...prev,updatedUsersPost}))
    }

    useEffect(() => {
        fetchData();
    }, [])

    const value={
        data,
        posts,
        usersPost,
        worldCity
    }

    
 return <DataContext.Provider value={value}>{children}</DataContext.Provider>
    
}
export {DataContext, DataProvider}

export function useData() {
  return useContext(DataContext)
}