import React from 'react'
import Header from './Header'
// import Footer from './Footer'
function Loader(props) {
    return (
<div class="flex items-center justify-center">
  <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
    )
}

export default Loader