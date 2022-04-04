import react, { useState } from 'react'
import Layout from '../components/Layout'
import {getAuth,createUserWithEmailAndPassword } from "firebase/auth";
function RegistrationPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setcPassword] = useState('')
    const auth=getAuth()
    const register = async () => {
        
        try {
          const result=await createUserWithEmailAndPassword(auth,email, password)
            alert("registration sucessfull")
            console.log(result)
        }
        catch (error) {
            console.log(error)
            alert("Registeration failed")
        }
    }
    return (

        <Layout>
            <div class="bg-[url('https://images6.alphacoders.com/448/thumb-1920-448562.jpg')] min-h-screen flex flex-col bg-center">
                <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div class="bg-transparent px-6 py-8 rounded shadow-inner border-solid border-2 border-indigo-600 text-black w-full hover:-translate-y-1 hover:scale-110 hover:bg-white-500 duration-300">
                        <h1 class="mb-8 text-3xl text-center">Sign up</h1>

                        <input
                            type="text"
                            class="block border border-grey-light w-full p-3 rounded mb-4"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />


                        <input
                            type="password"
                            class="block border border-grey-light w-full p-3 rounded mb-4"
                            name="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => { setPassword(e.target.value) }} />
                           
                        <input
                            type="password"
                            class="block border border-grey-light w-full p-3 rounded mb-4"
                            name="confirm_password"
                            value={cpassword}
                            placeholder="Confirm Password"
                            onChange={(e) => { setcPassword(e.target.value) }} />

                        <div class="flex justify-center items-center">
                            <a onClick={register} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Account</a>
                        </div>
                    </div>

                    <div class="text-grey-dark mt-6">
                        Already have an account?
                        <a class="no-underline border-b border-blue text-blue" href="../login/">
                            Log in
                        </a>.
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default RegistrationPage