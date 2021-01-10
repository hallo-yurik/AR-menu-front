import {APIInstance} from "./adminServerUrl";

export const adminAPI = {
    async getProductGroup(groupName) {

        try {
            const response = await APIInstance.get(`/${groupName}`);
            return response.data;
        } catch (err) {
            console.log(err)
        }

    },

    async createProduct(groupName, data) {
        try {
            if (groupName === "desserts") {
                const response = await APIInstance.post(`/${groupName}`, {
                    headers: {'content-type': 'application/x-www-form-urlencoded'},
                    data
                })
                return response.data
            }

            const response = await APIInstance.post(`/${groupName}`, {
                data
            })
            return response.data
        } catch (err) {
            console.log(err)
        }
    },

    async changeProduct(groupName, id, data) {
        try {
            if (groupName === "desserts") {
                const response = await APIInstance.patch(`/${groupName}/${id}`, {
                    headers: {'content-type': 'multipart/form-data'},
                    data
                })
                return response.data
            }

            const response = await APIInstance.patch(`/${groupName}/${id}`, {
                data
            })
            return response.data
        } catch (err) {
            console.log(err)
        }
    },

    async deleteProduct(groupName, id) {
        try {
            const response = await APIInstance.delete(`/${groupName}/${id}`)
            return response.data
        } catch (err) {
            console.log(err)
        }
    }
}
