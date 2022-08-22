import { ulid } from 'ulid';
import { hash, compare } from 'bcrypt';
import { redisClient } from '../db/index.js';
import { generateToken } from '../utils/jwtHelper.js';

// Sign Up
const createAccount = async (req, res) => {
    try {
        const { firstName, lastName, email, password, displayName } = req.body;
        const userId = ulid(); // Generate id for the user which will be used as the key in Redis

        // Check if user with that email already exists
        const userEmail = await redisClient.hgetall(`user:${email}`);
        if (userEmail.email === email) {
            return res.status(409).send({
                error: true,
                message: 'Account with that email already exists.',
                data: '',
            });
        }

        // Encrypt the users password before saving
        const hashedPassword = await hash(password, 10);

        // Create user account
        const createUser = await redisClient.execute([
            'HSET',
            `user:${email}`,
            'id',
            `${userId}`,
            'firstName',
            `${firstName}`,
            'lastName',
            `${lastName}`,
            'email',
            `${email}`,
            'password',
            `${hashedPassword}`,
            'displayName',
            `${displayName}`,
        ]);

        // Generate token for the user
        const token = await generateToken({ userKey: `user:${email}`, userId })

        if (createUser && typeof createUser === 'number') {
            const user = await redisClient.hgetall(`user:${email}`);
            return res.status(201).send({
                error: false,
                message: 'Account successfully created.',
                data: { token, user },
            });
        }
    } catch (error) {
        return res.status(500).send({
            error: true,
            message: `Server error, please try again later. ${error}`
        });
    }
};

// Log In
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Get the user details from Redis
        const user = await redisClient.hgetall(`user:${email}`);

        // Check if user with that email exists
        const userEmail = await redisClient.hgetall(`user:${email}`);
        if (userEmail.email !== email) {
            return res.status(409).send({
                error: true,
                message: 'Account with that email not exists.',
                data: '',
            });
        }

        const validaPassword = await compare(password, user.password);
        if (!user.email || !validaPassword) {
            return res.status(401).send({
                error: true,
                message: 'Invlaid email or password.',
            });
        }

        // Generate a token for the user to perform other operations
        const token = await generateToken({ userKey: `user:${email}`, userId: user.id })
        return res.status(200).send({
            error: false,
            message: 'Login successfully. You will redirect shortly.',
            data: { token, user },
        });
    } catch (error) {
        return `Server error, please try again later. ${error}`;
    }
};

export { createAccount, login };