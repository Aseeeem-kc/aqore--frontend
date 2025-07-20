import { Component } from '@angular/core';
import { ChatbotService } from '../../Services';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {
  isOpen = false;
  messages: ChatMessage[] = [];
  userInput = '';
  loading = false;
  error = '';

  constructor(private chatbotService: ChatbotService) {}

  toggleChat(): void {
    this.isOpen = !this.isOpen;
    this.error = '';
  }

  sendMessage(): void {
    const query = this.userInput.trim();
    if (!query) return;
    this.messages.push({ sender: 'user', text: query });
    this.userInput = '';
    this.loading = true;
    this.error = '';
    this.chatbotService.sendQuery(query).subscribe({
      next: (res) => {
        this.messages.push({ sender: 'bot', text: res.response });
        this.loading = false;
      },
      error: (err) => {
        this.messages.push({ sender: 'bot', text: 'Sorry, there was an error.' });
        this.error = err.error?.message || 'Chatbot error.';
        this.loading = false;
      }
    });
  }

  handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  closeChat(): void {
    this.isOpen = false;
    this.error = '';
  }
} 