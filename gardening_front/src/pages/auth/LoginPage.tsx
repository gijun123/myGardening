import {useEffect, useState} from "react";
import {TestControllerApi, type UserTokenDTO} from "@/shared/api";

export default function LoginPage() {
    const [data, setData] = useState<UserTokenDTO>({});

    useEffect(() => {
        const api = new TestControllerApi();
        api.test().then(resp => setData(resp.data));
    }, [])

    return (
        <div>
            {data && (<div>{data.authority} {data.id}</div>)}
        </div>
    )
}