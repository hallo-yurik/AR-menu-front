import {APIInstance} from "./adminServerUrl";

export const authAPI = {
    async signin(username, password) {
        try {
            return await APIInstance.post(`/login/signin`, {
                    username: username,
                    password: password
                })

        } catch (err) {
            console.log(err)
        }
    },

    async checkForAuth() {
        try {
            return await APIInstance.get(`/admin`)

        } catch (err) {
            console.log(err)
        }
    },

    async signup(username, password) {
        try {

            return await APIInstance.post(`/login/signup`, {
                username: username,
                password: password
            })

        } catch (err) {
            console.log(err)
        }
    },
    async signOut() {
        try {
            return await APIInstance.delete(`/admin/logout`)
        } catch (err) {
            console.log(err)
        }
    },
}