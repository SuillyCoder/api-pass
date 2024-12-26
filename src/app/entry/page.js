export default function Entry() {
    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-4xl">API KEY MANAGER</h1>
        <div>
          <div>
            <h2 className = "text-center">NAME</h2>
            <input className = "text-center" type="text" placeholder = "Enter API Name..."/>
          </div>
          <div>
            <h2 className = "text-center">LINK</h2>
            <input className = "text-center" type="text" placeholder = "Insert API Link..."/>
          </div>
          <div>
            <h2 className = "text-center">KEY</h2>
            <input className = "text-center" type="text" placeholder = "Insert API Key..."/>
          </div>
          <div>
          <button type="submit">CONFIRM</button>
          <button>CANCEL</button>
          </div>
        </div> 
      </div>
  
    );
  }
  