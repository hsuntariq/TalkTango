import { useEffect, useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser, reset } from "../features/auth/authSlice";

const RegForm = () => {
    const [imageUploaded, setImageUploaded] = useState(false);

    // to dispatch function

    const dispatch = useDispatch()
    // to navigate to different pages
    const navigate = useNavigate()
    // get the user from the state
    const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    // hold the input values
    const [formData, setFormData] = useState({
        username: '', email: '', password: ''

    })
    // password word to check the strong password
    const [passwordStrength, setPasswordStrength] = useState({
        hasSpecialChar: false,
        hasCapitalLetter: false,
        hasNumber: false,
        isLengthValid: false
    });


    // handle the password change

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;

        // Password strength criteria
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        const capitalLetterRegex = /[A-Z]/;
        const numberRegex = /[0-9]/;

        const hasSpecialChar = specialCharRegex.test(newPassword);
        const hasCapitalLetter = capitalLetterRegex.test(newPassword);
        const hasNumber = numberRegex.test(newPassword);
        const isLengthValid = newPassword.length >= 8;

        setPasswordStrength({
            hasSpecialChar,
            hasCapitalLetter,
            hasNumber,
            isLengthValid
        });

        setFormData((prevVal) => ({
            ...prevVal,
            password: newPassword
        }));
    };

    // destructure the form data
    const { username, email, password } = formData;
    // hold the phone value
    const [phone, setPhone] = useState('');
    // handle the change
    const handleChange = (e) => {
        setFormData((prevVal) => ({
            ...prevVal,
            [e.target.name]: e.target.value
        }))
    }




    // handle the image input field change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        setImagePreview(url);
        setImage(file);
    }

    // upload the image to the cloudinary server
    const uploadImage = async () => {
        if (image) {

            const data = new FormData();
            data.append('file', image);
            data.append('upload_preset', 'vgvxg0kj');
            try {
                setImageUploaded(true);
                const res = await fetch('https://api.cloudinary.com/v1_1/djo5zsnlq/image/upload', {
                    method: 'POST',
                    body: data
                })

                const imageUrl = await res.json();
                setImageUploaded(false)
                return imageUrl.url

            } catch (error) {
                console.log(error)
            }
        }

    }




    // handle the button click

    const handleImageUpload = async () => {
        if (image) {
            const userImage = await uploadImage(image);
            return userImage;
        } else {
            return null;
        }
    }


    const [numError, setNumError] = useState(false);
    const [letterError, setLetterError] = useState(false);
    const [specialError, setSpecialError] = useState(false);
    const [LengthError, setLengthError] = useState(false);

    // handle the click
    const handleClick = async (e) => {
        e.preventDefault()
        const userImage = await handleImageUpload();
        e.preventDefault();
        const userData = {
            username,
            email,
            password,
            phone,
            image: userImage
        }
        let hasError = false;

        if (!username || !email || !password || !phone) {
            toast.error('Please enter the relevant fields!');
            hasError = true;
        }

        if (!passwordStrength.hasNumber) {
            setNumError(true);
            hasError = true;
        } else {
            setNumError(false);
        }

        if (!passwordStrength.hasCapitalLetter) {
            setLetterError(true);
            hasError = true;
        } else {
            setLetterError(false);
        }

        if (!passwordStrength.hasSpecialChar) {
            setSpecialError(true);
            hasError = true;
        } else {
            setSpecialError(false);
        }

        if (!passwordStrength.isLengthValid) {
            setLengthError(true);
            hasError = true;
        } else {
            setLengthError(false);
        }

        if (!hasError) {
            dispatch(registerUser(userData));
        }
    };









    // redirect the user to the homepage
    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess) {
            navigate(`/verify/${user?.newUser?._id}`)
        }


        dispatch(reset())

    }, [isError, isSuccess, navigate, message, user, dispatch])

    return (
        <>
            <form className="w-full d-flex flex-col items-center justify-center">
                <div className="image relative">
                    <FaCirclePlus size={20} className="absolute bottom-0 font-bold right-0 border p rounded-full z-22 text-orange-500" />
                    <img className="w-[200px] mb-2 h-[200px] small-img block mx-auto" src={imagePreview ? imagePreview : 'https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png'} alt="" />
                    <input type="file" onChange={handleImageChange} className="absolute bottom-0 opacity-0 w-full cursor-pointer " name="" id="" />

                </div>
                <input name="username" value={username} onChange={handleChange} type="text" placeholder="Username..." className="mb-1 p-1 rounded focus:border-orange-500 shadow-md  w-full  border border-orange-100 outline-none" />
                <input name="email" value={email} onChange={handleChange} type="text" placeholder="Email..." className="mb-1 p-1 rounded focus:border-orange-500 shadow-md  w-full  border border-orange-100 outline-none" />

                <input name="password" value={password} onChange={handlePasswordChange} type="password" placeholder="password..." className="mb-1 p-1 rounded  focus:border-orange-500 shadow-md  w-full  border border-orange-100 outline-none" />
                {numError && <p className="text-red-600 font-bold">
                    Password must include a number
                </p>}
                {letterError && <p className="text-red-600 font-bold">
                    Password must include a capital letter
                </p>}
                {specialError && <p className="text-red-600 font-bold">
                    Password must include a special Character
                </p>}
                {LengthError && <p className="text-red-600 font-bold">
                    Password must be 8 characters long
                </p>}
                <PhoneInput country={'pk'} value={phone} className='mb-1 rounded  focus:border-orange-500 shadow-md w-full border border-orange-100 outline-none' onChange={(value) => setPhone(value)}
                    placeholder={'+92 315 1248441'}
                />
                <button disabled={imageUploaded} onClick={handleClick} className={`w-full rounded bg-orange-500 text-white p-1 hover:bg-orange-700 transition-all ${imageUploaded && 'cursor-not-allowed diabled'}`}>
                    {imageUploaded ? 'Registreing...' : 'Register'}
                </button>
            </form>
        </>
    )
}

export default RegForm
