import { IconButton, Tooltip } from '@mui/material'
import { Search } from '@mui/icons-material'

export default function SearchBtn() {
    return (
        <Tooltip title="검색" disableInteractive placement="bottom" arrow>
            <IconButton aria-label="search" color="primary">
                <Search />
            </IconButton>
        </Tooltip>
    )
}
