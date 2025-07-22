export function generateOtp():number{
    const otp = Math.floor(100000+Math.random()*999999)
    return otp
}