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
┌───────────────────────────────────────────────┐
│ Frontend (React) │
│ Chat UI │ Voice Input │ Response Display │
│ (JavaScript + Web Speech API) │
└──────────────────────┬────────────────────────┘
│ HTTP Requests
┌──────────────────────▼────────────────────────┐
│ Application Layer │
│ Input Processing │ API Handling │ Validation │
└──────────────────────┬────────────────────────┘
│
┌──────────────────────▼────────────────────────┐
│ AI / NLP Layer │
│ Hugging Face Transformers │
│ Intent Detection │ Entity Extraction │
│ Response Generation │
└──────────────────────┬────────────────────────┘
│
┌──────────────────────▼────────────────────────┐
│ Ayurvedic Knowledge Engine │
│ Remedies │ Diet │ Yoga │ Lifestyle Logic │
└───────────────────────────────────────────────┘

🧠 Design Principles
1)User-Centric Design: Simple and intuitive interaction  
2)Accessibility First: Voice support for non-technical users  
3)Separation of Concerns: UI, NLP, and knowledge layers decoupled  
4)Scalability: Designed to integrate with advanced AI models  
5)Extensibility: Easy to expand knowledge base and features 

Structure of the Project:
ayusense-ai/
├── frontend/
│ ├── components/ # Chat UI, input, response rendering
│ ├── pages/ # Main chatbot interface
│ ├── services/ # API communication logic
│ ├── utils/ # Helpers and constants
│ └── assets/ # Images, icons
│
├── models/
│ └── nlp/ # NLP logic and processing
│
├── knowledge-base/
│ ├── remedies/ # Ayurvedic solutions
│ ├── diet/ # Diet recommendations
│ └── yoga/ # Yoga suggestions
│
└── README.md
Author:
Arya Ubale  
Final Year Engineering Student  
🌟 Motivation
This project was built with the idea of using technology to **modernize and democratize traditional healthcare knowledge**, making it accessible to a wider audience through intelligent systems.
🏁 License:
This project is intended for academic and portfolio use.

