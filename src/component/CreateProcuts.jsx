import axios from 'axios';
import React from 'react'
import Swal from 'sweetalert2';
import useAuth from '../hook/useAuth';
import useAxios from '../hook/useAxios';
import useAxiosSecure from '../hook/useAxiosSecure';

function CreateProcuts() {
    const { user } = useAuth();
    // const axiosInstance = useAxios();
    const axiosInstanceSecure = useAxiosSecure();
    // console.log(axiosInstance);

    const handleCreateForm = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const image = e.target.image.value;
        const min_price = e.target.min_price.value;
        const max_price = e.target.max_price.value;
        console.log(title, image, min_price, max_price)
        const newProduct = {
            title, image, min_price, max_price,
            email: user.email, seller_name: user.displayName
        };

        axiosInstanceSecure.post('/products', newProduct)
            .then(data => {
                console.log('Response:', data.data);
                if (data.data.insertedId) {

                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(err => {
                console.error('Error posting product:', err);
            });



        //     axios.post('https://smart-deal-eta.vercel.app/products', newProduct)
        //         // .then(res => res.json())
        //         .then(data => {
        //             console.log('Response:', data.data);
        //             if (data.data.insertedId) {

        //                 Swal.fire({
        //                     position: "top-end",
        //                     icon: "success",
        //                     title: "Your work has been saved",
        //                     showConfirmButton: false,
        //                     timer: 1500
        //                 });
        //             }
        //         })

        // }
    }

    return (
        <div>
            <form onSubmit={handleCreateForm} >
                <fieldset className="fieldset">
                    {/* name  */}
                    <label className="label">title</label>
                    <input type="text" name='title' className="input" />
                    {/* email  */}
                    <label className="label">Image Url</label>
                    <input type="text" name='image' className="input" />
                    {/* bide  */}
                    <label className="label">Min price</label>
                    <input type="text" name='min_price' className="input" />
                    <label className="label">Max price</label>
                    <input type="text" name='max_price' className="input" />

                    <button className="btn btn-neutral mt-4">Bid this products </button>
                </fieldset>
            </form>

        </div>
    )
}

export default CreateProcuts
