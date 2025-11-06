import React, { useContext, useEffect, useState } from 'react'
import { AuthContent } from '../provider/authContent'
import Swal from 'sweetalert2';
import useAxiosSecure from '../hook/useAxiosSecure';


function Mybids() {
    const { user, loading, setLoading } = useContext(AuthContent);
    const [bids, setBids] = useState([]);
    const interceptor = useAxiosSecure();

    useEffect(() => {
        if (user?.email) {
            setLoading(true);
            interceptor.get(`/bids?email=${user.email}`)
                .then(data => {
                    setBids(data.data);
                    setLoading(false); // ✅ এখানেই false করা ঠিক
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false); // error হলে ও false কর
                });
        }
    }, [user]); // ✅ dependency শুধু user.email

    const handleDeleteBid = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://smart-deal-eta.vercel.app/bids/${id}`, {
                    method: 'Delete'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            const remainBids = bids.filter(bid => bid._id !== id);
                            setBids(remainBids);
                        };
                    });

            }
        });
    };

    return (
        <>
            {
                loading ? (
                    <div>
                        <h2 className='text-center'> loading......  </h2>
                    </div>
                ) :
                    (
                        <div>
                            <h2>{bids.length}</h2>
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
                                        {bids.map((bid, id) =>
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
                                                <td>
                                                    {
                                                        bid.status === 'pending' ?
                                                            <div className='badge badge-warning'>Pending</div> :
                                                            <div className='badge badge-success'>Success</div>
                                                    }
                                                </td>
                                                <th>
                                                    <button onClick={() => handleDeleteBid(bid._id)} className="btn btn-outline btn-xs">Remove </button>
                                                </th>
                                            </tr>)}
                                        {/* row 2 */}

                                    </tbody>
                                    {/* foot */}

                                </table>
                            </div>
                        </div>
                    )
            }
        </>
    );
}

export default Mybids;
