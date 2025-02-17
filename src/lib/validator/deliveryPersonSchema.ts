import { z } from "zod";

export const deliveryPersonSchema = z.object({
    name: z.string({ message: 'delivey person name should be a string' }),
    phone: z.string({ message: 'phone should be a string' }).length(14),
    wareHouseId: z.number({message: "wareHouseId should be number"})
})