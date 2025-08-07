const db = require("../config/db");

exports.addSchool = (req,res)=>{
    const {name, adress, latitude, longitude} = req.body;
    
    if(!name || !adress || !latitude || !longitude){
        return res.status(400).json({message : "All fields are required !"});
    }

    const sql = "INSERT INTO schools (name, adress, latitude, longitude) VALUES (?, ?, ?, ?)";
    db.query(sql,[name,adress,latitude,longitude],(err,result)=>{
        if(err){
            return res.status(400).json({message: "Database Eroor !", err});
        }
        res.status(201).json({ message: "School added successfully", schoolId: result.insertId });

    })

    
}