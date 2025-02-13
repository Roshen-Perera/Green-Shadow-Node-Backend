import {Prisma, PrismaClient } from "@prisma/client";
import Log from "../model/Log";
import exp = require("node:constants");

const prisma = new PrismaClient();

export async function addLog(l: Log){
    console.log("Adding Log...")
    try {
        const newLog = await prisma.log.create({
            data: {
                logId: l.logId,
                logDate: l.logDate,
                details: l.details,
                observedImage: l.observedImage,
                logFieldId: l.logFieldId,
                logCropId: l.logCropId,
                logStaffId: l.logStaffId
            }
        })
        console.log('Log Added store:', newLog);
        console.log("Log Added successfully");
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                throw new Error('A log with this ID already exists.');
            }
        }
        throw err;
    }
}

export async function deleteLog(id:string) {
    try{
        await prisma.log.delete({
            where: {logId: id},
        });
        console.log('Log deleted :',id);
    }catch(err){
        console.log("error deleting Log", err);
        if(err instanceof Prisma.PrismaClientKnownRequestError){
            if(err.code === 'P2025'){
                throw new Error("The log with this ID doesnt exists");
            }
        }
        throw err;
    }
}

export async function updateLog(logId: string, l: Log){
    try{
        await prisma.log.update({
            where:{ logId : logId},
            data:{
                logId: l.logId,
                logDate: l.logDate,
                details: l.details,
                observedImage: l.observedImage,
                logFieldId: l.logFieldId,
                logCropId: l.logCropId,
                logStaffId: l.logStaffId
            }
        })
        console.log("Log updated successfully", logId);
    }catch(err){
        console.log("error updating Log", err);
        if(err instanceof Prisma.PrismaClientKnownRequestError){
            if(err.code === 'P2025'){
                throw new Error("The log with this ID doesnt exists");
            }
        }
        throw err;
    }
}

export async function getAllLogs(){
    try{
        return await prisma.log.findMany();
    }catch(err){
        console.log("error getting Logs from prisma data",err);
    }
}

export async function getLog(logId: string){
    try{
        return await prisma.log.findUnique({
            where: {logId: logId}
        })
    }catch(err){
        console.log("error getting Log", err);
        if(err instanceof Prisma.PrismaClientKnownRequestError){
            if(err.code === 'P2025'){
                throw new Error("The log with this ID doesnt exists");
            }
        }
        throw err;
    }
}