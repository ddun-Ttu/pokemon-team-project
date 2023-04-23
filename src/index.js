import app from "./app";

const PORT = 3000;

const handleListening = () => {
  console.log(`✅ Server listening on port ${PORT}`);
};

app.listen(PORT, handleListening);
