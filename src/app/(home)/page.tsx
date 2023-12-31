import Hero from "@/components/Hero/Hero";
import YearGrowth from "@/components/YearGroth/YearGroth";
import Category from "@/components/Category/Category";
import Quizzes from "@/components/Quizzes/Quizzes";

export default function Home() {
  return (
    <div>
      <Hero />
      <Category />
      <Quizzes />

      <YearGrowth />
    </div>
  );
}
