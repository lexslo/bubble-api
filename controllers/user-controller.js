const { Thought, User } = require('../models');

const userController = {
        // /api/users
        // GET all users
        getAllUsers(req, res) {
            User.find({})
                .populate({
                    path: 'thoughts',
                    select: '-__v'
                })
                .select('-__v')
                .then(dbUserData => res.json(dbUserData))
                .catch(err => res.status(400).json(err));
        },
        // GET a single user by its _id and populated thought and friend data
        getUserById({ params }, res) {
            User.findOne({ _id: params.id })
                .populate({
                    path: ['thoughts', 'friends'],
                    select: '-__v'
                })
                .select('-__v')
                .then(dbUserData => {
                    if (!dbUserData) {
                        res.status(404).json({ message: 'No user found with this ID!' });
                        return;
                    }
                    res.json(dbUserData);
                })
                .catch(err => res.status(400).json(err));
        },

        //POST a new user:

        // example data
        // {
        //   "username": "lernantino",
        //   "email": "lernantino@gmail.com"
        // }
        addUser({ body }, res) {
            User.create(body)
                .then(dbUserData => res.json(dbUserData))
                .catch(err => res.status(400).json(err));
        },

        // PUT to update a user by its _id
        updateUser({ params, body }, res) {
            User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
                .then(dbUserData => {
                    if (!dbUserData) {
                        res.status(404).json({ message: 'No user found with this ID!' });
                        return;
                    }
                    res.json(dbUserData);
                })
                .catch(err => res.status(400).json(err));
        },

        // DELETE to remove user by its _id
        deleteUser({ params }, res) {
            User.findOneAndDelete({ _id: params.id })
                .then(dbUserData => {
                    if (!dbUserData) {
                        res.status(404).json({ message: 'No user found with this ID!' });
                        return;
                    }
                    res.json(dbUserData);
                })
                .catch(err => res.status(400).json(err));
        },

        // /api/users/:userId/friends/:friendId

        // POST to add a new friend to a user's friend list
        addFriend({ params, body }, res) {
            User.findOneAndUpdate({ _id: params.userId }, { $addToSet: { friends: body } }, { new: true, runValidators: true })
                .then(dbUserData => {
                    if (!dbUserData) {
                        res.status(404).json({ message: 'No user found with this ID!' });
                        return;
                    }
                    res.json(dbUserData);
                })
                .catch(err => res.status(400).json(err));
        },

        // DELETE a friend from a user's friend list
        deleteFriend({ params }, res) {
            User.findOneAndUpdate({ _id: params.userId }, { $pull: { friends: { friendId: params.friendId } } }, { new: true, runValidators: true })
                .then(dbUserData => {
                    if (!dbUserData) {
                        res.status(404).json({ message: 'No user found with this ID!' });
                        return;
                    }
                    res.json(dbUserData);
                })
                .catch(err => res.status(400).json(err));
        }

    }
    /*
    BONUS: Remove a user's associated thoughts when deleted.
    */

module.exports = userController;