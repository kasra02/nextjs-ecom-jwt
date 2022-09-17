import axios, {Axios} from "axios";

let axiosInstance = axios.create({
    baseURL:"http://localhost:8080/api"
});

class AxiosRequest {
    constructor(access_token) {
        this.access_token = access_token
    }
    getUser(){
        return axiosInstance.get("/test/user",this.getHeader())
    }

     getHeader(){
        return {
            headers: { Authorization: `Bearer ${this.access_token}` }
        }
    }

}

export default AxiosRequest