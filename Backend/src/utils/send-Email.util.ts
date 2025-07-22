import transporter from "../configs/nodemailer.config";


export const sendOtpEmail = async (email: string, otp: number) => {
    try{

        const mailOptions = {
            from: '',
            to: email,
            subject: 'inker OTP Verificaiton',
            html: `
          <h1>OTP Verification</h1>
          <p>Your OTP is: ${otp}</p>
          <p>Use this OTP to verify your email. Do not share it with anyone.</p>`
        }
    
        const info = await transporter.sendMail(mailOptions)
        console.log("OTP mail send successfully", info.response)
    }catch(err){
        console.error('Error sending verification email:', err);
        throw new Error("Error sending otp email")
    }

}