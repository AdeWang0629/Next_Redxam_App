import Card from '../Card';

type PaymentApi = 'LEAN' | 'TELLER' | 'MX' | '';

interface Props {
  setPaymentApi: React.Dispatch<React.SetStateAction<PaymentApi>>;
}

const LocaleDropdown = ({ setPaymentApi }: Props) => (
  <Card
    width="md:w-[622px] w-[95%]"
    height="h-1/2"
    py="py-4"
    otherClasses="mx-auto my-0"
  >
    <div className="w-full flex justify-center items-center pb-4 border-b border-[#E7EAEB]">
      <p className="text-xl font-bold font-secondary">Select Region</p>
    </div>
    <div className="w-full flex flex-col justify-center items-center">
      <button
        className="w-full font-secondary text-lg my-4 hover:text-primary"
        onClick={() => setPaymentApi('TELLER')}
      >
        USA
      </button>
      <button
        className="w-full font-secondary text-lg hover:text-primary"
        onClick={() => setPaymentApi('LEAN')}
      >
        MENA
      </button>
    </div>
  </Card>
);

export default LocaleDropdown;
