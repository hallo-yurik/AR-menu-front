import {APIInstance} from "./adminServerUrl";

export const commonAPI = {

    async getCurrentMenu() {
        try {
            return await APIInstance.get(`/menu`)
        } catch (err) {
            console.log(err)
        }
    },

}