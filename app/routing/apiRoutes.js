var friendData = require("../data/friends");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function (req, res) {
        res.json(friendData);
    });


    // I am using get to reset the list, being lazy, this should be update I believe
    // if I am faithful the the REST concepts

    app.get("/api/reset", function (req, res) {
        // resets the friend Data to the original data set
        friendData = [
            {
                name: "hot guy",
                photo: "https://media2.giphy.com/media/3ov9jVedETgcdCNjHi/giphy.gif",
                scores: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            },
            {
                name: "hot girl",
                photo: "https://media.giphy.com/media/njqtXo391qcVy/giphy.gif",
                scores: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
            }
        ]
        res.json(friendData);
    });

    // API POST Requests

    app.post("/api/friends", function (req, res) {
        // find a friend and return results
        findFriend(req.body, friendData, res)
    });


};

function findFriend(newFriend, friendList, res) {
    // new friend is the the one that entered on the form

    // loop through each name on current list
    var minscore = 1000
    var bestMatchFriend = {}  // matching form initalized to zero
    bestMatchFriend['result'] = false

    // loop through each name on current list
    newFriendScoreList = newFriend['scores']
    for (let i = 0; i < friendList.length; i++) {

        // potentail best 
        potentialScorelist = friendList[i]['scores']

        // calculate total score deviation 
        totalscore = 0
        for (let j = 0; j < potentialScorelist.length; j++) {
            totalscore += Math.abs(newFriendScoreList[j] - potentialScorelist[j])
        }

        // if this is better than correct score
        // thenreplace
        if (totalscore < minscore) {
            bestMatchFriend = friendList[i]
            bestMatchFriend['result'] = true
            minscore = totalscore
        }
    }

    // results of looping through values
    console.log(minscore)
    console.log(bestMatchFriend)

    // now add the new friend into the list
    friendData.push(newFriend)

    // return results
    res.json(bestMatchFriend)
}
