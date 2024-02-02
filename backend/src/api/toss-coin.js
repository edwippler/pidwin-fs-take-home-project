import User from "../models/user.js";
import toss from "../utils/toss.js";

const tossCoin = async (req, res) => {
  const { email, wager, choice} = req.body;
  console.log(req.body);
  const validChoices = ['heads', 'tails'];

  try {
    const existingUser = await User.findOne({email});

    if(!existingUser) {
      return res.status(404).json({message: "User does not exist"})
    }
    if(wager <= 0 || !validChoices.includes(choice) ) {
      return res.status(400).json({message: "Invalid wager or selection provided"});
    }
    const tossResult = await toss(wager, choice);

    // const updateTokens = await User.findByIdAndUpdate(
    //   existingUser._id,
    //   {}
    // )

    res.status(200).json(tossResult);
  } catch (error) {
    res.status(500).json({message: "Something went wrong, unable to flip coin"});
  }
}

export default tossCoin;