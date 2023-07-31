import type { User } from '../apollo/types';

const getUserNameAbbreviation = (user: User) => {
  const firstName = user.profile.first_name;
  const lastName = user.profile.last_name;
  const abbr = firstName && lastName ? `${firstName.charAt(0)}${lastName.charAt(0)}` : user.email.charAt(0);
  return abbr.toUpperCase();
};

export default getUserNameAbbreviation;
