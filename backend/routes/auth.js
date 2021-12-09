const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();
const {NODEMAILER_USER, NODEMAILER_PASS} = process.env;


var appDir = path.dirname(require.main.filename)

router.post('/email', async(req, res)=>{
    const authNum = generateRandom(111111,999999)
    
    let emailTemplete;
    ejs.renderFile(appDir+'/template/userAuth.ejs',{authCode:authNum}, (err, data)=>{
        if (err) console.log(err)
        emailTemplete = data
    })

    const smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        hoat: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: NODEMAILER_USER,
            pass: NODEMAILER_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    
    });

    let mailOptions = await smtpTransport.sendMail({
        from: `'developer' <${NODEMAILER_USER}>`,
        to: req.body.email,
        subject: "[회원가입] 인증 이메일입니다.",
        html: emailTemplete,
    });

    smtpTransport.sendMail(mailOptions, (err, info)=>{
        if (err) console.log(err);
        console.log('Finish sending email : ' + info.response);
        res.send(authNum);
        smtpTransport.close()
    });

})

module.exports=router;