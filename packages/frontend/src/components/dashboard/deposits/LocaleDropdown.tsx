type PaymentApi = 'LEAN' | 'TELLER' | 'MX';

interface Props {
  setPaymentApi: React.Dispatch<React.SetStateAction<PaymentApi>>;
}

const LocaleDropdown = ({ setPaymentApi }: Props) => (
  <select
    name="location"
    id="location"
    onChange={e => setPaymentApi(e.target.value as PaymentApi)}
  >
    <option value="TELLER" selected>
      USA (Zelle)
    </option>
    <option value="LEAN">MENA</option>
  </select>
);

export default LocaleDropdown;
