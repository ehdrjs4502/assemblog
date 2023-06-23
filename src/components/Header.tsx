export default function Header() {
    return (
      <div className="header">
        <div className="container">
          <div>
            <span>김동건</span>
          </div>
          <div>
            <span>이병선</span>
          </div>
        </div>

        <style jsx>{`
        h3 {
          margin: 0;
        }
        
        .header {
          width: 100vw;
          height: 100vh;
          background-color: tomato;
          position: relative;
        }

        .container {
          display: flex;
        }

        .container div {
          width: 50%;
          height: 100vh;
          border: 1px solid black;
          background-color: hsl(209, 100%, 69%);
        }
        `}
        </style>
    </div>
    )
}