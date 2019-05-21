
var friends = require('../data/friends.js');

module.exports = function (app) {
    app.get('/api/friends', function (req, res) {
        res.json(friends);
    });

    app.post('/api/friends', function (req, res) {
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };

        var userData = req.body;
        var userScores = userData.score;
        var totalDifference = 0;

        for (var i = 0; i < friends.length; i++) {
            console.log("req.body"+ req.body.score)
            
            for (var j = 0; j < 10; j++) {totalDifference = Math.abs(parseInt(req.body.score) - parseInt(friends[i].score[j]));
                console.log("friend score"+ parseInt(friends[i].score[j]) + "total"+ totalDifference + "friend diff" + bestMatch.friendDifference)
                if (totalDifference <= bestMatch.friendDifference) {
                    console.log("bestMatch");
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDifference;
                    console.log(bestMatch);
                }
            }
        }
        friends.push(userData);
        res.json(bestMatch);
    });
};