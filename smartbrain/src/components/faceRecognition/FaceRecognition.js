import React, { Fragment } from 'react';
import './face.css'

const FaceRecognition = ({imageUrl, box, loading}) => {
    return (
        <div className='center ma'>
            { loading ?
                <h1>Loading...</h1>
            : <div className='absolute mt2'>
                { imageUrl ?
                    <Fragment>
                        <img id='inputImage' alt='user pic' src={ imageUrl } width='500px' height='auto'/>
                        <div className='bounding-box' style={{top: box.topRow, right: box.rightColumn, bottom: box.bottomRow, left: box.leftColumn}}></div>
                    </Fragment>
                : <h1>Input an image URL to get started</h1>
                }
            </div>
            }
        </div>
    )
}

export default FaceRecognition;