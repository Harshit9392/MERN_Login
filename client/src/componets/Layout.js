import { Outlet } from 'react-router-dom'
import nav from './nav'
import image from './img/some3.jpeg';

const DashLayout = () => {
    const desktopWidth = window.innerWidth;
    const desktopHeight = window.innerHeight;

    return (
        <>
            <div className="dash-container">
                <Outlet />
            </div>
            <img src={image} alt="My Image" style={{ width: `${desktopWidth}px`, height: `${desktopHeight}px` }} />
        </>
    )
}

export default DashLayout;