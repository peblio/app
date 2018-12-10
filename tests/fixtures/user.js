export const studentUser = {
  email: 'test.student@gmail.com',
  name: 'TestStudent',
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
  name: 'TestTeacher',
  type: 'teacher',
  loginType: 'password',
  isVerified: true,
  password: 'def456',
  requiresGuardianConsent: false,
  guardianEmail: '',
  guardianConsentedAt: null
};

export const exampleUser = {
  email: 'test.examples@gmail.com',
  name: 'peblioexamples',
  type: 'teacher',
  loginType: 'password',
  isVerified: true,
  password: 'xyz789',
  requiresGuardianConsent: false,
  guardianEmail: '',
  guardianConsentedAt: null
};
