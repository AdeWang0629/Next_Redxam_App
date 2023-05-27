import React from 'react'
import './TextHero.css'

export default function TextHero({img, title, titleColor, titleExtended, titleExtendedColor, description, bgColor}) {
  return (
    <div style={{color: titleExtendedColor, backgroundColor: bgColor}} className='text-hero-container'>
        <div className="left">
            <img src={img}/>
        </div>
        <div className="right">
            <span style={{color: titleColor}} className='title'>{title}</span>
            <span className='title-extended'>{titleExtended}</span>
            <p>{description}</p>
        </div>
    </div>
  )
}
