const { pool } = require("../../config/db.config");


exports.createAppointment = async (req, res) => {
    try {
        const length_id = req.body.length_id;
        const style_id = req.body.style_id;
        const time_slot = req.body.time_slot;
        const day = req.body.day;
        const long = req.body.long;
        const lat = req.body.lat;



        if (!length_id || !style_id || !time_slot) {
            return (
                res.status(400).json({
                    message: "time_slot , length_id , style_id must be provided",
                    status: false
                })
            )
        }

        if (day == 'monday' || day == 'tuesday' || day == 'wednesday' || day == 'thursday' || day == 'friday' || day == 'saturday' || day == 'sunday') {
        } else {
            return (
                res.status(400).json({
                    message: "Invalide name of day , name of day must be like monday , tuesday .....",
                    status: false

                })
            )
        }

        let appointment_number = await getRandomInt(999999);
        const insert_query = 'INSERT INTO appointments (appointment_number , length_id , style_id , time_slot , day) VALUES ($1 , $2 , $3 , $4 ,$5 ) RETURNING*'
        const result = await pool.query(insert_query,
            [

                appointment_number ? appointment_number : null,
                length_id ? length_id : null,
                style_id ? style_id : null,
                time_slot ? time_slot : null,
                day ? day : null,
            ]);



        let barbers;
        if (result) {
            barbers = await getBarbersWithinRadius(lat, long, 35, pool)
            console.log("sfgfas89f9a", barbers)
        }


        if (result.rows[0]) {
            res.status(200).json({
                message: "Appointment Created",
                status: true,
                resutl: result.rows[0],
                barbers_in_radius: barbers

            })
        }
        else {
            res.status(404).json({
                message: "Could not Create appointment",
                status: false,

            })
        }

    }
    catch (err) {
        res.status(500).json({
            message: "Error Occurred",
            status: false,
            error: err.message
        })
    }
}

async function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


async function getBarbersWithinRadius(centerLat, centerLng, radius, pool) {
    const query = `
    SELECT 
    id, 
    (
        6371 * acos(
            cos( radians(${centerLat}) ) * cos( radians( saloon_location->>'y'::text::float ) ) * cos( radians( saloon_location->>'x'::text::float ) - radians({${centerLng}}) ) + 
            sin( radians(${centerLat}) ) * sin( radians( saloon_location->>'y'::text::float ) ) 
        )
    ) AS distance 
FROM 
    barbers 
HAVING 
    distance < 30
ORDER BY distance;
    `;
    const values = [centerLng, centerLat, radius];
    try {
        const res = await pool.query(query, values);
        console.log(res)
        return res.rows;
    } catch (err) {
        console.log(err)
    }
}