import {APIInstance} from "./adminServerUrl";

export const adminAPI = {

    async createMenu(dessertsIds, hotDrinksIds, alcoholIds, current = false) {
        try {

            return await APIInstance.post(`/admin/menu`, {
                desserts: dessertsIds,
                hotDrinks: hotDrinksIds,
                alcohol: alcoholIds,
                current: current

            })

        } catch (err) {
            console.log(err)
        }
    },


    async getProductGroup(groupName) {

        try {
            return await APIInstance.get(`/admin/${groupName}`);
        } catch (err) {
            console.log(err)
        }

    },

    async getProduct(groupName, id) {

        try {
            return await APIInstance.get(`/admin/${groupName}/${id}`);
        } catch (err) {
            console.log(err)
        }

    },

    async createProduct(groupName, data) {
        try {
            if (groupName === "desserts") {

                return await APIInstance.post(`/admin/${groupName}`, data, {
                    headers: {'content-type': 'multipart/from-data'},
                })

            }

            return await APIInstance.post(`/admin/${groupName}`, data)
        } catch (err) {
            console.log(err)
        }
    },

    async changeProduct(groupName, id, data) {
        try {
            if (groupName === "desserts") {

                return await APIInstance.patch(`/admin/${groupName}/${id}`, data, {
                    headers: {'content-type': 'multipart/form-data'},
                })
            }

            return await APIInstance.patch(`/admin/${groupName}/${id}`, data)

        } catch (err) {
            console.log(err)
        }
    },

    async deleteProduct(groupName, id) {//desserts, hot-drinks, alcohol
        try {
            return await APIInstance.delete(`/admin/${groupName}/${id}`)
        } catch (err) {
            console.log(err)
        }
    },

    async logout() {
        try {
            return await APIInstance.delete(`/logout`, {})

        } catch (err) {
            console.log(err)
        }
    },
}
