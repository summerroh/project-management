const sideMenuList1 = [
  {
    id: 1,
    title: "대쉬보드",
    icon: "/static/sidemenu/dashboard.png",
    selectedIcon: "/static/sidemenu/dashboard-selected.png",
    path: "/dashboard",
    children: [
      {
        id: 2,
        title: "Job Management",
        path: "/dashboard/job-management",
      },
      {
        id: 3,
        title: "CRM",
        path: "/dashboard/crm",
      },
      {
        id: 4,
        title: "Sales",
        path: "/dashboard/sales",
      },
      {
        id: 5,
        title: "Sub Child",
        path: "/dashboard/sub-child",
        subChildren: [
          {
            id: 6,
            title: "Sub Child V1",
            path: "/dashboard/sub-child-v1",
          },
          {
            id: 7,
            title: "Sub Child V2",
            path: "/dashboard/sub-child-v2",
          },
          {
            id: 8,
            title: "Sub Child V3",
            path: "/dashboard/sub-child-v3",
          },
        ],
      },
      {
        id: 9,
        title: "Sales V2",
        path: "/dashboard/sales-v2",
      },
      {
        id: 10,
        title: "SaaS",
        path: "/dashboard/saas",
      },
    ],
  },
];

export { sideMenuList1 };
