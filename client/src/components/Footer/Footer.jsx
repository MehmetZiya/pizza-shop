import React from 'react'
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from 'react-icons/fa'

const Footer = () => {
  return (
    <footer>
      <p className='footerInfo'>
        &copy;Copyright 2022 | Valentino All Rights Reserved
      </p>
      <p className='footerInfo2'>
        Powered by{' '}
        <a
          href='https://www.linkedin.com/in/mzyazgan/'
          target='_blank'
          rel='noreferrer'
        >
          Mehmet Ziya Yazgan
        </a>
      </p>
      <div className='socialLinks'>
        <a href='https://www.linkedin.com/' target='_blank' rel='noreferrer'>
          <FaLinkedinIn />
        </a>
        <a href='https://www.instagram.com/' target='_blank' rel='noreferrer'>
          <FaInstagram />
        </a>
        <a href='https://www.facebook.com/' target='_blank' rel='noreferrer'>
          <FaFacebookF />
        </a>
        <a href='https://twitter.com/' target='_blank' rel='noreferrer'>
          <FaTwitter />
        </a>
      </div>
    </footer>
  )
}

export default Footer
