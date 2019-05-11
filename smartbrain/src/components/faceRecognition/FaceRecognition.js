import React from 'react';

const FaceRecognition = ({imageUrl}) => {
    return (
        <div className='center'>
            <img alt='user pic' src={imageUrl}/>
        </div>
    )
}

export default FaceRecognition;