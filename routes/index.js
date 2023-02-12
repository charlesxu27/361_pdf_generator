const express = require('express')
const PDFDocument = require('pdfkit');

const router = express.Router()

router.get('/pdf', async (req, res) => {

    const doc = new PDFDocument({ font: 'Helvetica' });

    doc.pipe(res)

    let date = new Date()
    let username = req.body.userName
    let user_address = req.body.userAddress
    let hiring_manager = req.body.hiringManagerName
    let company_address = req.body.companyAddress
    let letter_content = req.body.letterContent

    doc.fontSize(12);
    doc.text(date, { align: 'left' });
    doc.text(username, { align: 'left' });
    doc.text(user_address, { align: 'left' });
    doc.moveDown();
    doc.text(hiring_manager, { align: 'left' });
    doc.text(company_address, { align: 'left' });
    doc.moveDown();
    doc.text(letter_content, { align: 'left' });

    // Finalize PDF file
    doc.end();

    res.writeHead(200, {
        'Content-Type': 'application/pdf',
      });
});


module.exports = router;