//import { useState } from "react";

function App() {
  //const [count, setCount] = useState(0);

  return (
    <div className="main-page-div">
      <section className="main-section">
        <header className="main-header">
          <h1>
            Speak<span className="header-text-span">EZ</span>
          </h1>
          <button className="header-button">
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </button>
        </header>
        <main className="main-body"></main>
      </section>
      <footer>
        <h1 className="text-black-400">Pace University@2024</h1>
      </footer>
    </div>
  );
}

export default App;
