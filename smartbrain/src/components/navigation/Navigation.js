import React from 'react';

const Navigation = ({signedIn, onRouteChange}) => {
    if(signedIn) {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange('signout')} className='fs link dim black underline pa3 pointer'>Sign Out</p>
            </nav>
        )

    } else {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange('register')} className='fs link dim black underline pa3 pointer'>Register</p>
                <p onClick={() => onRouteChange('signin')} className='fs link dim black underline pa3 pointer'>Sign In</p>
            </nav>
        )
    }
}

export default Navigation;