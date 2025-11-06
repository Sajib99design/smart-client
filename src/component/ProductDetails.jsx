import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContent } from '../provider/authContent';
import Swal from 'sweetalert2';
import axios from 'axios';

function ProductDetails() {
    const { user } = useContext(AuthContent);
    const [userBid, setUserBid] = useState([]);
    // console.log(user);
    const detailsData = useLoaderData();


    // console.log(detailsData)
    const { _id, title, category, description, image, price_min } = detailsData;
    const bideModal = useRef(null);

    // useEffect(() => {
    //     fetch(`https://smart-deal-eta.vercel.app/products/bids/${_id}`, {
    //         headers: {
    //             authorization: `Bearer ${user.accessToken}`
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             // console.log(data);
    //             return setUserBid(data)
    //         })
    // }, [_id, user]);

    useEffect(() => {
        axios.get(`https://smart-deal-eta.vercel.app/products/bids/${_id}`)
            .then(data => {
                setUserBid(data.data)
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }, [_id]);

    const handleModal = () => {
        bideModal.current.showModal();
    };

    const handleBideForm = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const bid = e.target.bid.value;
        console.log(name, email, bid, _id)
        const newBid = {
            product: _id,
            buyer_name: name,
            buyer_email: email,
            bid_price: bid
        };

        // fetch('https://smart-deal-eta.vercel.app/bids', {
        //     method: 'POST',
        //     headers: {
        //         'Content-type': 'application/json'
        //     },
        //     body: JSON.stringify(newBid)
        // })
        axios.post('https://smart-deal-eta.vercel.app/bids', newBid)
            // .then(res => res.json())
            .then(data => {
                console.log('Response:', data.data);
                if (data.data.insertedId) {
                    bideModal.current.close();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    newBid.product = data.insertedId;
                    const newBids = [...userBid, newBid];
                    newBids.sort((a, b) => b.bid_price - a.bid_price);
                    setUserBid(newBids);
                }
            })

    }

    return (
        <div>
            {/* product info  */}
            <div className='grid grid-cols-2'>
                <div> <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde fuga quas saepe impedit esse dicta commodi eaque deserunt aliquam possimus.</p></div>
                <div>
                    <h2 className='text-2xl text-primary font-bold'>{title}</h2>
                    <p>{price_min}</p>
                    <button onClick={handleModal} className='btn btn-primary'>I want Buy this Product </button>



                    <dialog ref={bideModal} className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Hello!</h3>
                            <p className="py-4">Press ESC key or click the button below to close</p>
                            <form onSubmit={handleBideForm} >
                                <fieldset className="fieldset">
                                    {/* name  */}
                                    <label className="label">Name</label>
                                    <input type="text" name='name' className="input" defaultValue={user?.displayName} />
                                    {/* email  */}
                                    <label className="label">Email</label>
                                    <input type="email" name='email' className="input" defaultValue={user?.email} />
                                    {/* bide  */}
                                    <label className="label">Your bide</label>
                                    <input type="text" name='bid' className="input" />

                                    <button className="btn btn-neutral mt-4">Bid this products </button>
                                </fieldset>
                            </form>
                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            </div>
            {/* bids for this product  */}
            <div>
                <h3>Bids for this Product  <span>{userBid?.length}</span> </h3>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    <label>
                                        SL
                                    </label>
                                </th>
                                <th>Name</th>
                                <th>Job</th>
                                <th>Favorite Color</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {userBid.map((bid, id) =>
                                <tr>
                                    <th>
                                        <label>
                                            {id + 1}
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{bid.buyer_name} </div>
                                                <div className="text-sm opacity-50">United States</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {bid.buyer_email}
                                        <br />
                                        <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                                    </td>
                                    <td>{bid.bid_price}</td>
                                    <th>
                                        <button className="btn btn-ghost btn-xs">details</button>
                                    </th>
                                </tr>)}
                            {/* row 2 */}

                        </tbody>
                        {/* foot */}

                    </table>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
