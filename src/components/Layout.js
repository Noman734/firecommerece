import React from 'react'
import Header from './Header'
import Loader from './Loader'
// import Footer from './Footer'
function Layout(props){
    return(
       
        <div>   
             <Header/>
             {props.loading && (<Loader/>)}
           <div className='Content'>
                {props.children}
           </div>

            {/* <Footer/> */}
        </div>
    )
}

export default Layout