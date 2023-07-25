import Link from "next/link"

export default function DrawerHeader() {
    return (
        <>
            <div className="drawer-header">
                <Link href='/' style={{color:'black', textDecoration:"none"}}>
                    <h3>Assemblog</h3>
                </Link>
            </div>

            <style jsx>
                {`
                    .drawer-header {
                        display: flex;
                        justify-content: center;
                        margin-top: 30px;
                        margin-bottom: 30px;
                    }

                    .drawer-header h3:hover {
                        color: rgb(21, 0, 255);
                    }
                `}
            </style>
        </>
    )
}
