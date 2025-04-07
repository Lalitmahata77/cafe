import { db } from "@/lib/db/db"
import { inventories, products, warehouses } from "@/lib/db/schema"
import { inventorySchema } from "@/lib/validator/inventoriesSchema"
import { desc, eq } from "drizzle-orm"

export async function POST(request:Request){
    const requestData = await request.json()
    let validatedData
    try {
        validatedData =  inventorySchema.parse(requestData)
        
    } catch (error) {
        return Response.json({error:error}, {status:500})
        
    }

    try {
       await db.insert(inventories).values(validatedData)
       return Response.json({message : "ok"},{status:200})
        
    } catch (error) {
        console.log(error);
        return Response.json({error : `Internal server error : ${error}`}, {status:500})
        
        
    }
}


export async function GET() {
    try {
        const allInventories = await db
            .select({
                id: inventories.id,
                sku: inventories.sku,
                warehouse: warehouses.name,
                product: products.name,
            })
            .from(inventories)
            .leftJoin(warehouses, eq(inventories.warehouseId, warehouses.id))
            .leftJoin(products, eq(inventories.productId, products.id))
            .orderBy(desc(inventories.id));

        return Response.json(allInventories);
    } catch (err) {
        console.log(err);
        
        return Response.json({ message: 'Failed to fetch inventories' }, { status: 500 });
    }
}

