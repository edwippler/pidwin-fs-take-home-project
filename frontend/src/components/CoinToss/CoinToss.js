import React, {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {useDispatch} from "react-redux";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from "@mui/material";
import {tossCoin} from "../../actions/tossCoin";

const CoinToss = () => {
  const [user, setUser] = useState(
    localStorage.getItem("profile")
      ? jwtDecode(JSON.parse(localStorage.getItem("profile")).token)
      : "null"
  );
  const [wager, setWager] = useState(0);
  const [choice, setChoice] = useState('');
  const [tossHistory, setTossHistory] = useState(user.tossHistory || []);
  const [roundResult, setRoundResult] = useState(true ? 'You Win!' : 'You Lose')
  const dispatch = useDispatch();

  const handleChoiceSelect = (e) => {
    setChoice(e.target.value);
  }
  const handleWagerChange = (e) => {
    setWager(e.target.value);
  }
  const handleSubmitFlip = (e) => {
    e.preventDefault();
    if (!choice || wager <= 0) {
      alert("Must select a side of the coin and place wager before flipping");
    } else {
      console.log(`Coin flipped: ${choice} ${wager}`);
      const email = user.email;
      // format the state data into object for request to server
      dispatch(tossCoin({wager, choice, email}));
    }
  }

  return (
    <div id="game-inputs" style={{marginTop: 25}}>
      <FormControl>
        <FormLabel id="coin-toss-selection">Coin Toss Selection</FormLabel>
        <RadioGroup onChange={handleChoiceSelect} value={choice} row>
          <FormControlLabel control={<Radio />} value="heads" label="Heads" />
          <FormControlLabel control={<Radio />} value="tails" label="Tails" />
        </RadioGroup>
      </FormControl>
      <TextField id="wager-input" label="Wager" value={wager} type="number" onChange={handleWagerChange} />
      <Button style={{margin: 10}} varient="contained" onClick={handleSubmitFlip}>Flip Coin</Button>
      {/*TODO: Convert this to a separate component*/}
      <div id="toss-history" style={{margin: 20}}>
        <Typography variant="h4" style={{textAlign: 'center'}}>{roundResult}</Typography>
        <Typography variant="h6" style={{textAlign: 'center'}}>
          History
        </Typography>
        {/*Show all history*/}
        {/*<p>{tossHistory?.win ? "W" : "L"}</p>*/}
        {/*<p>{tossHistory?.guess}</p>*/}
        {/*<p>{tossHistory?.coinToss}</p>*/}
        {/*<p>{tossHistory?.wager}</p>*/}
      </div>
    </div>
  )

};

export default CoinToss;