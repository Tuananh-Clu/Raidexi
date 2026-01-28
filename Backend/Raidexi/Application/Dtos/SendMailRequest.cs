namespace Raidexi.Application.Dtos
{

        public class SendMailRequest
        {
            public string To { get; set; }
            public string Subject { get; set; }
            public string Html { get; set; }
            public AttachmentDto Attachment { get; set; }
        }

        public class AttachmentDto
        {
            public string FileName { get; set; }
            public string MimeType { get; set; }
            public string Base64 { get; set; }
        }
    
}
