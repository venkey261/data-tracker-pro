import { Inbox, Dashboard, Notifications, Build } from '@mui/icons-material';

export const leftNavbarItems = [
    {
        id: 0,
        label: "Plant Overview",
        icon: <Dashboard />,
        route: 'overview'
    },

    {
        id: 1,
        label: "Central Dashboard",
        icon: <Dashboard />,
        route: 'dashboard'
    },
    { id:2,
        label: "DWM Metrics",
         icon: <Inbox />,
         route:'dwm-metrics' 
        
        },
    { id:3,
        label: "Availability",
         icon: <Notifications /> ,
         route: 'availability'
        
        },
    { id:4,
        label: "Performance",
         icon: <Build />,
         route:'performance' 
        
        },
    { id:5,
        label: "Quality",
         icon: <Inbox /> ,
         route:'quality'
        
        },
    { id:6,
        label: "Alerts",
         icon: <Notifications />,
         route:'alerts' 
        
        },
    { id:7,
        label: "Leakage Form",
         icon: <Build />,
         route:'leakage-form'
        
        },
    { id:8,
        label: "DWM Form",
         icon: <Inbox />,
         route:'dwm-form '
        
        },
    { id:9,
        label: "Work Order",
         icon: <Build />,
        route:'work-order'
        }
         
         ,
    { id:10,
        label: "Track work order",
         icon: <Inbox /> ,
         route:'track-work-order'
        
        },
    { id:11,
        label: "Machine Comparison",
         icon: <Notifications />,
         route:'machine-comparision' 
        
        },
    { id:12,
        label: "Machine Management",
         icon: <Dashboard />,
         route:'machine-management' 
        
        },
];

