import React from 'react'
import { Outlet } from 'react-router-dom'
import { DataProvider } from './DataProvider'

const DataComponent=()=>{
    return(
        <DataProvider>
            <Outlet/>
        </DataProvider>
    )
}
export {DataComponent}