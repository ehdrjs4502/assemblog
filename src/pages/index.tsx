import HeadTitle from "@/components/HeadTitle"
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Content from "@/components/Content";
import { useRef } from "react";


export default function Home() {
  const title = 'Main';
  const contentRef = useRef(null);

  return (
    <div>
      <HeadTitle title={title}/>
      <Navigation contentRef={contentRef}/>
      <Header/>
      <div ref={contentRef}>
        <Content/>
      </div>
    </div>
  )
}
