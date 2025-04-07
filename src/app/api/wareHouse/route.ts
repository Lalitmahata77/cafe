import { db } from "@/lib/db/db";
import { warehouses } from "@/lib/db/schema";
import { wareHouseSchema } from "@/lib/validator/wareHouseSchema";

export async function POST(request:Request){
    const requestData = await request.json();
    let validatedData
try {
    validatedData = wareHouseSchema.parse(requestData)
    
} catch (error) {
    return Response.json({ message: error}, { status: 400 });
    
}

try {
    const WareHouse = await db.insert(warehouses).values(validatedData)
    return Response.json(WareHouse)
    
} catch (error) {
    console.log(error);
    return Response.json({message : "WareHouse creation failed"}, {status:500})
    
}
}


export async function GET(){
    try {
        const allWareHouse = await db.select().from(warehouses)
        return Response.json(allWareHouse)
        
    } catch (error) {
        console.log(error);
        return Response.json({message : "Internal server error"},{status:500})
        
    }
}