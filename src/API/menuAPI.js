import {APIInstance} from "./adminServerUrl";

export const adminAPI = {

    async getAllMenus() {
        try {
            return await APIInstance.get("/admin/menu")
        } catch (err) {
            console.log(err)
        }
    },

    async getMenu(id) {
        try {
            return await APIInstance.get(`/admin/menu/${id}`)
        } catch (err) {
            console.log(err)
        }

    },

    async deleteMenu(id) {//desserts, hot-drinks, alcohol
        try {
            return await APIInstance.delete(`/admin/menu/${id}`)
        } catch (err) {
            console.log(err)
        }
    },
}
