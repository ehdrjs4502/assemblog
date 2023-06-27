import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, } from '@mui/material';
import { useState } from 'react';

interface CategoryItem {
    key: string;
    label: string;
    items: CategoryItem[];
}

interface Props {
    isLogin: Boolean,
    cookie: {
        email: string;
        refToken: string;
        accToken: string;
    };
}

export default function CategoryContents({isLogin, cookie: cookie}: Props) {

    const lists: CategoryItem[] = [
        {
          key: "Test1",
          label: "Test1",
          items: [
            {
              key: "Sub1",
              label: "Sub1",
              items: [],
            },
            {
                key: "Sub2",
                label: "Sub2",
                items: [],
            }
            
          ]
        },
        {
          key: "Test2",
          label: "Test2",
          items: [
            { 
                key: "Sub3", 
                label: "Sub3",
                items: [],
            }
          ]
        }
      ];


    const [open, setOpen] = useState<{ [key: string]: boolean }>({}); // 상세 카테고리 열기
    

    const handleClick = (key:string) => () => {
        setOpen(prevOpen => ({
        ...prevOpen,
        [key]: !prevOpen[key]
        }));
    };

    return (
        <List component="nav">
            {lists.map(({ key, label, items }) => {
            const isOpen = open[key] || false;
            return (
                <div key={key}>
                    <ListItemButton onClick={handleClick(key)}>
                        <ListItemText primary={label} />
                        {isLogin ? (
                        <div className='admin-settings'>
                            <IconButton  color="primary" aria-label="menu" sx={{color:"gray", "&:hover": {color:"black"}}}>
                                <SettingsIcon />
                            </IconButton>
                            <IconButton onClick={() => alert(key + " add")} color="primary" aria-label="menu" sx={{color:"gray", "&:hover": {color:"black"}}}>
                                <AddIcon />
                            </IconButton>
                        </div>
                        ) : ""}
                        {isOpen ? <ExpandLess/> : <ExpandMore/>}
                    </ListItemButton>
                    
                    <Collapse in={isOpen} timeout="auto" unmountOnExit>
                        <List component="div" >
                          {items.map(({ key: childKey, label: childLabel }) => (
                            <ListItem key={childKey} disablePadding secondaryAction= {
                                <> {isLogin ? (
                                <IconButton onClick={() => alert(childLabel + ' 설정')} color="primary" aria-label="menu" sx={{color:"gray", "&:hover": {color:"black"}}}>
                                    <SettingsIcon />
                                </IconButton>) : ""}</>}>
                                <ListItemButton onClick={() => alert(childLabel)} key={childKey} sx={{ pl: 4 }} >
                                    <ListItemText primary={childLabel} />
                                </ListItemButton>
                            </ListItem>
                            ))}
                        </List>
                    </Collapse>
                </div>
            );
            })}
        </List>
    )
}