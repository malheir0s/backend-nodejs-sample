const user = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../config/auth');

module.exports = {

    async register(req, res) {
        if (await user.findOne({ email: req.body.email })) {
            return res.status(409).send({ error: 'Email already exists.' });
        }
        try {
            const User = await user.create(req.body);
            User.password = undefined;
            return res.status(201).send({ User });
        } catch (err) {
            return response.status(400).send({ error: 'User register failed.' });
        }
    },

    async authenticate(req, res) {
        const {email} = req.body.email;
        const User = await user.findOne(email).select('+password');

        if (!User) {
            return res.status(404).send({ error: 'User not found' });
        }

        if (! await bcrypt.compare(req.body.password, User.password)) {
            return response.status(401).send({ error: 'Invalid user or password.' });
        }

        User.password = undefined;

        const token = jwt.sign({id: User._id}, auth.secret, {
            expiresIn: 3600,
        });

        return res.status(200).send({User,token});
    }

}
