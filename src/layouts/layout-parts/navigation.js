import duotone from "icons/duotone";
export const navigations = [
  {
    type: "label",
    label: "Dashboard",
  },
  {
    name: "LMS",
    path: "/dashboard",
    icon: duotone.PersonChalkboard,
  },
  {
    name: "Sales 1",
    path: "/dashboard/sales",
    icon: duotone.BadgeDollar,
  },
  {
    name: "Sales 2",
    path: "/dashboard/sales-v2",
    icon: duotone.MessagesDollar,
  },
  {
    name: "Hiring",
    path: "/dashboard/job-management",
    icon: duotone.PersonCircleCheck,
  },
  {
    name: "Project 1",
    path: "/dashboard/project-management",
    icon: duotone.RectangleCirclePlus,
  },
  {
    name: "Project 2",
    path: "/dashboard/project-management-v2",
    icon: duotone.DiagramProject,
  },
  {
    name: "CRM",
    path: "/dashboard/crm",
    icon: duotone.CommentsQuestionCheck,
    badge: {
      value: "30",
    },
  },
  {
    name: "SaaS",
    path: "/dashboard/saas",
    icon: duotone.LayerGroup,
  },
  {
    type: "label",
    label: "Management",
  },
  {
    name: "User & Contact",
    icon: duotone.UserList,
    children: [
      {
        name: "Add User",
        path: "/dashboard/add-user",
      },
      {
        name: "User List 1",
        path: "/dashboard/user-list",
      },
      {
        name: "User List 2",
        path: "/dashboard/user-list-v2",
      },
      {
        name: "User Grid 1",
        path: "/dashboard/user-grid",
      },
      {
        name: "User Grid 2",
        path: "/dashboard/user-grid-v2",
      },
      {
        name: "Contact List",
        path: "/dashboard/contact-list",
      },
      {
        name: "Contact Grid",
        path: "/dashboard/contact-grid",
      },
    ],
  },
  {
    name: "Data Table",
    icon: duotone.DataTable,
    path: "/dashboard/data-table-v2", // children: [{ name: 'Data Table', path: '/dashboard/data-table-v2' }],
  },
  {
    name: "Team Leader Data Table",
    icon: duotone.DataTable,
    path: "/dashboard/data-table-team-leader", // children: [{ name: 'Data Table', path: '/dashboard/data-table-v2' }],
  },
];
