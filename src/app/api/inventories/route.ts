import { db } from "@/lib/db/db"
import { inventories, products, wareHouses } from "@/lib/db/schema"
import { inventoriesSchema } from "@/lib/validator/inventoriesSchema"
import { desc, eq } from "drizzle-orm"

export async function POST(request:Request){
    const requestData = await request.json()
    let validatedData
    try {
        validatedData = await inventoriesSchema.parse(requestData)
        
    } catch (error) {
        return Response.json({error:error}, {status:500})
        
    }

    try {
       await db.insert(inventories).values(validatedData)
       return Response.json({message : "ok"},{status:200})
        
    } catch (error) {
        console.log(error);
        return Response.json({error : "Internal server error"}, {status:500})
        
        
    }
}


export async function GET(){
    try {
        const allInventories = await db.select(
            {
                id:inventories.id,
                sku: inventories.sku,
                wareHouse: wareHouses.name,
                product: products.name
            }
        ).from(inventories)
        .leftJoin(wareHouses,eq(inventories.wareHouseId,wareHouses.id))
        .leftJoin(products, eq(inventories.productId,products.id))
        .orderBy(desc(inventories.id))
        return Response.json(allInventories)
        
    } catch (error) {
        console.log(error);
        return Response.json({error:"Internal server error"},{status:500})
        
    }
}