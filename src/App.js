import { useState } from "react";


function App() {

const [city, setCity] = useState("");
const [previsao, setprevisao] = useState(null);

const headleChange  = (event) =>{
  setCity(event.target.value)
};

const headleSearche = () => {
  fetch(`http://api.weatherapi.com/v1/current.json?key=ff3b40cefcb44ce18cc45328232402&q=${city}&lang=pt`)
  .then((response) => {
    if(response.status === 200){
      return response.json()
    }
  })
  .then((data) => {
    console.log(data)
    setprevisao(data);
  });
};


  return (
   <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <a className="navbar-brand text-white" href="#top">
          Previsao do tempo
        </a>
      </nav>

    <main className="container">
      <div className="jumbotron">
        <h1>
          Verifique agora a previsa do tempo
        </h1>
        <p className="lead">
          Digite o nome da sua cidade no campo
        </p>

        <div className="row mb-4">
          <div className="col-md-6">
            <input
            onChange={headleChange} 
            className="form-control" 
            value={city}/>
          </div>
        </div>

      <button 
      onClick={headleSearche}
      className="btn-primary">
        Pesquisar
      </button>

      {previsao ? (
        <div>
          <div className="mt-4 d-flex align-itens-center">
            <div>
              <img src={previsao.current.condition.icon} alt="icon"/>
            </div>
            <div>
              <h3>{previsao.current.condition.text}</h3>
              <p>Temp: {previsao.current.temp_c}º</p>
              <p>{previsao.location.name}, {previsao.location.region}</p>
            </div>
          </div>
        </div>
      ): null};



      </div>
    </main>

   </div>
  );
}

export default App;
