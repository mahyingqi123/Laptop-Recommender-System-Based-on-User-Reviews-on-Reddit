'use client';
import {useRouter} from 'next/navigation'
import "./backbutton.scss";

const BackButton = () => {
    const router = useRouter();


    return (
        <button className="back-button" onClick={router.back}>Back</button>
    );
}

export default BackButton;