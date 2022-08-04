import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export const generateToken = async payload => {
    return await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: parseInt('20d', 10),
    });
};

export const jwtValidator = async token => {
    try {
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET,);
        return decodedToken;
    } catch (error) {
        return false;
    }
};