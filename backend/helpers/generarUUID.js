import crypto from "crypto";
//import { randomUUID } from 'crypto';
//console.log(randomUUID());

 
const generarId = () => {
    return crypto.randomBytes(64).toString('hex');
}

 
export default generarId;