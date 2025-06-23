import BottomBar from "@/components/shared/BottomBar";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 overflow-y-auto">{children}</main>
      <BottomBar />
    </div>
  );
}
