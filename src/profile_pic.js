import React from 'react';

export default function ProfPic({fname, sname, onClick, pic='/images/mario-default.jpg'}) {
    return (
        <img src={pic} alt={`${fname} ${sname}`} onClick={onClick}/>
    );
}