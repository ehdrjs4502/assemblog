export default function HeaderWave() {
    return (
        <>
            <div className="wave">
                <svg viewBox="0 -20 700 100" width="100%" height="110" preserveAspectRatio="none">
                    <path
                        transform="translate(0, -20)"
                        d="M0,10 c80,-22 240,0 350,18 c90,17 260,7.5 350,-20 v50 h-700"
                        fill="#848484"
                    />
                    <path d="M0,10 c80,-18 230,-12 350,7 c80,13 260,17 350,-5 v100 h-700z" fill="#ffffff" />
                </svg>
            </div>
            <style jsx>
                {`
                    .wave {
                        position: absolute;
                        width: 100%;
                        height: 100px;
                        bottom: 0;
                        overflow: hidden;
                    }
                `}
            </style>
        </>
    )
}
