const generateClassName = (classNames) => {
    return classNames.filter((item) => !!item).join(' ');
};

export default generateClassName;
