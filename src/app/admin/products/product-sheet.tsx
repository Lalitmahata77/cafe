import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    // SheetTrigger,
  } from "@/components/ui/sheet"
import CreateProductForm, { FormValues } from './create-product-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createProduct } from '@/http/api'
import { useNewProductStore } from '@/store/product/product-store'
import { toast } from "sonner"


const ProductSheet = () => {

  const {isOpen,onClose} = useNewProductStore()
  const queryClient = useQueryClient();
  const {mutate,isPending} = useMutation({
    mutationKey: ['create-product'],
    mutationFn: (data: FormData)=>createProduct(data),
    onSuccess:()=>{
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast("Product has been created.")
      onClose()
    }
  })
  const onSubmit = (values:FormValues)=>{
    console.log(values);
    const formData = new FormData()
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('price', String(values.price));
    formData.append('image',(values.image as FileList)[0])
    mutate(formData)

    
  }
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
  {/* <SheetTrigger>Open</SheetTrigger> */}
  <SheetContent className=' space-y-3'>
    <SheetHeader>
      <SheetTitle>Create Product</SheetTitle>
      <SheetDescription>
       create a new product
      </SheetDescription>
    </SheetHeader>
    <CreateProductForm onSubmit={onSubmit} disabled={isPending}/>
  </SheetContent>
</Sheet>

  )
}

export default ProductSheet