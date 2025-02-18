import { z } from "zod";

export const inventoriesSchema = z.object({
    sku: z.string({message: "sku should be a string"}),
    wareHouseId: z.number({message: "wareHouseId should be number"}),
    // orderId: z.number({message: "orderId should be number"}),
    productId: z.number({message: "ProductId should be number"})
})