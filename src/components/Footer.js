export default function Footer({ showDisclaimer = true }) {
  return (
    <footer className="top-full sticky py-6 px-6">
      <div
        className={`w-full flex ${
          showDisclaimer ? "justify-between" : "justify-center"
        } items-center flex-wrap flex-col md:flex-row text-gray text-sm`}
      >
        {showDisclaimer ? (
          <span className="w-max">Disclaimer: outputs can be incorrect!</span>
        ) : null}
        <span className="w-max font-bold">Powered by OpenAI</span>
      </div>
    </footer>
  );
}
