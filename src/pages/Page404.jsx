import React from 'react';
import Button from '../components/button/Button';
import { useNavigate } from 'react-router-dom';

const Page404 = () => {
    const navigate = useNavigate()
    return (
        <div className='flex flex-col justify-center items-center pt-10 gap-8'>
            <h1 className='text-5xl text-primary'>Sorry :(</h1>
            <img src="./src/assets/404-error.png" alt="" className=''/>
            <Button className={"w-auto"} onClick={() => navigate("/")}>Back to Home</Button>
        </div>
    );
};

export default Page404;