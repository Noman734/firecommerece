import react, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { getDoc ,doc} from "firebase/firestore";
import FireDB from '../fireConfig';
import { useParams } from 'react-router-dom';

function ProductInfo(){
    const [product, setProduct] = useState([])
    const params =useParams()
    useEffect(() => {
        console.log("use state called")
        getData()
    }, [])

    //*****Get Data to fire base start
    async function getData() {
        try {
            const productTemp = await getDoc(doc(FireDB, "products",params.productid));
           console.log("product id is",params.productid)
            setProduct(productTemp.data())
            console.log("use state array in product info :", product)
        }
        catch (error) {
            console.log(error)
        }

    }
    //*** End */

    return(
<Layout >

{product && (<div className='flex flex-wrap items-center justify-center'>
    <div class="max-w-xl bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 mt-10 mb-10">
    <div class="flex justify-center px-10 pt-15">
        <p class="font-bold text-4xl flex justify-center mb-5 mt-5">Product Description</p>
    </div>
    <div class="flex flex-col items-center pb-10 ml-10 mr-10">
        <img class="mb-3 w-400 h-400  shadow-lg  hover:-translate-y-1 hover:scale-110 hover:bg-white-500 duration-300" src={product.imageUrl} alt="Bonnie image"/>
        <h3 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{product.Description}</h3>
     
        <div class="flex mt-4 space-x-3 lg:mt-6">
            <a href="#" class="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
        </div>
    </div>
</div>
</div>

)

}
</Layout> 
    )
}

export default ProductInfo