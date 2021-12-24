import logo from './logo.svg';
import { Web3Storage } from 'web3.storage'
import './App.css';

function App() {
  const web3Storage = new Web3Storage({ token: process.env.WEB3STORAGE_TOKEN })
  window.web3Storage = web3Storage

  async function makeFileObjects() {
    console.log('uploading started')
    // You can create File objects from a Blob of binary data
    // see: https://developer.mozilla.org/en-US/docs/Web/API/Blob
    // Here we're just storing a JSON object, but you can store images,
    // audio, or whatever you want!
    const obj = { hello: 'world' }
    const blob = new Blob([JSON.stringify(obj)], {type : 'application/json'})
  
    const files = [
      new File(['contents-of-file-1'], 'plain-utf8.txt'),
      new File([blob], 'hello.json')
    ]
    const cid = await web3Storage.put(files)
    console.log('stored files with cid:', cid)
    const res = await web3Storage.get(cid)
    console.log(`Got a response! [${res.status}] ${res.statusText}`)
    if (!res.ok) {
      throw new Error(`failed to get ${cid}`)
    }

    const resFiles = await res.files()
    for (const file of resFiles) {
      console.log(`${file.cid} -- ${file.path} -- ${file.size}`)
    }

    return cid
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={makeFileObjects}>upload</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
