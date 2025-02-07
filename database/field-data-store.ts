import {PrismaClient} from '@prisma/client';
import Field from '../model/Field';

const prisma = new PrismaClient();

export async function addField(f: Field){
    console.log("Adding Field...")
    try{
       const newField  = await prisma.field.create({
            data:{
                fieldId: f.fieldId,
                fieldName: f.fieldName,
                fieldExtent: f.fieldExtent,
                fieldLocation: f.fieldLocation,
                fieldImage1: f.fieldImage1,
                fieldImage2: f.fieldImage2
            }
        })
        console.log('Field Added :',newField)
    }catch(err) {
        console.log("error adding Field", err);
    }
}

export async function deleteField(fieldId:string) {
    try{
        await prisma.field.delete({
            where: {fieldId: fieldId}
        });
        console.log('Field deleted :',fieldId);
    }catch(err){
        console.log("error deleting Field", err);
    }
}

export async function getAllFields(){
    try{
        return await prisma.field.findMany();
    }catch(err){
        console.log("error getting Fields from prisma data",err);
    }
}

export async function updateField(email: string, f: Field){
    try{
        await prisma.field.update({
            where:{ fieldId : f.fieldId},
            data:{
                fieldId: f.fieldId,
                fieldName: f.fieldName,
                fieldExtent: f.fieldExtent,
                fieldLocation: f.fieldLocation,
                fieldImage1: f.fieldImage1,
                fieldImage2: f.fieldImage2
            }
        })
    }catch(err){
        console.log("error updating Field", err);
    }
}