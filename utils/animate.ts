export const cotainerVariant = {
  hidden: {
    opacity: 0,
  },
  vissible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      delay: 0.3,
    },
  },
};

export const contentVariant = {
  hidden: {
    scale: 0,
  },
  vissible: {
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    scale: 0,
    transition: {
      delay: 0.3,
    },
  },
};

export const maintContentVariant = {
  hidden: {
    x: 100,
    opacity: 0,
  },
  vissible: {
    x: 0,
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.3,
    },
  },
  exit: {
    x: 100,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};
