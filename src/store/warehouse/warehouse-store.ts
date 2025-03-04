import {create} from "zustand"

type NewWarehouseState= {
    isOpen: boolean;
    onOpen: ()=>void;
    onClose: ()=>void;
}

export const useNewWarehouseStore= create<NewWarehouseState>((set)=>{
    return{
        isOpen: false,
        onOpen: ()=>set({isOpen:true}),
        onClose: ()=>set({isOpen:false})
    }
})