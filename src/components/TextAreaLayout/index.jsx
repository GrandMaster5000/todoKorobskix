import React from 'react'
import './index.scss';
import TextArea from '../Textarea';
import {
    Layout
} from 'mdc-react';

const TextAreaLayout = ({value, onChange, handleTextarea, labelValue, placeholder}) => {
    return (
        <Layout className='textarea-layout'>    
            <TextArea
                type='datetime-local'
                className='textarea'
                onChange={(e) => onChange(e.target.value)}
                value={value}
                placeholder={placeholder}
                onKeyDown={handleTextarea}
            />
            <label className='text-area-label' htmlFor="textarea">{labelValue}</label>
        </Layout>
    )
}

export default TextAreaLayout