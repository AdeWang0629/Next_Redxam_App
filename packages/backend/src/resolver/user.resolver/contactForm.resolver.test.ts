import { contactForm, FormData } from './contactForm.resolver';

const { TEST_USER_EMAIL } = process.env;

describe('support contact form handle', () => {
  const mockEmail = TEST_USER_EMAIL || 'test@redxam.com';
  test('rejects when not email or question is provided', async () => {
    const mock: FormData = {
      email: '',
      question: '',
      firstName: '',
      lastName: '',
    };
    const res = await contactForm({ arg: mock });
    expect(res.message).toMatch('please fill the required fields');
    expect(res.success).toBeFalsy();
    expect(res.redxamEmail).toBeUndefined();
    expect(res.userEmail).toBeUndefined();
  });

  test('rejects invalid email', async () => {
    const mock: FormData = {
      email: 'sdf222..com',
      question: 'test question',
      firstName: 'test',
      lastName: 'redxam',
    };
    const res = await contactForm({ arg: mock });
    expect(res.message).toMatch('email is not a valid email format');
    expect(res.success).toBeFalsy();
    expect(res.redxamEmail).toBeUndefined();
    expect(res.userEmail).toBeUndefined();
  });

  test('contact is handled succesfully', async () => {
    const mock: FormData = {
      email: mockEmail,
      question: 'test question',
      firstName: 'test',
      lastName: 'redxam',
    };
    const res = await contactForm({ arg: mock });

    expect(res.message).toMatch('contact send succesfully');
    expect(res.success).toBeTruthy();
    expect(res.redxamEmail[0].statusCode).toBe(202);
    expect(res.userEmail[0].statusCode).toBe(202);
  });
});
