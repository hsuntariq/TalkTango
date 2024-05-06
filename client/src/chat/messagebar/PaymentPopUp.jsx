/* eslint-disable react/prop-types */
import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { MdOutlineAttachMoney } from 'react-icons/md';
import { money } from './money';

export default function BasicPopover({ buy }) {
    const [items, setItems] = React.useState(money)
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // const buy = async (data) => {
    //     const response = await fetch('http://localhost:5174/api/checkout', {
    //         method: "POST",
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ item: data })
    //     })

    //     const d = await response.json()
    //     window.location.assign(d.url)
    //     // console.log(d)
    // }



    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <li aria-describedby={id} onClick={handleClick} className="flex cursor-pointer relative hover:bg-gray-700 transition px-3 py-1 my-2 gap-3 items-center text-1xl">
                <div className="icon">
                    <MdOutlineAttachMoney />
                </div>
                <div className="text"> Payment</div>
            </li>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <h1 className="text-3xl text-center">
                    Send Gift
                </h1>
                <div className="flex justify-between">
                    {items?.map((item, index) => {
                        return (
                            <>
                                <div onClick={() => buy(item)} className="flex flex-col items-center cursor-pointer ">

                                    <img width={50} src={item?.image} alt="" />
                                    <h5 className="font-bold p-0 m-0">
                                        ${item.price}
                                    </h5>
                                </div>
                            </>
                        )
                    })}
                </div>
            </Popover>
        </div>
    );
}
