import api from "./api-common";

class ContactServices {
    async createContact(data) {
        const response = await api.post("/contacts",data);

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