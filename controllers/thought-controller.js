const { Thought, User } = require('../models');

const thoughtController = {
        // get all thoughts
        getAllThoughts(req, res) {
            Thought.find({})
                // sort in DESC order by the _id value
                .sort({ _id: -1 })
                .then(dbThoughtData => res.json(dbThoughtData))
                .catch(err => {
                    console.log(err);
                    res.status(400).json(err);
                });
        },

        // get a single thought by its _id
        getThoughtById({ params }, res) {
            Thought.findOne({ _id: params.id })
                .then(dbThoughtData => {
                    if (!dbThoughtData) {
                        res.status(404).json({ message: 'No thought found with this id!' });
                        return;
                    }
                    res.json(dbThoughtData);
                })
                .catch(err => {
                    console.log(err);
                    res.status(400).json(err);
                });
        }
    }
    /*

    POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)

    // example data
    {
      "thoughtText": "Here's a cool thought...",
      "username": "lernantino",
      "userId": "5edff358a0fcb779aa7b118b"
    }
    PUT to update a thought by its _id

    DELETE to remove a thought by its _id

    /api/thoughts/:thoughtId/reactions

    POST to create a reaction stored in a single thought's reactions array field

    DELETE to pull and remove a reaction by the reaction's reactionId value
    */