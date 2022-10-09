import React, { useState, useEffect } from "react"
import './App.css';
import axios from "axios"

const API_KEY = "dwGBh4uTSJQEuxH0uFlCIANljxtt87xV"

function App() {
  const [loading, setloading] = useState(true);
  const [data, setData] = useState([])

  useEffect(() => {                   //! App ilk acildiginda bu gelir.
    axios.get(`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=40`).then((result) => {
      setData(result.data.data);
      setloading(false)
    })
      .catch(e => console.log(e))    //! Bir problemle karsilasirsa bunu döndürüyor!
  }, []);

  if (loading) {
    return (<div className="loading">Yükleniyor...</div>)
  }




  return (
    <div className="App">
      <div className="search-area">
        <input />
        <button>ARA</button>
      </div>
      <div className="content">
        <div className="container">
          <h1>Trendler</h1>
          <div className="row">
            {data.map((item) => (
              <div className="col-md-3 gif-item">
                <img src={item.images.original.url} />
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
