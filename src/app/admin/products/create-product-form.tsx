import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { productSchema } from '@/lib/validator/productSchema'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export type FormValues = z.input<typeof productSchema>;

const CreateProductForm = ({onSubmit}:{onSubmit:(formvalues:FormValues)=>void}) => {
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
    },
  })
  const fileRef = form.register('image');
  const handleSubmit = (values:FormValues) => {
    onSubmit(values);
};
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="e.g: choco" {...field} />
            </FormControl>
           
            <FormMessage />
          </FormItem>
        )}
      />

<FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea {...field}/>
            </FormControl>
           
            <FormMessage />
          </FormItem>
        )}
      />

<FormField
        control={form.control}
        name="image"
        render={({  }) => (
          <FormItem>
            <FormLabel>Image</FormLabel>
            <FormControl>
              <Input type='file' {...fileRef} />
            </FormControl>
           
            <FormMessage />
          </FormItem>
        )}
      />

<FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Price</FormLabel>
            <FormControl>
            <Input type="number" {...field} onChange={(e) => { const value = parseFloat(e.target.value);
             field.onChange(value);}}
                                /> 
                                 </FormControl>
           
            <FormMessage />
          </FormItem>
        )}
      />
      <Button className='w-full'>Submit</Button>
    </form>
  </Form>  )
}

export default CreateProductForm