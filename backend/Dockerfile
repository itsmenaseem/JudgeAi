# Use official Ubuntu 22.04 base image
FROM ubuntu:22.04

# Prevent interactive prompts during package installation
ENV DEBIAN_FRONTEND=noninteractive

# Update and install required packages
RUN apt-get update && apt-get install -y \
    python3 python3-pip \
    openjdk-17-jdk \
    build-essential \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN apt-get update && apt-get install -y curl

# Add NodeSource repo and install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs
# Set Java environment variables
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
ENV PATH="$JAVA_HOME/bin:$PATH"

# Verify installations (optional, for debugging)
RUN python3 --version
RUN javac -version
RUN g++ --version

# Set working directory inside container
WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

CMD [ "npm","run","dev" ]
