# JudgeAI – Full-Stack Code Execution Platform with AI Review (Dockerized)

## Description

JudgeAI is a full-stack web application that allows users to write, run, and test code in multiple programming languages (C++, Python, Java) directly in the browser. The platform is fully containerized using Docker and Docker Compose, separating the frontend and backend services for modular development and deployment.

The backend securely executes user-submitted code in isolated environments using dynamic file creation and compilation, while the frontend provides a clean, interactive code editor built with React and Vite. AI integration (planned/optional) allows real-time code reviews or feedback using large language models (LLMs).

## Key Features

- 🐳 **Dockerized microservices:** Isolated frontend and backend for clean separation  
- 🧠 **Multi-language support:** C++, Python, and Java using dynamic compilation and execution  
- 🔒 **Secure code execution:** File sandboxing and UUID-based temporary directories  
- ⚙️ **Standard input/output support:** For running interactive code  
- ⚡ **Fast live-reloading frontend:** Built with Vite and React  
- 📦 **Volume mounting:** Node_modules isolation for proper hot-reload behavior in Docker  
- 🤖 **Optional AI-powered code review:** Integration with LLM APIs like Gemini or OpenAI  
- 📂 **Extensible architecture:** Ready for features like user authentication, submission history, and leaderboards  

## Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS (optional), Docker  
- **Backend:** Node.js, Express, Docker, `child_process`, UUID, FS modules  
- **Execution Engine:** GCC, Python3, Java (installed inside Docker image)  
- **DevOps:** Docker, Docker Compose  

---
