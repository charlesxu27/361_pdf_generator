// const PDFDocument = require('pdfkit');

// function createPDF(data) {
//     const doc = new PDFDocument({ font: 'Helvetica' });

//     doc.pipe(res)

//     let date = new Date()
//     let username = data.userName
//     let user_address = data.userAddress
//     let hiring_manager = data.hiringManagerName
//     let company_address = data.companyAddress
//     let letter_content = data.letterContent

//     doc.fontSize(12);
//     doc.text(date, { align: 'left' });
//     doc.text(username, { align: 'left' });
//     doc.text(user_address, { align: 'left' });
//     doc.moveDown();
//     doc.text(hiring_manager, { align: 'left' });
//     doc.text(company_address, { align: 'left' });
//     doc.moveDown();
//     doc.text(letter_content, { align: 'left' });

//     // Finalize PDF file
//     doc.end();

//     res.writeHead(200, {
//         'Content-Type': 'application/pdf',
//       });
// }

// module.exports = { createPDF }
