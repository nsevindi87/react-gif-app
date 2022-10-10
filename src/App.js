import React, { useState, useEffect } from "react"
import './App.css';
import axios from "axios"

const API_KEY = "dwGBh4uTSJQEuxH0uFlCIANljxtt87xV"

function App() {
  const [loading, setloading] = useState(true);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState(``);
  const [title, setTitle] = useState("Trendler");
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setcurrentPage] = useState(1);
    
  const LIMIT = 24;

  useEffect(() => {                   //! App ilk acildiginda bu gelir.
    reset()
  }, []);

  const reset = ()=>{
    axios.get(`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=40`).then((result) => {
      setData(result.data.data);
      setQuery('');
      setTitle('Trendler')
      setloading(false)
    })
      .catch(e => console.log(e))    //! Bir problemle karsilasirsa bunu döndürüyor!
  }

  useEffect(()=>{
    if(currentPage != 1){
      search();
    }
  },[currentPage]);

  const search=()=>{
    if(query == ''){
      alert('Lütfen arama ifadesi giriniz')
      return;
    }
    setloading(true);
    axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&offset=${currentPage * LIMIT}&limit=20`).then((result)=>{
      setData([...result.data.data]);
      setTotalPage(Math.ceil(result.data.pagination.total_count / LIMIT))
      setTitle([...query]);
      setloading(false);
    })
  }

  if (loading) {
    return (<div className="loading">Yükleniyor...</div>)
  }

  return (
    <div className="App">
      <div className="search-area">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ne aramistiniz?"/>
        <button onClick={search}>ARA</button>
        {totalPage != 0 && <button onClick={reset}>SIFIRLA</button>}
      </div>
      <div className="content">
        <div className="container">
          <h1>{title}</h1>
          <div className="row">
            {data.map((item) => (
              <div className="col-md-3 gif-item">
                <a href={item.images.original.url} target="_blank"> <img src={item.images.original.url} /></a>
                <a href={item.user?.profile_url} target="_blank" className="user-area">
                  <img src={item.user?.avatar_url} style={{width:50, height:50, borderRadius:100}} className="user-area"/>
                  <span>{item.user?.display_name}</span>
                </a>
              </div>
            ))}
          </div>
          <div className="row">
            <div className="col-md-12">
              {currentPage - 1 > 0 && <button onClick={()=> setcurrentPage(currentPage - 1)} className="pagination">Geri [{currentPage} - {totalPage}]</button>}
              {currentPage < totalPage - 1 && <button onClick={()=> setcurrentPage(currentPage + 1)} className="pagination">Ileri [{currentPage} - {totalPage}]</button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
