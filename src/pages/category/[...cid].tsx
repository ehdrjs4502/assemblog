import Navigation from "@/components/Navigation"
import HeadTitle from "@/components/HeadTitle";
import { GetServerSideProps } from "next";

export default function Category({cid}:any) {
    console.log(cid);

    return (
        <>
            <HeadTitle title={cid[1] ? cid[1] : cid[0]} />
            <Navigation contentRef={''}/>
            <h4>카테고리에 해당하는 포스트 보여줄 예정</h4>
            <br></br>
            <h4>{cid[1] ? cid[1] : cid[0]}</h4>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) =>{
    const { cid } = context.params;
    const serializedCid = cid !== undefined ? cid : null;
  
    return {
      props: {
        cid: serializedCid
      }
    };
  }