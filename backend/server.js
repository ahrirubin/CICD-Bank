import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

function generateOTP() {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
}

const users = [];
const accounts = [];
const sessions = [];


app.post("/users", (req, res) => {
  const { username, password } = req.body;
  const id = users.length + 1; 
  const newUser = { id, username, password };
  users.push(newUser);

  console.log(newUser);

  
  const accountId = accounts.length + 1;
  const newAccount = { id: accountId, userId: id, amount: 0 };
  accounts.push(newAccount);

  console.log(newAccount);

  res.json({
    success: true,
    message: "Användare och konto skapade framgångsrikt.",
  });
});


app.post("/sessions", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Ogiltiga inloggningsuppgifter." });
  }


  const token = generateOTP();
  sessions.push({ userId: user.id, token });

  res.json({ success: true, token }); 

  console.log(sessions);
});


app.post("/me/accounts", (req, res) => {
  const { token } = req.body;

  console.log("token", token);

  const session = sessions.find((session) => session.token === token);

  if (!session) {
    return res
      .status(401)
      .json({ success: false, message: "Ogiltig sessions token." });
  }

  const userId = session.userId;
  const account = accounts.find((account) => account.userId === userId);

  if (!account) {
    return res
      .status(404)
      .json({ success: false, message: "Konto hittades inte för användaren." });
  }

  res.json({ success: true, amount: account.amount });
  console.log(account);
});


app.post("/me/accounts/transactions", (req, res) => {
  const { token, amount, otp } = req.body;

  const session = sessions.find((session) => session.token === token);

  if (!session) {
    return res
      .status(401)
      .json({ success: false, message: "Ogiltig sessions token." });
  }

  const userId = session.userId;
  const user = users.find((user) => user.id === userId);

  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Ogiltiga autentiseringsuppgifter." });
  }

  const account = accounts.find((account) => account.userId === userId);

  if (!account) {
    return res
      .status(404)
      .json({ success: false, message: "Konto hittades inte för användaren." });
  }

  
  const sessionWithOTP = sessions.find(
    (session) => session.token === token && session.otp === otp
  );

  if (!sessionWithOTP) {
    return res
      .status(401)
      .json({ success: false, message: "Felaktigt engångslösenord." });
  }


  account.amount += parseFloat(amount);

  res.json({ success: true, newBalance: account.amount });
});


app.listen(port, () => {
  console.log(
    `Bankens backend körs på http://ec2-51-20-191-164.eu-north-1.compute.amazonaws.com:${port}`
  );
});
