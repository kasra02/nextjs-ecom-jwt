import { useSession, signIn, signOut } from "next-auth/react"
import AxiosRequest from "../request/axiosRequest";
import {useEffect} from "react";

export default function Component() {
    const { data: session,status } = useSession()
    // let axiosRequest = new AxiosRequest(session?.user?.access_token);

    useEffect(()=>{
        if(session) {
            let axiosRequest = new AxiosRequest(session?.user?.access_token);
            axiosRequest.getUser().then(res=>{
                console.log(res.data)
            })
        }
    },[status])

    if(session) {
        return <>
            Signed in as {session?.user?.email} <br/>
            <button onClick={() => signOut()}>Sign out</button>
        </>
    }
    return <>
        Not signed in <br/>
        <button onClick={() => signIn()}>Sign in</button>
    </>
}
