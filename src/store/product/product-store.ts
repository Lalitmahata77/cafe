import {create} from "zustand"

type NewProductState= {
    isOpen: boolean;
    onOpen: ()=>void;
    onClose: ()=>void;
}

export const useNewProductStore= create<NewProductState>((set)=>{
    return{
        isOpen: false,
        onOpen: ()=>set({isOpen:true}),
        onClose: ()=>set({isOpen:false})
    }
})