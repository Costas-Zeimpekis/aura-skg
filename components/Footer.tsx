export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary py-8 px-4 mt-16">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-secondary font-bold text-xl mb-2">Aura Cafe</h3>
        <p className="text-secondary text-sm mb-4">
          Beach Road | Thessaloniki, Greece
        </p>
        <div className="border-t border-secondary pt-4 mt-4">
          <p className="text-secondary text-xs">
            © {currentYear} Aura Cafe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
