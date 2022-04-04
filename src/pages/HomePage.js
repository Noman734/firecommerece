import react, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { collection, addDoc, getDocs } from "firebase/firestore";
// import { fireproducts } from '../firecommerece-products';
import FireDB from '../fireConfig';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { type } from '@testing-library/user-event/dist/type';
import SearchBar from '../components/SearchBar';

function HomePage() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchKey, setSearchKey] = useState('')
    const [filterType, setFilterType] = useState('')
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {cartItems}=useSelector(state=>state.cartReducer)
    useEffect(() => {
        getData()
    }, [])
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
    //****  Function add to cart start
    useEffect(()=>{
        localStorage.setItem('cartItems',JSON.stringify(cartItems))
    },[cartItems])
const addToCart=(product)=>{
dispatch({type:'ADD_TO_CART',payload:product})

}

    //**** Function add to cart end 
    return (
        <Layout loading={loading}>
           {/* Header section start */}
           <div>
        <div class="flex justify-center mt-10">
        <div class="mb-3 xl:w-96">
          <input
            type="search"
            class="
              form-control
              block
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "
            id="exampleSearch"
            placeholder="Search"
            value={searchKey}
            onChange={(e)=>setSearchKey(e.target.value)}
          />
        </div>
        <div class="mb-3 xl:w-96 ml-10">
        <select 
         class="
         form-control
         block
         w-full
         px-3
         py-1.5
         text-base
         font-normal
         text-gray-700
         bg-white bg-clip-padding
         border border-solid border-gray-300
         rounded
         transition
         ease-in-out
         m-0
         focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
       "
       value={filterType}
       onChange={(e)=>{setFilterType(e.target.value)}}
       >
          <option>Paper Rim</option>
          <option>Glue and Gum</option>
        </select>
        </div>
      </div>
      
      </div>
           {/* Header Section End */}
            <div className='flex flex-wrap items-center justify-center'>
                {
                    products.filter(obj=>obj.category.includes(filterType))
                    .filter(obj=>obj.name.toLowerCase().includes(searchKey))
                    .map((product) => {

                        return <div class="max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 m-5 hover:border-gray-300 border-transparent border-2 hover:border-current">
                            <a href="#">
                                <img class="p-8 rounded-t-lg object-cover  h-80 w-90  hover:-translate-y-1 hover:scale-110 hover:bg-white-500 duration-300" src={product.imageUrl} alt="product image" />
                            </a>
                            <div class="px-5 pb-5">
                                <a href="#">
                                    <h3 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Name:{product.name}</h3>
                                </a>
                                <div class="flex items-center mt-2.5 mb-5">
                                    <svg class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">5.0</span>
                                </div>
                                <div class="flex justify-between items-center">
                                    <span class="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                                    <a  onClick={()=>{navigate(`/Products/${product.id}`)}} class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Description</a>
                                    <a onClick={()=>addToCart(product)} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
                                </div>
                            </div>
                        </div>
                    }
                    )
                }


            </div>

        </Layout>
    )
}
export default HomePage