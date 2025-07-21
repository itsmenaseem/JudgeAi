# 🧠 JudgeAI – Full-Stack Code Execution Platform with AI Review (Dockerized)

## 📘 Description

**JudgeAI** is a full-stack cloud-based code execution platform that allows users to write, run, and test code in multiple languages — **C++**, **Python**, and **Java** — directly from their browser.

It is fully containerized using Docker & Docker Compose, with isolated frontend and backend services. Secure code execution is handled via dynamic file generation and language-specific compilers/interpreters inside the container.

🚀 **Planned Feature**: Optional AI-powered code reviews using Gemini or OpenAI APIs.

---

## 🚀 Features

- 🐳 Dockerized microservices: Isolated frontend and backend for clean separation  
- 🧠 Multi-language support: C++, Python, and Java using dynamic compilation and execution  
- 🔒 Secure code execution via file sandboxing and UUID-based temp directories  
- ⚙️ Built-in support for standard input and output  
- ⚡ Fast, live-reloading frontend with Vite + React  
- 📦 Volume mounting with node_modules isolation for proper hot-reload behavior in Docker  
- 🤖 AI-Powered Code Review using LLM APIs like Gemini or OpenAI  

---

## 🛠 Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS (optional), Docker  
- **Backend**: Node.js, Express, Docker, `child_process`, UUID, FS modules  
- **Execution Engine**: GCC, Python3, Java (installed in Docker image)  
- **DevOps**: Docker, Docker Compose



## 🧑‍💻 How to Run the Project Locally

### 📦 Prerequisites

Make sure you have the following installed:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---
---
### 🚀 Steps to Run

1. **Clone the Repository**


git clone https://github.com/itsmenaseem/JudgeAI.git
cd JudgeAI

2. Build and Start the Containers

docker-compose up --build

Frontend will be running at: http://localhost:5173

Backend will be running at: http://localhost:4000

docker-compose down


---

## 📚 Credits

This project was built as part of a learning journey and personal initiative to understand secure cloud-based code execution.

Special thanks to:

- [Monaco Editor](https://microsoft.github.io/monaco-editor/) for the powerful in-browser code editor  
- [Docker](https://www.docker.com/) for containerization and isolated code execution  
- [Vite](https://vitejs.dev/) for blazing-fast frontend development  
- [OpenAI](https://openai.com/) / [Gemini](https://deepmind.google/) (planned) for future AI code reviews  

---

### 🙋‍♂️ Author

Built with ❤️ by [Naseem Siddiqui](https://github.com/itsmenaseem)
