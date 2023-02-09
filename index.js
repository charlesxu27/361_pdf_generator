const express = require('express');
const PORT = 42555;
const app = express();
app.use( express.json() );

const PDFDocument = require('pdfkit');
const blobStream = require('blob-stream');

app.listen(PORT, () => console.log('http://localhost:' + PORT))


app.post('/getpdf', (req, res) => {
    //res.status(200).json(req.body);
    //create new doc
    let doc = new PDFDocument({font: 'Helvetica'});

    // pipe the doc to a blob
    let stream = doc.pipe(blobStream());

    // add stuff to PDF here
    let date = new Date()
    let username = req.body.userName
    let user_address = req.body.userAddress
    let hiring_manager = req.body.hiringManagerName
    let company_address = req.body.companyAddress
    let letter_content = req.body.letterContent

    doc.fontSize(12);
    doc.text(date, {align:'left'});
    doc.text(username, {align:'left'});
    doc.text(user_address, {align:'left'});
    doc.moveDown();
    doc.text(hiring_manager, {align:'left'});
    doc.text(company_address, {align:'left'});
    doc.moveDown();
    doc.text(letter_content, {align:'left'});

    // finalize the PDF and end the stream, send blob to url to display in browswer
    doc.end();
    stream.on('finish', function() {
        const url = stream.toBlobURL('application/pdf');
        const blob = stream.toBlob('application/pdf');
        console.log(url)
        console.log(blob)
        console.log(blob.text())
        res.status(200).send(url)
        // res.status(200).send(url);
    });
});
