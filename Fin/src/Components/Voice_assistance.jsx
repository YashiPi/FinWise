import React, { useState } from "react";
import axios from "axios";

const VoiceAssistant = () => {
  const [listening, setListening] = useState(false);
  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();
  recognition.continuous = false;
  recognition.lang = "en-US";

  recognition.onstart = () => setListening(true);
  recognition.onend = () => setListening(false);

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    console.log("Recognized:", transcript);
    handleCommand(transcript);
  };

  const handleCommand = async (command) => {
    const expenseMatch = command.match(/add expense (\d+) dollars? for (.+)/);
    const balanceMatch =
      command.includes("what's my current balance") ||
      command.includes("check balance");

    if (expenseMatch) {
      const amount = parseInt(expenseMatch[1]);
      const category = expenseMatch[2];
      await axios.post("http://localhost:5000/add-expense", {
        amount,
        category,
      });
      speak(`Added an expense of ${amount} dollars for ${category}.`);
    } else if (balanceMatch) {
      const response = await axios.get("http://localhost:5000/balance");
      speak(`Your current balance is ${response.data.balance} dollars.`);
    } else {
      speak("Sorry, I didn't understand that command.");
    }
  };

  const speak = (message) => {
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="p-4 border rounded-xl shadow-lg text-center">
      <button
        onClick={() => recognition.start()}
        className="px-4 py-2  text-white rounded-lg"
      >
        {listening ? (<>
          <div className="border-2 h-20 rounded-full">
          <lord-icon
          src="https://cdn.lordicon.com/vycwlttg.json"
          trigger="loop"
          style={{ width: "75px", height: "75px" }}
          state="loop-recording"
          >
      </lord-icon></div>
      <h2 className="text-black">Listening Your Commands</h2>
      </>
        ) : (<>
          <div className="border-2 h-20 rounded-full">
            <lord-icon
            src="https://cdn.lordicon.com/vycwlttg.json"
            trigger="hover"
            style={{ width: "75px", height: "75px" }}
            ></lord-icon></div>
          <h2 className="text-black">Tap to activate microphone</h2></>
        )}
      </button>
    </div>
  );
};

export default VoiceAssistant;
