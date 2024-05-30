import toast from "react-hot-toast"

export const baseURL = "http://localhost:5000"
const token = "cXVlcnlfaWQ9QUFGRUR6Uk5BQUFBQUVRUE5FMVlJQjMzJnVzZXI9JTdCJTIyaWQlMjIlM0ExMjk1MjU3NDEyJTJDJTIyZmlyc3RfbmFtZSUyMiUzQSUyMkRhbmlpbCUyMiUyQyUyMmxhc3RfbmFtZSUyMiUzQSUyMiUyMiUyQyUyMnVzZXJuYW1lJTIyJTNBJTIyZDlBMm5ZM0ElMjIlMkMlMjJsYW5ndWFnZV9jb2RlJTIyJTNBJTIycnUlMjIlMkMlMjJpc19wcmVtaXVtJTIyJTNBdHJ1ZSUyQyUyMmFsbG93c193cml0ZV90b19wbSUyMiUzQXRydWUlN0QmYXV0aF9kYXRlPTE3MTU1MDMxMDImaGFzaD01OGQ2YWMxMTNhNjQwYzFiNDAzNzhkZTFiOGFhNDU1YTRjNDExYmEwYjM1YjA2Y2FmMWQwMmFkMTNjYjc3Yzcy"
//window.btoa(window.Telegram.WebApp.initData)
const appAPI = {
    async getUser() {
        try {
            const res = await fetch(`${baseURL}/api/user`, {
                headers: {
                    Authorization: token
                }
            }).then((res) => res.json())
            return res
        } catch (e) {
            console.log(e)
            return toast.error(e)
        }
    },
    async getCourse() {
        try {
            const res = await fetch(`${baseURL}/api/course`, {
                headers: {
                    Authorization: token
                }
            }).then((res) => res.json())
            return res
        } catch (e) {
            console.log(e)
            return toast.error(e)
        }
    },
    async postWithdraw(data) {
        try {
            const res = await fetch(`${baseURL}/api/withdraw`, {
                method: "POST",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then((res) => res.json())
            return res
        } catch (e) {
            console.log(e)
            return toast.error(e)
        }
    }
}

export default appAPI