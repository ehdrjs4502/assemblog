export default function DrawerHeader() {
    return (
        <>
            <div className="drawer-header">
                <h3>Assemblog</h3>
            </div>

            <style jsx>
                {`
                    .drawer-header {
                        display: flex;
                        justify-content: center;
                        margin-top: 30px;
                        margin-bottom: 30px;
                    }
                `}
            </style>
        </>
    )
}
