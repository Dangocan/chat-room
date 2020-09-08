import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8080");
socket.on("connect", () => {
  console.log("A new connection has been established");
});

function App() {
  const [autor, setAutor] = useState("");
  const [menssagem, setMenssagem] = useState("");
  const [menssagens, setMenssagens] = useState([]);

  useEffect(() => {
    const handleNovaMenssagem = (novaMenssagem) => {
      setMenssagens([...menssagens, novaMenssagem]);
    };
    socket.on('chat.message', handleNovaMenssagem);
    return () => socket.off('chat.message', handleNovaMenssagem)
  }, [menssagens]);

  return (
    <>
      <div>
        {menssagens.map((msgn, indice) => {
          return (
            <span key={indice}>
              <strong>{msgn.autor}:</strong> {msgn.menssagem}
            </span>
          );
        })}
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          let objetoMenssagem = { autor: autor, menssagem: menssagem };
          console.log(objetoMenssagem);
          socket.emit("chat.message", objetoMenssagem);
        }}
      >
        <label htmlFor="nome">Nome:</label>
        <input
          onChange={(event) => {
            setAutor(event.target.value);
          }}
          name="autor"
          id="nome"
          type="text"
          placeholder="digite seu nome"
        />
        <label htmlFor="menssagem">menssagem:</label>
        <input
          onChange={(event) => {
            setMenssagem(event.target.value);
          }}
          name="menssagem"
          id="menssagem"
          type="text"
          placeholder="digite uma menssagem"
        />
        <button type="submit">Enviar</button>
      </form>
    </>
  );
}

export default App;
