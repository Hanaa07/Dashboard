import React, {useState} from 'react';
import Sidebar from "./Sidebar.tsx";
import Topbar from "./Topbar.tsx";


type Props = {
    showTopAndSideBar: boolean;
    children: React.ReactNode;
}

const layout = (props: Props) => {
    const {showTopAndSideBar= true, children} = props;

    return (
        <>
            {showTopAndSideBar && <Topbar/>}
            {showTopAndSideBar && <Sidebar/>}
            <div>
                {children}
            </div>
        </>
    )
}

export default layout;