import Head from "next/head"

interface Props {
    title: string
}

export default function headTitle({ title }: Props) {
    return (
        <Head>
            <title>{title} | Assemblog</title>
        </Head>
    )
}