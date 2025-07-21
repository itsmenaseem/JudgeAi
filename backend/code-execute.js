import { exec } from "node:child_process";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs/promises";
import os from "os"
//for Ubuntu ./Main window .\\Main python3
let platform = os.platform()
let cppRunner;
let pythonRunner;
if(platform === "win32"){
  cppRunner = ".\\Main < input.txt"
  pythonRunner = "python Main.py < input.txt"
}
else if(platform === "linux"){
  cppRunner = ".\Main < input.txt"
  pythonRunner = "python3 Main.py < input.txt"
}

async function cppCode(res, tempDir) {
  exec(`g++ Main.cpp -o Main`, { cwd: tempDir }, async (compileErr, stdout, stderr) => {
    if (compileErr) {
      await fs.rm(tempDir, { recursive: true, force: true });
      console.error("Compilation Error:", stderr);
      return res.status(400).json({ error: "Compilation failed", details: stderr });
    }

    exec(cppRunner, { cwd: tempDir }, async (runErr, stdout, stderr) => {
      await fs.rm(tempDir, { recursive: true, force: true });
      if (runErr) {
        console.error("Runtime Error:", stderr);
        return res.status(400).json({ error: "Runtime error", details: stderr });
      }
      res.json({ output: stdout });
    });
  });
}

async function pythonCode(res, tempDir) {
  exec(pythonRunner, { cwd: tempDir }, async (error, stdout, stderr) => {
    await fs.rm(tempDir, { recursive: true, force: true });
    if (error) {
      return res.status(400).json({ error: "Runtime Error", details: stderr });
    }
    return res.json({ output: stdout });
  });
}

async function javaCode(res, tempDir) {
  exec(`javac Main.java`, { cwd: tempDir }, async (compileErr, stdout, stderr) => {
    if (compileErr) {
      await fs.rm(tempDir, { recursive: true, force: true });
      console.error("Compilation Error:", stderr);
      return res.status(400).json({ error: "Compilation failed", details: stderr });
    }

    exec(`java Main < input.txt`, { cwd: tempDir }, async (runErr, stdout, stderr) => {
      await fs.rm(tempDir, { recursive: true, force: true });
      if (runErr) {
        console.error("Runtime Error:", stderr);
        return res.status(400).json({ error: "Runtime error", details: stderr });
      }
      res.json({ output: stdout });
    });
  });
}

export async function executeCode(req, res) {
  const { code, input, lang } = req.body;
  const id = uuidv4();
  console.log("Execution ID:", id);

  const tempDir = path.join(process.cwd(), "codes", id);

  try {
    await fs.mkdir(tempDir, { recursive: true });
    await fs.writeFile(path.join(tempDir, "input.txt"), input || "");

    if (lang === "cpp") {
      await fs.writeFile(path.join(tempDir, "Main.cpp"), code);
      cppCode(res, tempDir);
    } else if (lang === "python") {
      await fs.writeFile(path.join(tempDir, "Main.py"), code);
      pythonCode(res, tempDir);
    } 
    else if(lang == "java"){
        await fs.writeFile(path.join(tempDir,"Main.java"),code);
        javaCode(res,tempDir)
    }
    else {
      return res.status(400).json({ error: "Unsupported language" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}
// docker build . -t judgeai