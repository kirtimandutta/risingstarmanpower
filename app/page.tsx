import { Footer } from "@/components/Footer";
import { InquiryForm } from "@/components/InquiryForm";
import { Navbar } from "@/components/Navbar";
import { ScrollyShowcase } from "@/components/ScrollyShowcase";
import { ServicesGrid } from "@/components/ServicesGrid";
import { StatsBar } from "@/components/StatsBar";
import { WhyUs } from "@/components/WhyUs";

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <ScrollyShowcase />
        <ServicesGrid />
        <StatsBar />
        <WhyUs />
        <InquiryForm />
      </main>
      <Footer />
    </>
  );
}
