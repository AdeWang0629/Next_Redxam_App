import type { NextPage } from 'next';

interface SwitcherProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Switcher: NextPage<SwitcherProps> = ({
  activeSection,
  setActiveSection
}) => (
  <div className="flex justify-center rounded-3xl border border-[#EAEAEB] mt-8 lg:mt-0">
    <button
      className={`font-secondary font-medium rounded-3xl text-base p-2 w-28 inline-block text-center disabled:opacity-30 disabled:cursor-not-allowed ${
        activeSection === 'crypto'
          ? 'bg-lighter-black text-white'
          : 'text-lighter-black'
      }`}
      onClick={() => setActiveSection('crypto')}
      style={{
        boxShadow:
          activeSection === 'crypto'
            ? '0px 12px 20px rgba(39, 43, 34, 0.1), 0px 8.14815px 8px rgba(39, 43, 34, 0.05), 0px 1.85185px 8px rgba(39, 43, 34, 0.025)'
            : undefined
      }}
    >
      Crypto
    </button>

    <button
      className={`font-secondary font-medium rounded-3xl text-base p-2 w-28 inline-block text-center disabled:opacity-30 disabled:cursor-not-allowed ${
        activeSection === 'card'
          ? 'bg-lighter-black text-white'
          : 'text-lighter-black'
      }`}
      onClick={() => setActiveSection('card')}
      style={{
        boxShadow:
          activeSection === 'card'
            ? '0px 12px 20px rgba(39, 43, 34, 0.1), 0px 8.14815px 8px rgba(39, 43, 34, 0.05), 0px 1.85185px 8px rgba(39, 43, 34, 0.025)'
            : undefined
      }}
    >
      Card
    </button>

    <button
      className={`font-secondary font-medium rounded-3xl text-base p-2 w-28 inline-block text-center disabled:opacity-30 disabled:cursor-not-allowed ${
        activeSection === 'bank'
          ? 'bg-lighter-black text-white'
          : 'text-lighter-black'
      }`}
      onClick={() => setActiveSection('bank')}
      // disabled
      style={{
        boxShadow:
          activeSection === 'bank'
            ? '0px 12px 20px rgba(39, 43, 34, 0.1), 0px 8.14815px 8px rgba(39, 43, 34, 0.05), 0px 1.85185px 8px rgba(39, 43, 34, 0.025)'
            : undefined
      }}
    >
      Bank
    </button>
  </div>
);

export default Switcher;
