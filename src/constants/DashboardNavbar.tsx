import { FaHome } from "react-icons/fa";
import { BiSolidCategory, BiSolidCategoryAlt } from "react-icons/bi";
import { MdQuiz } from "react-icons/md";
import { GiWideArrowDunk } from "react-icons/gi";

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
    title: "Create Category",
    icon: BiSolidCategoryAlt,
    link: "/dashboard/create-category",
  },
  {
    id: 4,
    title: "Create Quiz",
    icon: MdQuiz,
    link: "/dashboard/create-quiz",
  },
  {
    id: 5,
    title: "Quiz List",
    icon: GiWideArrowDunk,
    link: "/dashboard/quiz-list",
  },
];
