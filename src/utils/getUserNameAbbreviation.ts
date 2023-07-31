import type { User } from '../apollo/types';

const getUserNameAbbreviation = (user: User) => {
  const fullName = user.profile.full_name;
  const abbr = fullName ? fullName.charAt(0) : user.email.charAt(0);
  return abbr.toUpperCase();
};

export default getUserNameAbbreviation;
