export default function Content() {
    return (
      <div className="content">
        <h3>글 목록</h3>


        <style jsx>{`

        .container {
          display: flex;
        }

        .container div {
          width: 50%;
          height: 100vh;
          border: 1px solid black;
          background-color: hsl(209, 100%, 69%);
        }
        
        .content {
          width: 100vw;
          height: 100vh;
          background-color: skyblue;
          position: relative;
        }
        `}
      </style>
      </div>

      
    )
}