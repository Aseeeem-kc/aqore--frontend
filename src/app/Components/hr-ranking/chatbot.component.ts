import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
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
export class ChatbotComponent implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  isOpen = false;
  messages: ChatMessage[] = [];
  userInput = '';
  loading = false;
  error = '';
  healthy = true;

  constructor(private chatbotService: ChatbotService) {}

  ngOnInit() {
    this.chatbotService.checkHealth().subscribe({
      next: res => {
        if (res.status !== 'healthy') {
          this.healthy = false;
          this.error = 'Chatbot service is unavailable.';
        } else {
          this.healthy = true;
          this.error = '';
        }
      },
      error: () => {
        this.healthy = false;
        this.error = 'Could not connect to chatbot service.';
      }
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch {}
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen;
    this.error = '';

    // Add ready/help message when opening for the first time
    if (this.isOpen && this.messages.length === 0) {
      this.messages.push({
        sender: 'bot',
        text: `👋 Hello! I am your AI assistant.\n\n` +
              `Here are some things you can try:\n` +
              `• Provide top 3 suitable candidates for a ____ role.\n` +
              `• Invite candidates to interviews, e.g., "Invite ashimkc7297@gmail.com for interview at 10 AM tomorrow."\n` +
              `• Generate candidate feedback and HR analysis.\n` +
              `• Ask about resume scoring or candidate skill assessment.\n\n` +
              `Type your request below to get started!`
      });
    }
  }

  sendMessage(): void {
    const query = this.userInput.trim();
    if (!query || !this.healthy) return;

    this.messages.push({ sender: 'user', text: query });
    this.userInput = '';
    this.loading = true;
    this.error = '';

    this.chatbotService.sendMessage(query).subscribe({
      next: (res) => {
        this.messages.push({ sender: 'bot', text: res.response });
        this.loading = false;
      },
      error: () => {
        this.messages.push({ sender: 'bot', text: 'Sorry, there was an error.' });
        this.error = 'Error communicating with chatbot.';
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
