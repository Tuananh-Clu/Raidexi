import { SendMailRequest } from "../types";
import { ToasterUi } from "../Ui/ToasterUi";
import { API, api_Response } from "./Api";
export async function SendMailService({data}:{data:SendMailRequest}){ 
    try {
      const response=await api_Response(API.Mail.SendMail,'POST',data);
      ToasterUi("Send mail successfully","success");
      return response;
    } catch (error) {
      throw error;
    }
}

import emailjs from "@emailjs/browser";

export async function SendMailContactService({
  name,
  email,
  message,
  tier
}: {
  name: string;
  email: string;
  message: string;
  tier: string;
}) {

  try {
    const result = await emailjs.send(
  "service_2tje0vx","template_xuvg378",
      {
        to_email: "yianh798@gmail.com",
        name: name,
        email: email,
        message: message,
        tier: tier
      },
      "J3o5rN-RFSauSnfEv"      
    );

    console.log("Email sent:", result.text);
    return true;

  } catch (error) {
    console.error("Send mail error:", error);
    return false;
  }
}