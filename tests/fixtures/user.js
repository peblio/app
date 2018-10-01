export const studentUser = {
  email: 'test.student@gmail.com',
  name: 'Test Student',
  type: 'student',
  loginType: 'password',
  isVerified: true,
  password: 'abc123',
  requiresGuardianConsent: true,
  guardianEmail: 'test.parent@gmail.com',
  guardianConsentedAt: Date('2018-10-01 23:40:08.952')
};

export const teacherUser = {
  email: 'test.teacher@gmail.com',
  name: 'Test Teacher',
  type: 'teacher',
  loginType: 'password',
  isVerified: true,
  password: 'def456',
  requiresGuardianConsent: false,
  guardianEmail: '',
  guardianConsentedAt: null
};
