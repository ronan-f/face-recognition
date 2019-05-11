import React from 'react';
import './imagelinkform.css'


const ImageLinkForm = ({onInput}) => {
    return (
        <div>
            <p className='f3'>
                {'This app can detect faces in your pictures!'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center'type='text' onChange={onInput} />
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'>Detect Face</button>
                </div>

            </div>
        </div>
    )
}

export default ImageLinkForm;

