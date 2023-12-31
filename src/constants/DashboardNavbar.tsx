import { FaHome } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";

import { GiWideArrowDunk } from "react-icons/gi";
import { FaPersonCircleQuestion } from "react-icons/fa6";

export const DashboardNavbarList: {
  id: number;
  title: string;
  icon: any;
  link: string;
}[] = [
  {
    id: 1,
    title: "Dashboard",
    icon: FaHome,
    link: "/dashboard",
  },
  {
    id: 2,
    title: "Category",
    icon: BiSolidCategory,
    link: "/dashboard/category",
  },
  {
    id: 3,
    title: "Quiz List",
    icon: GiWideArrowDunk,
    link: "/dashboard/quiz-list",
  },
  {
    id: 4,
    title: "Question",
    icon: FaPersonCircleQuestion,
    link: "/dashboard/question-list",
  },
];
