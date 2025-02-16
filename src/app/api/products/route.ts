import { db } from "@/lib/db/db";
import { products } from "@/lib/db/schema";
import { isServer, productSchema } from "@/lib/validator/productSchema";
import { unlink, writeFile } from "node:fs/promises";
import path from "node:path";

export async function POST(request: Request){
    const data = await request.formData();
    let validatedData;
    try {
        validatedData = productSchema.parse({
            name : data.get('name'),
            description : data.get('description'),
            price : Number(data.get('price')),
            image: data.get('image'),
        })
    } catch (error) {
        return Response.json({message : error}, {status:400})
    }

    const inputImage = isServer ? (validatedData.image as File)
    : (validatedData.image as FileList[0]);

    const filename = `${Date.now()}.${inputImage.name.split('.').slice(-1)}`; //choco.png 2121212.png
    try {
        const buffer = Buffer.from(await inputImage.arrayBuffer())
        await writeFile(path.join(process.cwd(), 'public/assets', filename),buffer)
        
    } catch (error) {
        console.log(error);
        
        return Response.json({ message : 'Failed to sace the file to fs'},{status : 500})
    }
   

    try {
        await db.insert(products).values({...validatedData, image: filename})
        
    } catch (error) {
        console.log(error);
        try {
            await unlink(path.join(process.cwd(), 'public/assets', filename));
        } catch (unlinkError) {
            console.error('Failed to delete image:', unlinkError);
        }
        return Response.json({message : "Failed to store product into the database"},{status:500})
        
    }
    return Response.json({ message: 'OK' }, { status: 201 });
}