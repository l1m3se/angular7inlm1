const db = require('mongoose');
const encrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');


// unrestricted
exports.register = function (req, res) {

    User
        .find({ email: req.body.email })
        .exec()
        .then(function (user) {
            if (user.length > 0) {
                return res.status(400).json({
                    message: `A user with email address ${req.body.email} already exists.`,
                    statuscode: 400
                })
            }
            else {
                encrypt.hash(req.body.password, 10, function (error, hash) {
                    if (error) {
                        return res.status(500).json({
                            error: error,
                            message: ` ${req.body.email}`
                        });
                    }
                    else {

                        let user = new User(
                            {

                                _id: new db.Types.ObjectId,
                                firstname: req.body.firstname,
                                lastname: req.body.lastname,
                                addressline: req.body.addressline,
                                zipcode: req.body.zipcode,
                                city: req.body.city,
                                country: req.body.country,
                                delivery_addressline: req.body.addressline,
                                delivery_zipcode: req.body.zipcode,
                                delivery_city: req.body.city,
                                delivery_country: req.body.country,
                                dateofbirth: req.body.dateofbirth,
                                email: req.body.email,
                                password: hash

                            }
                        );

                        user
                            .save()
                            .then(function () {
                                res.status(201).json({
                                    message: `The user ${req.body.firstname} ${req.body.lastname} was created successfully.`,
                                    statuscode: 201,
                                    success: true
                                })
                            })
                            .catch(function (error) {
                                res.status(500).json({
                                    message: `Failed to create user ${req.body.firstname} ${req.body.lastname}.`,
                                    statuscode: 500,
                                    success: false
                                })
                            })
                    }
                })
            }
        })
}

exports.login = function (req, res) {
    User
        .find({ email: req.body.email })
        .then(function (user) {
            if (user.length === 0) {
                return res.status(400).json({
                    message: "Email address or password is incorrect",
                    statuscode: 401,
                    success: false
                })
            }
            else {
                encrypt.compare(req.body.password, user[0].password, function (error, result) {
                    if (error) {
                        return res.status(400).json({
                            message: "Email address or password is incorrect",
                            statuscode: 401,
                            success: false
                        })
                    }

                    if (result) {
                        const token = jwt.sign(
                            { id: user[0]._id, email: user[0].email },
                            process.env.PRIVATE_SECRET_KEY,
                            { expiresIn: "1h" }
                        )

                        return res.status(200).json({
                            message: "Authentication was successful",
                            success: true,
                            token: token,
                            id: user[0]._id,
                            firstname: user[0].firstname,
                            lastname: user[0].lastname,
                            addressline: user[0].addressline,
                            zipcode: user[0].zipcode,
                            city: user[0].city,
                            email: user[0].email,
                        })
                    }

                    return res.status(400).json({
                        message: "Email address or password is incorrect",
                        statuscode: 401,
                        success: false
                    })
                })
            }
        })
}


// restricted
exports.getUsers = function (req, res) {
    User.find()
        .exec()
        .then(users => res.status(200).json(users))
        .catch(() => res.status(500).json({
            errorcode: "500",
            message: "Something went wrong",
            success: false
        }));
}

exports.getUser = (req, res) => {
    User.findOne({ _id: req.params.id })
        .exec()
        .then((user) => res.status(200).json(user))
        .catch(() => res.status(500).json({
            errorcode: "500",
            message: "Something went wrong",
            success: false
        }));
}

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((user) => res.status(200).json({ message: `User ${user.firstname} ${user.lastname} was updated.`, email: user.email, firstname: user.firstname, lastname: user.lastname }))
        .catch(() => res.status(500).json({
            errorcode: "500",
            message: "Something went wrong",
            success: false
        }));
}

exports.updateEmail = (req, res) => {
    User
        .find({ email: req.body.email })
        .exec()
        .then(function (user) {
            if (user.length > 0) {
                return res.status(400).json({
                    message: `A user with email address ${req.body.email} already exists.`,
                    statuscode: 400, 
                    success: false
                });
            } else {
                User.findByIdAndUpdate(req.params.id, req.body, { new: true })
                .then((user) => res.status(200).json({ message: `User ${user.firstname} ${user.lastname} was updated.`, email: user.email, firstname: user.firstname, lastname: user.lastname }))
                .catch(() => res.status(500).json({
                    errorcode: "500",
                    message: "Something went wrong",
                    success: false
                }));
            }
        });
}

exports.updatePassword = (req, res, next) => {
    const password = req.body.password;

    encrypt.hash(password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }

        req.body.password = hash;

        User.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, user) {
            if (err) return res.send(err).status(500);
            return res.status(200).json(user);
        });
    });
}


exports.deleteUser = (req, res) => {
    User.findByIdAndRemove({ _id: req.params.id })
        .exec()
        .then(user => res.status(200).json({
            message: `User was removed.`
        }))
        .catch(() => res.status(500).json({
            errorcode: "500",
            message: "Something went wrong",
            success: false
        }));
}