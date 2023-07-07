import Navigation from "@/components/Navigation"
import HeadTitle from "@/components/HeadTitle";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

export default function Category({data}: any) {
    console.log(data);
    const router = useRouter();

    console.log(router);

    return (
        <>
            <HeadTitle title={data[1] + " 카테고리"} />
            <Navigation contentRef={''}/>
            <h4>카테고리에 해당하는 포스트 보여줄 예정</h4>
            <br></br>
            <h4>{data[1]}</h4>
            {router.query.id}
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) =>{ // URL 파라미터 
    const { cid }:any = context.params;
    const params = cid !== undefined ? cid : null;
  
    return {
      props: {
        data: params
      }
    };
  }