import CompanyInfo from "../components/CompanyInfo";
import TeamMembers from "../components/TeamMembers";

export default function AboutUs() {
  return (
    <section className="">
      <div className="">
        <CompanyInfo></CompanyInfo>
      </div>

      <div className="mt-16 sm:mt-20 lg:mt-24">
        <TeamMembers></TeamMembers>
      </div>
    </section>
  );
}
