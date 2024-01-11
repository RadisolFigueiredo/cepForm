import React, { useState } from "react";
import axios from "axios";

function App() {
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [localidade, setLocalidade] = useState("");
  const [uf, setUf] = useState("");

  const clearFields = () => {
    setCep("");
    setLogradouro("");
    setComplemento("");
    setBairro("");
    setLocalidade("");
    setUf("");
  };

  const buscarEndereço = async () => {
    if (cep.length !== 8) {
      console.error("CEP inválido");
    }
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const { logradouro, complemento, bairro, uf, localidade } = response.data;
      setLogradouro(logradouro);
      setComplemento(complemento);
      setBairro(bairro);
      setLocalidade(localidade);
      setUf(uf);
    } catch (error) {
      console.error("Erro ao buscar Cep", error.message);
    }
  };

  const toSaveFields = () => {
    const data = {
      cep,
      logradouro,
      complemento,
      bairro,
      localidade,
      uf,
    };
    console.log("Dados a serem salvos:", data);
  };

  return (
    <div>
      <header>
        <p>Ao colocar o cep, digite apenas números</p>
        <div>
          <label>Cep</label>
          <input
            type="text"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            onBlur={buscarEndereço}
          />
        </div>
        <div>
          <label>Logradouro</label>
          <input
            type="text"
            value={logradouro}
            onChange={(e) => setLogradouro(e.target.value)}
          />
        </div>
        <div>
          <label>Complemento</label>
          <input
            type="text"
            value={complemento}
            onChange={(e) => setComplemento(e.target.value)}
          />
        </div>
        <div>
          <label>Bairro</label>
          <input
            type="text"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
          />
        </div>
        <div>
          <label>Cidade</label>
          <input
            type="text"
            value={localidade}
            onChange={(e) => setLocalidade(e.target.value)}
          />
        </div>
        <div>
          <label>Estado</label>
          <input
            type="text"
            value={uf}
            onChange={(e) => setUf(e.target.value)}
          />
        </div>

        <button onClick={clearFields}>Limpar</button>
        <button onClick={toSaveFields}>Salvar</button>
      </header>
    </div>
  );
}

export default App;
