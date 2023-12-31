import { Box, Tab, Tabs } from '@mui/material'
import UserIntroModifyView from '@/components/user/UserIntroModifyView'
import { SyntheticEvent, useState } from 'react'
import UserPWModifyView from '@/components/user/UserPWModifyView'

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

export default function UserInfo() {
    const [value, setValue] = useState<number>(0) // 탭 상태

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="유저 소개 수정" {...a11yProps(0)} />
                        <Tab label="유저 비밀번호 수정" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <UserIntroModifyView value={value} index={0} />
                <UserPWModifyView value={value} index={1} />
            </Box>
        </>
    )
}
