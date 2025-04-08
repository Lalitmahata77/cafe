import { DeliveryPerson, InventoryData } from "@/types";
import { api } from "./client";

export const getAllProducts = async()=>{
    const response = await api.get('/products');
    return response.data;
}

export const createProduct = async(data:FormData)=>{
    const response = await api.post('/products',data,{
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;

}
export const getSingleProduct = async (id: string) => {
    const response = await api.get(`/products/${id}`);
    return await response.data;
};
export const getAllWarehouses = async()=>{
    const response = await api.get("/wareHouse")
    return response.data
}

export const createWarehouse = async(data:FormData)=>{
    const response = await api.post("/wareHouse", data)
    return response.data
}
export const CreateDeliveryPetson = async(data:DeliveryPerson)=>{
    const response = await api.post("/deliveryPerson", data)
    return response.data
}

export const getAllDeliveryPerson = async()=>{
    const response = await api.get("/deliveryPerson")
    return response.data
}


export const getAllInventries = async()=>{
    const response = await api.get("/inventories")
    return response.data
}

export const createInventries = async(data:InventoryData)=>{
    const response = await api.post("/inventories", data)
    return response.data
}