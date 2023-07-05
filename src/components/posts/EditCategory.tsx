import { getCategoryList } from "@/function/getCategory"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"

type CategoryItem = {
    id: number
    title: string
    orderNum: number
    useState: boolean
    boards: BoardItem[]
}

type BoardItem = {
    id: number
    title: string
    orderNum: number
    useState: boolean
}

interface Props {
    category: string,
    setCategory: (category: string) => void;
}

export default function SetCategory({category, setCategory} : Props) {
    const [categoryList, setCategoryList] = useState<CategoryItem[]>([]) // 카테고리 리스트
    
    useEffect(() => { // 카테고리 리스트 가져오기
        const fetchCategoryList = async () => {
          const list = await getCategoryList();
          setCategoryList(list);
        };
      
        fetchCategoryList();
    }, []);

    return (
        <>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">카테고리</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={category}
                    onChange={(e) => {
                        setCategory(e.target.value)
                    }}
                    label="카테고리">
                    {categoryList.map(
                        ({ boards }) =>
                            boards.length !== 0 &&
                            boards.map((board) => (
                                <MenuItem key={board.id} value={board.id}>
                                    {board.title}
                                </MenuItem>
                            ))
                    )}
                </Select>
            </FormControl>
        </>
    )
}