import { react, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRoutes } from 'react-router-dom'
import FireDB from '../fireConfig';
import { collection, addDoc, getDocs, setDoc, doc } from "firebase/firestore";
import Layout from '../components/Layout'
import { getAllByPlaceholderText } from '@testing-library/react';

function AdminPage() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const { cartItems } = useSelector(state => state.cartReducer)
    const [totalAmount, setTotalAmount] = useState(0)
    const [showModal, setShowModal] = useState(false);
  
    const [showAddProduct, setShowAddProduct] = useState(false);

    const [product, setProduct] = useState(
        {
            name: "",
            price: 0,
            imageUrl: "",
            category: "",
            Description:""
        }
    )

    const dispatch = useDispatch()
    const editHandler = (item) => {
        setProduct(item)
        setShowAddProduct(false)
        setShowModal(true)
    }

    const addHandler = () => {
        setProduct('')
        setShowAddProduct(true)
        setShowModal(true)
    }

    let name,value;
    const changeHandler=(event)=>{
   name=event.target.name
   value=event.target.value
   setProduct({...product,[name]:value})
   console.log(product)
    }
    //*****Get Data to fire base start
    async function getData() {
        setLoading(true)
        try {
            const users = await getDocs(collection(FireDB, "products"));
            const productsArray = []
            users.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                const obj = {
                    id: doc.id,
                    ...doc.data()
                }
                productsArray.push(obj)
            });

            setProducts(productsArray)
            console.log("use state array :", products)
            setLoading(false)
        }
        catch (error) {
            console.log(error)
            setLoading(false)
        }

    }
    //*** End */

    useEffect(() => {
        let temp = 0
        cartItems.forEach((cartItem) => {
            temp = temp + cartItem.price
        });
        setTotalAmount(temp)
    }, [cartItems])

    useEffect(() => {
        getData()
    }, [])
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems])

    const deleteFromCart = (product) => {
        dispatch({ type: 'DELETE_FROM_CART', payload: product })

    }

    // ****** update product function
    const updateProduct = async () => {
        try {
            await setDoc(doc(FireDB, "products", product.id), product)
            alert("product updated sucessfully");
        }
        catch (error) {
            console.log(Error)
            alert("product update failed")
        }
    }

    // ****** End

    
    // ****** update product function
    const addProduct = async () => {
        try {
            await addDoc(collection(FireDB, "products"), product)
            alert("Added  sucessfully");
        }
        catch (error) {
            console.log(Error)
            alert("Add failed")

        }
    }


    // ****** End

    return (
        <Layout>
            <div class="flex flex-col">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                        <div class="overflow-hidden shadow-md sm:rounded-lg">

                            <div class="grid grid-rows-2 grid-flow-col gap-8">
                                <div class="row-span-3 col-span-12 ...">
                                    <div class="content-center">
                                        <p class="text-4xl text-center text-blue-600 mb-5 hover:animate-bounce">LIST OF PRODUCTS</p>

                                    </div>
                                </div>

                                <div class="row-span-2 col-span-1 ...">
                                    <button type="button" class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                        onClick={addHandler}
                                    >Add Products</button>
                                </div>
                            </div>

                            <table class="min-w-full">
                                <thead class="bg-gray-100 dark:bg-gray-700">
                                    <tr>
                                        <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                            Image
                                        </th>
                                        <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                            Name
                                        </th>
                                        <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                            Color
                                        </th>
                                        <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                            Category
                                        </th>
                                        <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                            Price
                                        </th>
                                        <th scope="col" class="relative py-3 px-6">
                                            <span class="sr-only">Edit</span>
                                        </th>
                                        <th scope="col" class="relative py-3 px-6">
                                            <span class="sr-only">Delete</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products.map((items) => {
                                            return <tr class="border-b odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 dark:border-gray-600">
                                                <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    <img class="mb-3 w-20 h-20  shadow-lg  hover:-translate-y-1 hover:scale-110 hover:bg-white-500 duration-300" src={items.imageUrl} alt="Bonnie image" />
                                                </td>
                                                <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {items.name}
                                                </td>
                                                <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                    black
                                                </td>
                                                <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                    stationary Item
                                                </td>
                                                <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                    ${items.price}
                                                </td>
                                                <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                                                    <button class="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:-translate-y-1 hover:scale-110 hover:bg-white-500 duration-150" type="button"
                                                        onClick={() => {
                                                            deleteFromCart(items)

                                                        }}
                                                    >
                                                        Remove
                                                    </button>

                                                </td>
                                                <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                                                    <button class="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:-translate-y-1 hover:scale-110 hover:bg-white-500 duration-150" type="button"
                                                        onClick={() => editHandler(items)}
                                                    >
                                                        Edit
                                                    </button>

                                                </td>
                                            </tr>
                                        })

                                    }


                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
            {/* Model start update product */}
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        {showAddProduct===true?'Add Your Product':'Update your product'}
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <form class="w-full max-w-sm">
                                        <form class="w-full max-w-lg">
                                            <div class="flex flex-wrap -mx-3 mb-6">
                                                <div class="w-full px-3">
                                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                                        Product Name
                                                    </label>
                                                    <input onChange={changeHandler} name="name"  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" value={product.name} id="grid-first-name" type="text" placeholder="Jane" />
                                                </div>

                                            </div>
                                            <div class="flex flex-wrap -mx-3 mb-6">
                                                <div class="w-full px-3">
                                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                                        Product Price
                                                    </label>
                                                    <input onChange={changeHandler}  value={product.price} name="price" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="500" />
                                                </div>

                                            </div>
                                            <div class="flex flex-wrap -mx-3 mb-6">
                                                <div class="w-full px-3">
                                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                                        Product Category
                                                    </label>
                                                    <input onChange={changeHandler}  value={product.category} name="category" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" />
                                                </div>

                                            </div>
                                            <div class="flex flex-wrap -mx-3 mb-6">
                                                <div class="w-full px-3">
                                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                                        Product Image
                                                    </label>
                                                    <input onChange={changeHandler}  value={product.imageUrl} name="imageUrl" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" />
                                                </div>

                                            </div>
                                            <div class="flex flex-wrap -mx-3 mb-6">
                                                <div class="w-full px-3">
                                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                                        Description
                                                    </label>
                                                    <input onChange={changeHandler}  value={product.Description} name="Description" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" />
                                                </div>

                                            </div>

                                        </form>
                                    </form>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    {
                                        showAddProduct ? <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 animate-bounce "
                                        type="button"
                                        onClick={addProduct}
                                    >
                                        Add Product
                                    </button>:
                                     <button
                                     className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 animate-bounce "
                                     type="button"
                                     onClick={updateProduct}
                                 >
                                     Update Product
                                 </button>
                                    }
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}

            {/* Model end update product */}

         

        </Layout>
    )
}

export default AdminPage