import {create} from "zustand"

type NewDeliveryPersonState= {
    isOpen: boolean;
    onOpen: ()=>void;
    onClose: ()=>void;
}

export const useNewDeliveryPersonStore= create<NewDeliveryPersonState>((set)=>{
    return{
        isOpen: false,
        onOpen: ()=>set({isOpen:true}),
        onClose: ()=>set({isOpen:false})
    }
})