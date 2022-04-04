import react, { useState } from 'react'
import Layout from '../components/Layout'
import {getAuth,signInWithEmailAndPassword } from "firebase/auth";

function LoginPage(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const auth=getAuth()
    const login = async () => {
        
        try {
          const result=await signInWithEmailAndPassword(auth,email, password)
            alert("Login sucessfull")
            console.log(result)
        }
        catch (error) {
            console.log(error)
            alert("Login failed")
        }
    }
    return(
<Layout >
<div class="bg-[url('https://images6.alphacoders.com/448/thumb-1920-448562.jpg')] min-h-screen flex flex-col bg-center">
             
            </div>
</Layout> 
    )
}

export default LoginPage