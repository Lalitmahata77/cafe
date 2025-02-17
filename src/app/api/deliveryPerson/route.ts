import { db } from "@/lib/db/db"
import { deliveryPersons, wareHouses } from "@/lib/db/schema"
import { deliveryPersonSchema } from "@/lib/validator/deliveryPersonSchema"
import { desc, eq } from "drizzle-orm"

export async function POST(request:Request){
    const requestData= await request.json()
    let validatedData
    try {
        validatedData =  deliveryPersonSchema.parse(requestData)
        
    } catch (error) {
        return Response.json({error:error},{status:400})
    }

    try {
        await db.insert(deliveryPersons).values(validatedData)
        return Response.json({message: "ok"},{status:200})
        
    } catch (error) {
        console.log(error);
        return Response.json({message: "Internal server error"},{status:500})
        
        
    }
}

export async function GET(){
    try {
       const allDeliveryPersons = await db.select(
        {
            id:deliveryPersons.id,
            name: deliveryPersons.name,
            phone: deliveryPersons.phone,
            wareHouse: wareHouses.name
        }
       ).from(deliveryPersons)
       .leftJoin(wareHouses,eq(deliveryPersons.wareHouseId,wareHouses.id))
       .orderBy(desc(deliveryPersons.id))
        return Response.json(allDeliveryPersons)
    } catch (error) {
        console.log(error);
        return Response.json({message: "Internal server error"},{status:500})

    }
}