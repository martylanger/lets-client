import React from 'react'

// import Nav from './Nav'
import Footer from './Footer'
import Header from './Header'
import Auth from '../Auth/Auth'

const Layout = props => (
  <div>
    <Header user={props.user} />
    <Auth />
    <h1>Let&#39;s</h1>

    {props.children}

    <Footer />
  </div>
)

export default Layout
