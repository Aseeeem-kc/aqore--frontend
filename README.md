# Aqore Hackathon 2025 – Innovate Staffing with AI

---
Your challenge is to explore how AI can enhance, automate, or transform staffing software. Think beyond traditional workflows—from candidate sourcing to onboarding, there are endless opportunities for innovation.

Participants are encouraged to propose and build AI-driven features that could reshape the staffing industry. You’re welcome to use the resources provided below or bring your own datasets and models.

---

## 🎯 Goal

You are free to define your own challenge statement within the staffing domain. Explore real problems or inefficiencies in the staffing lifecycle and demonstrate how AI can offer a transformative solution.

This is your opportunity to bring fresh, bold, and practical ideas to life, without being confined to predefined use cases.

---

## 📦 Provided Resources

### 📊 Dataset API

Explore real-world-style staffing data:
- Candidate profiles (resumes, skills, education, work history)
- Client/company data
- Job orders (descriptions, skills, requirements)

**🔗 API Swagger Link:**  
[https://hackathonapi.aqore.com](https://hackathonapi.aqore.com)
---

### 💻 Angular Starter Kit (Frontend)

A pre-wired Angular app to quickly build your UI using the sample dataset.

## 🧰 Prerequisites

To run the Angular app locally, make sure the following are installed:

- **Node.js:** v18.17.0  
- **npm:** v9.6.7 *(npm v9.6.7 is bundled with Node.js v18.17.0 — no separate download required)*  
- **Angular CLI:** v16.1.8  

### 📥 Download Links for Node.js v18.17.0:

- [Windows (x64 MSI)](https://nodejs.org/download/release/v18.17.0/node-v18.17.0-x64.msi)  
- [macOS (PKG)](https://nodejs.org/download/release/v18.17.0/node-v18.17.0.pkg)  
- [Linux & Others](https://nodejs.org/download/release/v18.17.0/)

### ⚙️ Installing Angular CLI

Once Node.js and npm are installed, run the following command to install Angular CLI:

```bash
npm install -g @angular/cli@16.1.8
```

## To verify, run the following in your terminal:
```bash
node -v       # should return v18.17.0
npm -v        # should return 9.6.7
ng version    # should include Angular CLI 16.1.8
```

## Quick Start Instructions

**🔗 GitHub Repo:**  
[https://github.com/dev-aqore/aqore-hackathon](https://github.com/dev-aqore/aqore-hackathon)

#### 🛠 Step-by-step to run the Angular starter kit:

```bash
git clone https://github.com/dev-aqore/aqore-hackathon.git
cd aqore-hackathon
npm install
ng serve
```

---

### 🧠 LLM API

Use this to integrate conversational AI, summarization, classification, or reasoning into your solutions.

**GPT-4o Endpoint:**  
`https://aqore-hackathon-openai.openai.azure.com/openai/deployments/gpt-4o/chat/completions?api-version=2025-01-01-preview`

**GPT-4o-mini Endpoint:**  
`https://aqore-hackathon-openai.openai.azure.com/openai/deployments/gpt-4o-mini/chat/completions?api-version=2025-01-01-preview`

**API Key: (Dummy)**  
`dwew112132132eawed32erwedfw3r`

---

### How to Call the LLM API

Use the following parameters to make a `POST` request to the GPT-4o endpoint.

#### 🔹 Method: `POST`  
#### 🔹 Headers:
```json
{
  "Content-Type": "application/json",
  "api-key": "dwew112132132eawed32erwedfw3r"
}
```

#### 🔹 Body:
```json
{
"messages": [
   {
     "role": "system",
     "content": [
       {
         "type": "text",
         "text": "You are an AI assistant that helps people find information."
       }
     ]
   },
   {
     "role": "user",
     "content": [
       {
         "type": "text",
         "text": "What is in this image?"
       },
       {
         "type": "image_url",
         "image_url": {
           "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTalcyznmxYOyHtGPWEnTIDh3vNIGBDh9qjeA&s"
         }
       }
     ]
   }
],
"temperature": 0.7,
"top_p": 0.95,
"max_tokens": 800
}
 
```

---

## 💡 Bring Your Ideas

While you're free to use our starter kits and APIs, you're also encouraged to:
- Use your own datasets or models
- Extend the starter kit to include advanced features
- Build backend logic or use any tech stack you're comfortable with

---

## 🙋 Need Help?

Mentors and technical support will be available throughout the event to help you with the starter kit, API, or LLM integration. Don’t hesitate to ask for assistance.

---

Let’s build the future of staffing together. Good luck! 💡💥

**#HackWithAqore #AIStaffingInnovation**
