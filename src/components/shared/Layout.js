import React from 'react'

// Layout will not be self-closing
// We will put components (or anything really) inside of an
// opening and closing Layout tag
const Layout = ({ children }) => (
  <div>
    {children}
  </div>
)

export default Layout
