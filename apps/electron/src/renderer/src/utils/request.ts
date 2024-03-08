import axios from 'axios'
import router from "../router";


const request = axios.create({
    baseURL: "/api",
    timeout: 5000,
    withCredentials: true, // �첽����Я��cookie
    headers: {
        // ���ú����Ҫ�Ĵ�������
        'Content-Type': 'application/json',
        'token': 'your token',
        'X-Requested-With': 'XMLHttpRequest',
    },
})

// �������������������ڰ��������棬�����ᱻ����У��Ȩ��
const whiteUrls = ["/Login", '/Register']

// request ������
// ������������ǰ��������һЩ����
// ����ͳһ��token�����������ͳһ����
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';

    // ȡ��sessionStorage���滺����û���Ϣ
    let userJson = sessionStorage.getItem("user")
    if (!whiteUrls.includes(config.url)) {  // У�����������
        if(!userJson) {
            router.push("/login")
        } else {
            let user = JSON.parse(userJson);
            config.headers['token'] = user.token;  // ��������ͷ
        }
    }
    return config
}, error => {
    return Promise.reject(error)
});

// response ������
// �����ڽӿ���Ӧ��ͳһ������
request.interceptors.response.use(
    response => {
        let res = response.data;
        // ����Ƿ��ص��ļ�

        if (response.config.responseType === 'blob') {
            return res
        }
        // ���ݷ���˷��ص��ַ�������
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        // ��֤token
        if (res.code === '401') {
            console.error("token���ڣ����µ�¼")
            router.push("/login")
        }
        return res;
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)


export default request

