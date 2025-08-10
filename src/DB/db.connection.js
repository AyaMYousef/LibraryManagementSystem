import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()



const dbConnection = async() =>{
    try{
        await mongoose.connect(process.env.DB_URL,{ serverSelectionTimeoutMS: 5000 })
        console.log('Connected Successfully to DB');
    }
    catch(error){
        console.log('DataBase failed to connect', error)

    }
}

export default dbConnection;