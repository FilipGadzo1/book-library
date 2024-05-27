import emailjs from '@emailjs/browser';
import type { EmailTemplate } from './types/book';

export class EmailService {
  service: string;
  templateId: string;
  userId: string;

  constructor(serviceId: string, templateId: string, userId: string) {
    this.service = serviceId;
    this.templateId = templateId;
    this.userId = userId;
  }

  async sendEmail(template: EmailTemplate): Promise<void> {
    await emailjs.send(this.service, this.templateId, template, {
      publicKey: this.userId,
    });
  }
}
