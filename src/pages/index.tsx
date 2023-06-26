import HeadTitle from "@/components/HeadTitle"
import Introduction from "@/components/Introduction";
import Navigation from "@/components/Navigation";
import Content from "@/components/Content";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const title = 'Main';
  const contentRef = useRef(null);
  const router = useRouter();



  return (
    <div>
      <HeadTitle title={title}/>
      <Navigation contentRef={contentRef} />
      <Introduction/>
      <div ref={contentRef}>
        <Content/>
      </div>
    </div>
  )
}
