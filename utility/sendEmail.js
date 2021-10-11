const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
let moment = require('moment');

const sourceFile = './report.html';

module.exports = {
    mail
};

let today_date = moment().format('YYYY-MM-DD');

function mail(){
    fs.access(sourceFile, fs.F_OK, (err) => {
        if (err) {
          console.error(err)
          return
        }

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            secureConnection: true,
            port: 587,
            auth: {
                user: 'ajayvinay2012@gmail.com',
                pass: 'lqkchewnbqjvgbef'
            }   
        });
        
        let mailOptions = {
            from: 'ajayvinay2012@gmail.com',
            to:'dinesh.kaushik@zoxima.com, ajay.verma@zoxima.com',
            subject:`JK_Paper_test_cases_result_${today_date}`,
            text:`Please find attachment for the JK Paper test cases result.
            Thank you.`,
            attachments: [
                {
                    filename: `test_cases_report_${today_date}.html`,
                    path: path.join(__dirname, `../report.html`)
                }
            ]
        };
        
        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                console.log("Unable send email", error)
            }
            else{
                console.log('Email sent!' + info.response)
            }
        } )
              
      })
    
}
mail();