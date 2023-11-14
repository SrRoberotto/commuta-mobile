import api from "./api-common";

class ContactServices {
    async acceptContact(data) {
        const response = await api.post("/contacts",data);

        return response;
    }

    async rejectContact(data) {
        const response = await api.delete(`/contacts/${data.contact_id}`);

        return response;
    }

    async getContacts(){
        const response = await api.get("/contacts");
        
        return response;
    }

    
    async getContactByID(id){
        const response = await api.get(`/contacts/${id}`);
        
        return response;
    }


    async getPendingContacts(){
        const response = await api.get("/contacts/pending");
        
        return response;
    }

}   

export default new ContactServices();