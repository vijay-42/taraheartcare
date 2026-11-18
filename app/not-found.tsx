import Button from "@/components/Button";
import ECGMonitor from "@/components/ECGMonitor";

export default function NotFound() {
  return (
    <section className="flex min-h-[90svh] flex-col justify-center pt-[140px]">
      <div className="container-x">
        <p className="label text-pulse">Error 404</p>
        <h1 className="display mt-6 text-[clamp(3.5rem,11vw,10rem)]">
          This page <em className="text-mute">skipped a beat.</em>
        </h1>
        <div className="mt-10">
          <Button href="/">Back to home</Button>
        </div>
      </div>
      <div className="mt-16">
        <ECGMonitor height={120} period={260} />
      </div>
    </section>
  );
}
