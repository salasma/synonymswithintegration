const express = require("express");
const cors = require("cors");
const thesaurus = require('./thesaurus');
const port = 3009;
const app = express();

app.use(cors());
app.use("/", express.static("public"));
app.use("/", express.json());


app.get("/:word/synonym", async (req, res) => {
    const { word } = req.params
    let data = thesaurus.synonyms(word)
    console.log(data)
    res.json({ original: word, synonym: data.synonyms[0] })
});

app.listen(port, function() {
    console.log(`Listening on port ${port} – http://localhost:${port}`);
});
