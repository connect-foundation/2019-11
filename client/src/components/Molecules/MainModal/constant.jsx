export const validate = {
  id: /^[a-z0-9-_]{5,20}$/,
  password: {
    length: /.{8,16}/,
    alphabet: /^(?=.*[a-zA-Z])/,
    number: /^(?=.*\d)/,
    special: /^(?=.*\W)/
  },
  email: /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/
};
