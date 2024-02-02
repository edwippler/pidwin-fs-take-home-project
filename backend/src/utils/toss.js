const toss = async (wager, choice, history) => {
  try {
    let result = {
      tokenDiff: 0,
      history: []
    }
    let winningMultiplier = 2;
    const flipResult = Math.random() < 0.5 ? 'heads' : 'tails';
    let didWin = flipResult === choice;
    console.log(`Flip result: ${flipResult}`);

    if (didWin) {
      // If last two in history are win and didWin - winningMultiplier = 3

      // if last four in history are win and didWin - winningMultiplier = 10

      result.tokenDiff = wager * winningMultiplier;
    } else {
      result.tokenDiff = wager * -1;
    }

    return result;
  } catch (error) {}
}

export default toss;