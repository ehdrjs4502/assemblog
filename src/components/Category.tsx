import React, {useState} from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, } from '@mui/material';
import axios from 'axios';
import { Cookies } from 'react-cookie';
interface CategoryItem {
    key: string;
    label: string;
    items: CategoryItem[];
  }

export default function Category() {
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
                key: "Sub1", 
                label: "Sub1",
                items: [],
            }
          ]
        }
      ];


    const [open, setOpen] = useState<{ [key: string]: boolean }>({});
    const [isLogin, setLogin] = useState(false);
    const cookie = new Cookies();
    const refreshToken = cookie.get('refreshToken')
    const accessToken = cookie.get('accessToken')

    const handleClick = (key:string) => () => {
        setOpen(prevOpen => ({
        ...prevOpen,
        [key]: !prevOpen[key]
        }));
    };

    const testClick = () => {
        console.log(refreshToken, accessToken);
        axios.post('/categories',{},{
        	headers: {
                RefreshToken: refreshToken,
                AccessToken: accessToken,
            },
        }).then(
            (res) => {
                console.log(res);
            });
    }

    return (
        <>
        <div className='category-header'>
            <span>Category</span>
            <div className='admin-settings'>
                <IconButton color="primary" aria-label="menu" sx={{color:"gray", "&:hover": {color:"black"}}}>
                    <SettingsIcon />
                </IconButton>
                <IconButton onClick={() => testClick()} color="primary" aria-label="menu" sx={{color:"gray", "&:hover": {color:"black"}}}>
                    <AddIcon />
                </IconButton>
            </div>
        </div>

        <div className='category-contents'>
        <List component="nav">
            {lists.map(({ key, label, items }) => {
            const isOpen = open[key] || false;
            return (
                <div key={key}>
                <ListItemButton onClick={handleClick(key)}>
                    <ListItemText primary={label} />
                    {isOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                    {items.map(({ key: childKey, label: childLabel }) => (
                        <ListItemButton key={childKey} sx={{ pl: 4 }} >
                        <ListItemText primary={childLabel} />
                        </ListItemButton>
                    ))}
                    </List>
                </Collapse>
                </div>
            );
            })}
        </List>
        </div>
        
        <style jsx>{`
            .category-header {
                display: flex;
                padding-left: 10px;
            }

            .admin-settings {
                margin-left: auto;
            }

            span {
                justify-content: center;
                align-items: center;
                display: flex;
                font-weight: bold;
            }
        `}
        </style>
        </>
        
    )
}