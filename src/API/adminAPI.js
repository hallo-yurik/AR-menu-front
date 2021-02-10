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

    async createProduct(groupName, data) {
        try {
            if (groupName === "desserts") {
                const response = await APIInstance.post(`/admin/${groupName}`, {...data}, {
                    headers: {'content-type': 'multipart/from-data'},
                })
                return response.data
            }

            const response = await APIInstance.post(`/admin/${groupName}`, {...data})
            return response.data
        } catch (err) {
            console.log(err)
        }
    },

    async changeProduct(groupName, id, data) {
        try {
            if (groupName === "desserts") {
                const response = await APIInstance.patch(`/admin/${groupName}/${id}`, {...data}, {
                    headers: {'content-type': 'multipart/form-data'},
                })
                return response.data
            }

            const response = await APIInstance.patch(`/admin/${groupName}/${id}`, {...data})
            return response.data
        } catch (err) {
            console.log(err)
        }
    },

    async deleteProduct(groupName, id) {
        try {
            const response = await APIInstance.delete(`/admin/${groupName}/${id}`)
            return response.data
        } catch (err) {
            console.log(err)
        }
    }
}
