const db = require("../config/db");

exports.addSchool = (req,res)=>{
    const {name, adress, latitude, longitude} = req.body;
    
    if(!name || !adress || !latitude || !longitude){
        return res.status(400).json({message : "All fields are required !"});
    }

    const sql = "INSERT INTO schools (name, adress, latitude, longitude) VALUES ($1, $2, $3, $4)";
    db.query(sql,[name,adress,latitude,longitude],(err,result)=>{
        if(err){
            return res.status(400).json({message: "Database Eroor !", err});
        }
        res.status(201).json({ message: "School added successfully"});

    })
}

//Function to calculate the distance :-(haversine Formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of Earth in km
    const toRad = (value) => value * Math.PI / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon/2) * Math.sin(dLon/2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
} 

exports.listSchools = (req, res) => {
    const userLat = parseFloat(req.query.latitude);
    const userLng = parseFloat(req.query.longitude);

    if (isNaN(userLat) || isNaN(userLng)) {
        return res.status(400).json({ error: 'Invalid coordinates' });
    }

    db.query('SELECT * FROM schools', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        const sorted = results.map(school => {
            const distance = calculateDistance(userLat, userLng, school.latitude, school.longitude);
            return { ...school, distance };
        }).sort((a, b) => a.distance - b.distance);

        res.status(200).json(sorted);
    });
}