import Hero from "@/components/Hero/Hero";
import YearGrowth from "@/components/YearGroth/YearGroth";
import Category from "@/components/shared/Category/Category";

export default function Home() {
  return (
    <div>
      <Hero />
      <Category />
      <YearGrowth />
    </div>
  );
}
