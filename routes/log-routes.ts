import express from "express";
import {addLog} from "../database/log-data-store";
import {deleteLog, getAllLogs, getLog, updateLog} from "../database/log-data-store";
import Log from "../model/Log";

const router = express.Router();

router.post("/add", async(req, res) => {
    const log: Log = req.body;
    console.log("Received Data", log);
    try{
        const addedLog = await addLog(log);
        console.log(addedLog);
        res.send('Log Added')
    }catch(err){
        console.log("error adding log", err);
        if (err.message === 'A log with this ID already exists.') {
            res.status(400).send(err.message);
        } else {
            res.status(500).send("An error occurred while adding the log.");
        }
    }
})
router.delete("/delete/:logId", async (req, res) => {
    console.log("Deleting log...");
    const id: string  = req.params.logId;
    try{
        await deleteLog(id);
        console.log("Log with id " + id +" deleted");
        res.send('Log Deleted');
    }catch(err){
        console.log("error deleting log", err);
        if(err.message === 'The log with this ID doesnt exists'){
            res.status(404).send(err.message);
        } else {
            res.status(500).send("An error occurred while deleting the log.");
        }
    }
})


router.put("/update/:logId",async (req, res) => {
    console.log("Updating log...")
    const id:string = req.params.logId;
    const log : Log = req.body;
    try{
        await updateLog(id, log);
        res.send('Log Updated');
    }catch(err){
        console.log("error updating log", err);
        if(err.message === 'The log with this ID doesnt exists'){
            res.status(404).send(err.message);
        } else {
            res.status(500).send("An error occurred while updating the log.");
        }
    }
})

router.get("/get/:logId", async (req, res) => {
    console.log("Fetching log...");
    const id = req.params.logId;
    try{
        const log = await getLog(id);
        if(log === null){
            res.status(400).send('The log with this ID doesnt exists');
        }
    }catch(err){
        console.log("error getting log", err);
    }
})

router.get("/get", async (req, res) => {
    console.log("Fetching all logs");
    try{
        const logs=  await getAllLogs();
        res.json(logs);
    }catch(err){
        console.log("error getting logs", err);
    }
})
export default router;