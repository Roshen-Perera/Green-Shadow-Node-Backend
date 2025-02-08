import express from "express";
import {addField, deleteField, getAllFields, updateField} from "../database/field-data-store";
import Field from "../model/Field";
const router = express.Router();

router.post("/add", async(req, res) => {
    const field: Field = req.body;
    console.log("Received Data", field);
    try{
        const addedField = await addField(field);
        console.log(addedField);
        res.send('Field Added')
    }catch(err){
        console.log("error adding field", err);
        if (err.message === 'A field with this ID already exists.') {
            res.status(400).send(err.message);
        } else {
            res.status(500).send("An error occurred while adding the field.");
        }
    }
})

router.delete("/delete/id", async (req, res) => {
    console.log("Deleting field...");
    const id: string  = req.params.email;
    try{
        await deleteField(id);
        res.send('Field Deleted');
    }catch(err){
        console.log("error deleting field", err);
    }
})


router.put("/update/id",async (req, res) => {
    const id:string = req.params.email;
    const field : Field = req.body;
    try{
        await updateField(id, field);
        res.send('Field Updated');
    }catch(err){
        console.log("error updating field", err);
    }
})

router.get("/get", async (req, res) => {
    console.log("Fetching all fields");
    try{
       const fields=  await getAllFields();
       res.json(fields);
    }catch(err){
        console.log("error getting fields", err);
    }
})
export default router;