import {APIInstance} from "./adminServerUrl";

export const adminAPI = {
    async getProductGroup(groupName) {
        const response = await APIInstance.get(`/${groupName}`);
        return response.data;
    },

    async createProduct(groupName, data) {
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
    },

    async changeProduct(groupName, id, data) {
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
    },

    async deleteProduct(groupName, id) {
        const response = await APIInstance.delete(`/${groupName}/${id}`)
        return response.data
    }
}
