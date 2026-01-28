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