# 🌿 AyuSense AI — Intelligent Ayurvedic Healthcare Chatbot

AyuSense AI is a **full-stack AI-powered conversational healthcare assistant** that blends **traditional Ayurvedic knowledge with modern Natural Language Processing (NLP)** to provide personalized wellness guidance.

This project is designed with a strong focus on **accessibility, usability, and preventive healthcare**, enabling users to interact naturally through **text and voice** to receive tailored Ayurvedic recommendations.
🚀 Vision
The aim of AyuSense AI is to **bridge the gap between ancient Ayurvedic wisdom and modern technology**, making holistic healthcare:
- Accessible to everyone  
- Easy to understand  
- Available anytime, anywhere
- 
 ✨ Core Features
🤖 Conversational AI
- Natural language interaction using NLP models  
- Context-aware responses based on user queries  
- Handles general health questions and symptom-based inputs  
🧑‍⚕️ Personalized Recommendations
- Considers user inputs like:
  - Age  
  - Gender  
  - Lifestyle habits  
  - Symptoms  
- Provides:
  - Ayurvedic remedies  
  - Diet suggestions  
  - Lifestyle improvements  
🎤 Voice-Enabled Interaction
- Speech-to-text for user input  
- Text-to-speech for system responses  
- Improves accessibility for elderly users  
🌐 Multilingual Support
- Supports **English and Hindi**
- Designed for inclusivity and wider reach  
🧘 Wellness Guidance
- Yoga recommendations  
- Preventive care suggestions  
- Focus on holistic well-being rather than reactive treatment
-   
🧠 System Architecture
## 🧠 System Architecture (MERN Stack)

```
┌─────────────────────────────────────────────────────┐
│                  React Frontend                     │
│  Chat UI │ Voice Input │ Response Display           │
│     (React + Web Speech API + Tailwind CSS)         │
└───────────────────────┬─────────────────────────────┘
                        │ HTTP / Axios
┌───────────────────────▼─────────────────────────────┐
│                Node.js / Express Backend            │
│  ┌──────────────────────────────────────────────┐   │
│  │              Middleware Layer                │   │
│  │   Auth │ Validation │ Error Handling         │   │
│  └──────────────────────────────────────────────┘   │
│  ┌──────────────┐ ┌──────────────┐ ┌───────────┐   │
│  │   Chat API   │ │  User API    │ │ NLP Logic │   │
│  │ Controllers  │ │ Controllers  │ │ Service   │   │
│  │   Services   │ │  Services    │ │ Layer     │   │
│  │   Models     │ │  Models      │ │           │   │
│  └──────────────┘ └──────────────┘ └───────────┘   │
└───────────────────────┬─────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────┐
│                AI / NLP Integration                 │
│   Hugging Face Transformers / API Processing       │
│   Intent Detection │ Response Generation           │
└───────────────────────┬─────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────┐
│                  MongoDB Database                   │
│   Users │ Chat History │ Knowledge Base             │
└─────────────────────────────────────────────────────┘

🧠 Design Principles
1)User-Centric Design: Simple and intuitive interaction  
2)Accessibility First: Voice support for non-technical users  
3)Separation of Concerns: UI, NLP, and knowledge layers decoupled  
4)Scalability: Designed to integrate with advanced AI models  
5)Extensibility: Easy to expand knowledge base and features 

Structure of the Project:
## 📁 Project Structure
## 📁 Project Structure

```
ayusense-ai/
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   └── assets/
├── models/
│   └── nlp/
├── knowledge-base/
│   ├── remedies/
│   ├── diet/
│   └── yoga/
└── README.md
```
Author:
Arya Ubale  
Final Year Engineering Student  
🌟 Motivation
This project was built with the idea of using technology to **modernize and democratize traditional healthcare knowledge**, making it accessible to a wider audience through intelligent systems.
🏁 License:
This project is intended for academic and portfolio use.

