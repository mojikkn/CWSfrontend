'use client'
import { useSession } from 'next-auth/react';
import { useState, useRef } from 'react';

export default function ReservationMenu() {
    const { data: session } = useSession();
    if (!session || !session.user.token) return null;

    const [username, setUsername] = useState(session.user.name);
    const [email, setEmail] = useState(session.user.email);
    const [tel, setTel] = useState(session.user.tel);
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState(null);
    const popupScreen = useRef(null);

    return (
        <div className='w-[300px] bg-pink-100 rounded-lg border border-2 border-pink-300 p-4'>
            <div className='text-xl font-bold text-center text-slate-700 mb-4'>Account Info</div>
            <div className='grid gap-4'>
                <input type='text' placeholder='Username' className='input' value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type='email' placeholder='Email' className='input' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type='tel' placeholder='Phone' className='input' value={tel} onChange={(e) => setTel(e.target.value)} />
                <input type='password' placeholder='Password' className='input' onChange={(e) => setPassword(e.target.value)} />
                {session.user.role === 'admin' && <input type='text' value='Admin' className='input' readOnly />}
                {status && <div className='text-red-700 text-center'>{status}</div>}
            </div>
        </div>
    );
}
