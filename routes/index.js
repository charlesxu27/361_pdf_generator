const express = require("express");
const PDFDocument = require("pdfkit");

const router = express.Router();

const API_KEY = process.env.MY_API_KEY;
const API_ENDPOINT = process.env.MY_API_ENDPOINT;

async function getCoverLetter(chatPrompt) {
  const response = await axios.post(
    API_ENDPOINT,
    {
      prompt: chatPrompt,
      stop: "\n",
    },
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "applicaiton/json",
      },
    }
  );

  const { choices } = response.data;
  return choices[0].text;
}

router.post("/pdf", async (req, res) => {
  const coverLetterPrompt =
    "Given the following resume: \n" +
    req.body.resumeText +
    "\n and the following role: " +
    req.body.jobTitle +
    "at the company: " +
    req.body.companyName +
    "with the job description: " +
    req.body.jobDescription +
    "write a cover letter without any salutations or closing remarks.";

  const doc = new PDFDocument({ font: "Helvetica", compress: false });

  doc.pipe(res);

  let date = new Date();
  let options = { month: "long", day: "numeric", year: "numeric" };
  let formattedDate = date.toLocaleDateString("en-US", options);

  let username = req.body.firstName + req.body.lastName;
  let hiring_manager = req.body.hiringManagerName;

  let company_address =
    req.body.address1 +
    "\n" +
    req.body.city +
    "\n" +
    req.body.state +
    req.body.zipcode;

  let content = await getCoverLetter(coverLetterPrompt);

  doc.fontSize(12);
  doc.text(formattedDate, { align: "left" });
  doc.moveDown();
  doc.text(hiring_manager, { align: "left" });
  doc.text(company_address, { align: "left" });
  doc.moveDown();
  doc.moveDown();
  doc.text("Dear " + hiring_manager + ", ", { align: "left" });
  doc.moveDown();
  doc.text(content, { align: "left" });
  doc.moveDown();
  doc.text("Sincerely,", { align: "left" });
  doc.moveDown();
  doc.text(username, { align: "left" });

  // Finalize PDF file
  doc.end();

  res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment;filename=coverletter.pdf`,
  });
});

module.exports = router;

// Note: https://github.com/devongovett/blob-stream/issues/5
// Blobstream does not work in node, so we use this workaround.
