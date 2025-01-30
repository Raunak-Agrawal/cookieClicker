const updateUserScore = async (userId, User) => {
    let user = await User.findOne({ userId });
    if (!user) {
        user = new User({ userId, totalScore: 0, prizesWon: 0 });
    }

    let scoreIncrease = 1;
    let prizeWon = false;

    if (Math.random() < 0.5) {
        scoreIncrease += 9; // Total increase of 10
    }
    if (Math.random() < 0.25) {
        prizeWon = true;
        user.prizesWon += 1;
    }

    user.totalScore += scoreIncrease;
    await user.save();

    return { totalScore: user.totalScore, prizeWon };
};

module.exports = { updateUserScore };