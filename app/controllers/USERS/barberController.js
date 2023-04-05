const {pool} = require("../../config/db.config");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { query } = require("express");


exports.registerBarber = async (req, res, next) => {
    const client = await pool.connect();
    try {
        const email = req.body.email;
        const password = req.body.password;
        const { error } = registerSchema.validate(req.body);
        if (error) {
            return (
                res.status(400).json({
                    message: "Error occurred",
                    error: error.details[0].message,
                    status: false
                })
            )
        }
        

        const found_email_query = 'SELECT * FROM barbers WHERE email = $1'

        const emailExists = await pool.query(found_email_query , [email])
        


        if (emailExists.rowCount>0) {
            return (
                res.status(400).json({
                    message: "Barber with this email already exists",
                    status: false
                })
            )
        }


        const query = 'INSERT INTO barbers (email , password) VALUES ($1 , $2) RETURNING*'
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);


        const result = await pool.query(query , [email , hashPassword]);
        console.log(result.rows[0])

        if(result.rows[0]){
            res.json({
                message: "User Has been registered successfully",
                status : true,
                result:result.rows[0]
            })
        }
        else{
            res.json({
                message: "Could not Register user",
                status :false,
            })
        }

        // const data = {
        //     email: email,
        //     ip: ip,
        //     stripe: stripe
        // }


        // //calling create customer function to create customer in stripe
        // const createCustomer = await createCustomerFn(data, res);
        // if (!createCustomer) {
        //     return (
        //         res.json({
        //             message: "Error Occurred in creating stripe customer",
        //             status: false
        //         })
        //     )
        // }

        // //calling creatinConnectAccount to connect this user in stripe
        // const createConnectAccount = await createConnectAccountFn(data, res);
        // if (!createConnectAccount) {
        //     return (
        //         res.json({
        //             message: "Error Occurred in creating connect account",
        //             status: false
        //         })
        //     )
        // }


        
        // const result = await pool.query('INSERT INTT')
        // if (result) {
        //     res.status(201).json({
        //         message: "Record has entered",
        //         status: true,
        //         result: result.dataValues
        //     })
        // }
        // else {
        //     res.status(400).json({
        //         message: "Could not save data",
        //         status: false
        //     })
        // }
    }
    catch (err) {
        console.log(err)
        res.json({
            message: "Error Occurred",
            status: false,
            error: err.message
        })
    }finally {
        client.release();
      }

}

exports.login = async (req, res) => {
    try {
        const email = req.body.email;
        let password = req.body.password;

  
        if (!email || !password) {
            return (
                res.status(400).json({
                    message: "email and password must be provided",
                    status: false
                })
            )
        }

        const query = 'SELECT * FROM barbers WHERE email = $1';
        const foundResult = await pool.query(query  , [email]);

        console.log(foundResult)


        if (foundResult.rowCount == 0) {
            return (
                res.status(400).json({
                    message: "Wrong email or password",
                    status: false
                })
            )
        }

        const vaildPass = await bcrypt.compare(password, foundResult.rows[0].password);

        if (!vaildPass) {
            return (
                res.status(401).json({
                    message: "Wrong email or password",
                    status: false
                })
            )
        }

        const token = jwt.sign({ id: foundResult.rows[0].id }, process.env.TOKEN, { expiresIn: '30d' });
        res.json({
            message: "Logged in Successfully",
            status: true,
            result: foundResult.rows[0],
            jwt_token: token
        });

    }
    catch (err) {
        console.log(err)
        res.json({
            message: "Error Occurred",
            status: false,
            error: err.message
        })
    }
}


exports.updateProfile = async (req, res) => {
    try {
        const barber_id = req.body.barber_id;
        const user_name = req.body.user_name;
        const device_token = req.body.device_token;
        const profile_image = req.body.profile_image;
        const gender = req.body.gender;
        const age = req.body.age;
        const experiance = req.body.experiance;
        let saloon_long = req.body.saloon_long;
        let saloon_lat = req.body.saloon_lat;
        const block = req.body.block;

        const saloon_location_address = req.body.saloon_location_address;

        if (saloon_lat && !saloon_long || saloon_long && !saloon_lat) {
            return (
                res.json({
                    message: "Must provide saloon_lat and saloon_long both",
                    status: false
                })
            )
        }

        saloon_lat = parseFloat(saloon_lat);
        saloon_long = parseFloat(saloon_long)
        let query;
        let values;
        
        if(!saloon_lat & !saloon_long){
             query = 'UPDATE barbers SET user_name = $1 , device_token = $2 , profile_image = $3 ,gender = $4 , age= $5 , experiance= $6  WHERE id = $7 RETURNING*'
             values =[
                user_name ? user_name : null , 
                device_token ? device_token : null ,
                profile_image ? profile_image : null,
                gender ? gender : null,
                age ? age : null,
                experiance ? experiance : null,
                barber_id ? barber_id : null,
            ]
        }
        else{
        query = 'UPDATE barbers SET user_name = $1 , device_token = $2 , profile_image = $3 ,gender = $4 , age= $5 , experiance= $6 saloon_location = $7  WHERE id = $8 RETURNING*'
         values =[
            user_name ? user_name : null , 
            device_token ? device_token : null ,
            profile_image ? profile_image : null,
            gender ? gender : null,
            age ? age : null,
            experiance ? experiance : null,
            barber_id ? barber_id : null,
        ]
        
        }
        console.log(values)
        const result = await pool.query(query , values)

        console.log(result)

        if(result.rows[0]){
            res.json({
                message : "Record Updated",
                status : true,
                result:result.rows[0]
            })
        }
        else{
            res.json({
                message: "Record could not be updated",
                status :false,
            })
        }

    }
    catch (err) {
        console.log(err)
        res.json({
            message: "Error Occurred",
            status: false,
            error: err.message
        })
    }
}


const registerSchema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),

});
