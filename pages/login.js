import * as React from "react";
import {useState} from "react";
import Link from 'next/link'
import {signIn} from "next-auth/react";




export default function Home() {
    const [username, setUser] = useState('kasra3');
    const [password, setPassword] = useState('password');
    const [loginError, setLoginError] = useState('');
    const handleLogin = (event) => {
        event.preventDefault();
        signIn('credentials',
            {
                username,
                password,
                redirect:false,
                callbackUrl: `${window.location.origin}`
            }
        )
    }

    return (
        <form onSubmit={handleLogin}>
            {loginError}
            <label>
                Email: <input type='text' value={username} onChange={(e) => setUser(e.target.value)} />
            </label>
            <label>
                Password: <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button type='submit'>Submit login</button>

            <Link href='/register'>Register</Link>
        </form>
    )
}