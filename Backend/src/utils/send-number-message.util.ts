// import { env } from "../configs/env.config";
// import twilio from "twilio";

// const client = twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);

// export const send_numberOTP = async (phone_number: string, otp: number): Promise<void> => {
//   try {
//     const message = await client.messages.create({
//       body: `Your Evenzo OTP is ${otp}. Do not share it with anyone.`,
//       from: env.TWILIO_PHONE_NUMBER,
//       to:phone_number,
//     });

//     console.log("✅ Twilio SMS Sent:", message.sid);
//   } catch (error) {
//     console.error("❌ Failed to send SMS with Twilio:", error);
//     throw error;
//   }
// };
