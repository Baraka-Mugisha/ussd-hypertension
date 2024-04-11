const express = require("express");
const responses = require("./responses");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Welcome to ussd app");
});
app.post("/ussd", (req, res) => {
  let { sessionId, serviceCode, phoneNumber, text } = req.body;
  // let response = "";

  text = processText(text);

  let response = responses[text];
  console.log(text, response);
  if (!response) {
    response = `END Thank you for using our USSD service.`;
  }

  res.set("Content-Type: text/plain");
  res.send(response);
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

function processText(text) {
  let splitText = text.split("*").reverse();
  let processedNumbers = [];

  for (let i = 0; i < splitText.length; i++) {
    if (splitText[i] === "99") {
      i++;
    } else if (splitText[i] === "0") {
      i = i + 2;
      // return "";
    } else {
      processedNumbers.push(splitText[i]);
    }
  }

  // if (processedNumbers[0] === "0") {
  //   // console.log(processedNumbers);

  //   return "";
  // }

  // if (splitText[0] === "0") {
  //   console.log("got here", splitText);
  //   return "";
  // }

  return processedNumbers.reverse().join("*");
}
